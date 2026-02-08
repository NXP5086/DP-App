import { Controller, Get, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("trips/:tripId/timeline")
export class TimelineController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Param("tripId") tripId: string) {
    return this.prisma.timelineItem.findMany({
      where: {
        tripId,
        visibility: "guest",
      },
      orderBy: { date: "asc" },
    });
  }
}