import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("trips/:tripId/concierge")
export class ConciergeController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Param("tripId") tripId: string) {
    return this.prisma.conciergeMessage.findMany({
      where: { tripId },
      orderBy: { createdAt: "asc" },
    });
  }

  @Post()
  async send(
    @Param("tripId") tripId: string,
    @Body() body: any
  ) {
    return this.prisma.conciergeMessage.create({
      data: { ...body, tripId },
    });
  }
}