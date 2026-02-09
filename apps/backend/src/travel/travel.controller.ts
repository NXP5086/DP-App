import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Role } from "../auth/roles.enum";

@Controller("trips/:tripId/travel")
export class TravelController {
  constructor(private prisma: PrismaService) {}

  /* ============================
     GET travel items
     - Organizer: all guests
     - Guest: own only
  ============================ */
  @Get()
  async getTravel(@Req() req: any, @Param("tripId") tripId: string) {
    const { userId, role } = req.user;

    // Verify trip access
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
        OR: [
          { organizerId: userId },
          { guests: { some: { userId } } },
        ],
      },
    });

    if (!trip) {
      throw new ForbiddenException("No access to this trip");
    }

    const where =
      role === Role.ORGANIZER
        ? { tripId }
        : { tripId, userId };

    return this.prisma.travelItem.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  /* ============================
     CREATE travel item
     - Guest + Organizer (own only)
     - Enforces caps
     - Validates fields per type
  ============================ */
  @Post()
  async createTravel(
    @Req() req: any,
    @Param("tripId") tripId: string,
    @Body() body: any
  ) {
    const { userId } = req.user;
    const { type } = body;

    if (!type) {
      throw new BadRequestException("Missing travel type");
    }

    // Enforce caps
    const count = await this.prisma.travelItem.count({
      where: { tripId, userId, type },
    });

    if (
      (type === "FLIGHT" && count >= 2) ||
      (type === "STAY" && count >= 1) ||
      (type === "TRANSFER" && count >= 1)
    ) {
      throw new BadRequestException("Travel item limit reached");
    }

    // Field validation per type
    if (type === "FLIGHT") {
      if (
        !body.airline ||
        !body.flightNumber ||
        !body.departureDateTime ||
        !body.arrivalDateTime
      ) {
        throw new BadRequestException("Missing flight details");
      }
    }

    if (type === "STAY") {
      if (!body.hotelName || !body.checkIn || !body.checkOut) {
        throw new BadRequestException("Missing stay details");
      }
    }

    if (type === "TRANSFER") {
      if (
        !body.transferType ||
        (!body.airportDepartureDateTime &&
          !body.hotelDepartureDateTime)
      ) {
        throw new BadRequestException("Missing transfer details");
      }
    }

    return this.prisma.travelItem.create({
      data: {
        ...body,
        tripId,
        userId,
      },
    });
  }

  /* ============================
     UPDATE travel item
     - Owner only
     - Prevents cap bypass on type change
  ============================ */
  @Patch(":id")
  async updateTravel(
    @Req() req: any,
    @Param("id") id: string,
    @Body() body: any
  ) {
    const { userId } = req.user;

    const item = await this.prisma.travelItem.findUnique({
      where: { id },
    });

    if (!item || item.userId !== userId) {
      throw new ForbiddenException("Cannot edit this item");
    }

    // Prevent type-change cap bypass
    if (body.type && body.type !== item.type) {
      const count = await this.prisma.travelItem.count({
        where: {
          tripId: item.tripId,
          userId,
          type: body.type,
        },
      });

      if (
        (body.type === "FLIGHT" && count >= 2) ||
        (body.type === "STAY" && count >= 1) ||
        (body.type === "TRANSFER" && count >= 1)
      ) {
        throw new BadRequestException("Travel item limit reached");
      }
    }

    return this.prisma.travelItem.update({
      where: { id },
      data: body,
    });
  }

  /* ============================
     DELETE travel item
     - Owner only
  ============================ */
  @Delete(":id")
  async deleteTravel(@Req() req: any, @Param("id") id: string) {
    const { userId } = req.user;

    const item = await this.prisma.travelItem.findUnique({
      where: { id },
    });

    if (!item || item.userId !== userId) {
      throw new ForbiddenException("Cannot delete this item");
    }

    await this.prisma.travelItem.delete({
      where: { id },
    });

    return { ok: true };
  }
}