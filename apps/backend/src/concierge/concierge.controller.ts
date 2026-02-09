import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Role } from "../auth/roles.enum";

@Controller("trips/:tripId/concierge")
export class ConciergeController {
  constructor(private prisma: PrismaService) {}

  /**
   * Send a concierge message
   * Guest → Concierge (private)
   * Organizer → Concierge (private)
   */
  @Post()
  async sendMessage(
    @Req() req: any,
    @Param("tripId") tripId: string,
    @Body() body: { message: string }
  ) {
    const { userId, role } = req.user;

    if (!body?.message?.trim()) {
      throw new ForbiddenException("Message is required");
    }

    /**
     * Verify trip access
     */
    const hasAccess =
      role === Role.ORGANIZER
        ? await this.prisma.trip.findFirst({
            where: { id: tripId, organizerId: userId },
          })
        : await this.prisma.tripGuest.findFirst({
            where: { tripId, userId },
          });

    if (!hasAccess) {
      throw new ForbiddenException("No access to this trip");
    }

    return this.prisma.conciergeMessage.create({
      data: {
        tripId,
        userId,
        sender: role, // GUEST | ORGANIZER
        body: body.message,
      },
    });
  }

  /**
   * Get concierge messages for current user
   * Guest: only their messages
   * Organizer: only their messages
   */
  @Get()
  async getMessages(
    @Req() req: any,
    @Param("tripId") tripId: string
  ) {
    const { userId, role } = req.user;

    /**
     * Verify trip access
     */
    const hasAccess =
      role === Role.ORGANIZER
        ? await this.prisma.trip.findFirst({
            where: { id: tripId, organizerId: userId },
          })
        : await this.prisma.tripGuest.findFirst({
            where: { tripId, userId },
          });

    if (!hasAccess) {
      throw new ForbiddenException("No access to this trip");
    }

    return this.prisma.conciergeMessage.findMany({
      where: {
        tripId,
        userId, // 🔒 critical: isolates messages per user
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}