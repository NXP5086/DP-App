import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("trips/:tripId/documents")
export class DocumentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Param("tripId") tripId: string) {
    return this.prisma.document.findMany({
      where: { tripId },
    });
  }

  @Post()
  async upload(
    @Param("tripId") tripId: string,
    @Body() body: any
  ) {
    return this.prisma.document.create({
      data: { ...body, tripId },
    });
  }
}