import {
  Controller,
  Post,
  Get,
  Body,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { randomBytes } from "crypto";

@Controller("trips")
export class TripsController {
  constructor(private prisma: PrismaService) {}

  /**
   * ORGANIZER ONLY
   * Create a new trip and return join code
   */
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

  /**
   * ORGANIZER + GUEST
   * Returns trips relevant to the logged-in user
   */
  @Get("my")
  async myTrips(@Req() req: any) {
    const userId = req.user.userId;
    const role = req.user.role;

    // Organizer: trips they created
    if (role === Role.ORGANIZER) {
      return this.prisma.trip.findMany({
        where: {
          organizerId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Guest: trips they joined
    return this.prisma.trip.findMany({
      where: {
        guests: {
          some: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}