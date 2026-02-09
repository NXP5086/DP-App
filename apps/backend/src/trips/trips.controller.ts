import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { randomBytes } from "crypto";

@Controller("trips")
export class TripsController {
  constructor(private prisma: PrismaService) {}

  /* =====================================================
     CREATE TRIP (ORGANIZER ONLY)
  ===================================================== */
  @Post()
  @Roles(Role.ORGANIZER)
  async createTrip(
    @Req() req: any,
    @Body()
    body: {
      title: string;
      location: string;
      startDate: string;
      endDate: string;
    }
  ) {
    if (!body.title || !body.location || !body.startDate || !body.endDate) {
      throw new BadRequestException("Missing required fields");
    }

    const joinCode = randomBytes(4).toString("hex");

    const trip = await this.prisma.trip.create({
      data: {
        title: body.title,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        joinCode,
        organizerId: req.user.userId,
      },
    });

    return {
      id: trip.id,
      joinCode: trip.joinCode,
    };
  }

  /* =====================================================
     MY TRIPS (ORGANIZER + GUEST)
  ===================================================== */
  @Get("my")
  async myTrips(@Req() req: any) {
    const userId = req.user.userId;
    const role = req.user.role;

    // Organizer → trips they created
    if (role === Role.ORGANIZER) {
      return this.prisma.trip.findMany({
        where: { organizerId: userId },
        orderBy: { createdAt: "desc" },
      });
    }

    // Guest → trips they joined
    return this.prisma.trip.findMany({
      where: {
        guests: {
          some: { userId },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /* =====================================================
     GET TIMELINE (ORGANIZER + GUEST)
     Visibility rules enforced here
  ===================================================== */
  @Get(":tripId/timeline")
  async getTimeline(
    @Req() req: any,
    @Param("tripId") tripId: string
  ) {
    const userId = req.user.userId;
    const role = req.user.role;

    /**
     * 1️⃣ Verify user is part of the trip
     * - Organizer OR
     * - Guest who joined
     */
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
        OR: [
          { organizerId: userId },
          {
            guests: {
              some: { userId },
            },
          },
        ],
      },
    });

    if (!trip) {
      throw new ForbiddenException("You are not part of this trip");
    }

    /**
     * 2️⃣ Visibility rules
     * - Organizer: sees ALL
     * - Guest: sees ALL + GUEST
     */
    const visibilityFilter =
      role === Role.ORGANIZER
        ? undefined
        : {
            in: ["ALL", "GUEST"],
          };

    /**
     * 3️⃣ Fetch timeline
     */
    return this.prisma.timelineItem.findMany({
      where: {
        tripId,
        ...(visibilityFilter && {
          visibility: visibilityFilter,
        }),
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  /* =====================================================
     CREATE TIMELINE ITEM (ORGANIZER ONLY)
  ===================================================== */
  @Post(":tripId/timeline")
  @Roles(Role.ORGANIZER)
  async createTimelineItem(
    @Req() req: any,
    @Param("tripId") tripId: string,
    @Body()
    body: {
      date: string;
      title: string;
      description?: string;
      visibility: "ORGANIZER" | "GUEST" | "ALL";
    }
  ) {
    const { date, title, description, visibility } = body;

    if (!date || !title || !visibility) {
      throw new BadRequestException("Missing required fields");
    }

    if (!["ORGANIZER", "GUEST", "ALL"].includes(visibility)) {
      throw new BadRequestException("Invalid visibility value");
    }

    /**
     * Ensure organizer owns this trip
     */
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
        organizerId: req.user.userId,
      },
    });

    if (!trip) {
      throw new ForbiddenException("You do not own this trip");
    }

    return this.prisma.timelineItem.create({
      data: {
        tripId,
        date: new Date(date),
        title,
        description,
        visibility,
      },
    });
  }
}