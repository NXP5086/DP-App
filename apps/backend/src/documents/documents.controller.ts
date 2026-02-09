import {
  Controller,
  Post,
  Get,
  Req,
  Param,
  Body,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Role } from "../auth/roles.enum";
import { DocumentVisibility } from "@prisma/client";

@Controller("trips/:tripId/documents")
export class DocumentsController {
  constructor(private prisma: PrismaService) {}

  /**
   * Upload document
   */
  @Post()
  async uploadDocument(
    @Req() req: any,
    @Param("tripId") tripId: string,
    @Body()
    body: {
      fileName: string;
      visibility?: DocumentVisibility;
    }
  ) {
    const { userId, role } = req.user;

    // 1️⃣ Ensure access to trip
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

    // 2️⃣ Enforce visibility rules
    const visibility =
      role === Role.ORGANIZER
        ? body.visibility ?? DocumentVisibility.PRIVATE
        : DocumentVisibility.PRIVATE;

    // 3️⃣ Create document
    return this.prisma.document.create({
      data: {
        tripId,
        fileName: body.fileName,
        uploadedById: userId,
        uploadedByRole: role,
        visibility,
      },
    });
  }

  /**
   * Fetch documents
   */
  @Get()
  async getDocuments(
    @Req() req: any,
    @Param("tripId") tripId: string
  ) {
    const { userId, role } = req.user;

    // 1️⃣ Ensure access
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

    // 2️⃣ Visibility logic
    if (role === Role.ORGANIZER) {
      return this.prisma.document.findMany({
        where: {
          tripId,
          uploadedByRole: Role.ORGANIZER,
        },
        orderBy: { createdAt: "desc" },
      });
    }

    // Guest
    return this.prisma.document.findMany({
      where: {
        tripId,
        OR: [
          { uploadedById: userId },
          { visibility: DocumentVisibility.SHARED },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  }
}