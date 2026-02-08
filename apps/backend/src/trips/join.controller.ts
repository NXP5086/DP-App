import { Controller, Post, Body, Req, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Role } from "../auth/roles.enum";
import { Roles } from "../auth/roles.decorator";

@Controller("trips/join")
export class JoinController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @Roles(Role.GUEST)
  async joinTrip(
    @Req() req: any,
    @Body() body: { code: string }
  ) {
    const trip = await this.prisma.trip.findUnique({
      where: { joinCode: body.code },
    });

    if (!trip) {
      throw new NotFoundException("Invalid trip code");
    }

    // Prevent organizer from joining their own trip as guest
    if (trip.organizerId === req.user.userId) {
      return { joined: true };
    }

    // Idempotent join
    await this.prisma.tripGuest.upsert({
      where: {
        tripId_userId: {
          tripId: trip.id,
          userId: req.user.userId,
        },
      },
      update: {},
      create: {
        tripId: trip.id,
        userId: req.user.userId,
      },
    });

    return { joined: true };
  }
}