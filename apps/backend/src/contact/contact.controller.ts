import { Controller, Post, Body } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("contact")
export class ContactController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() body: any) {
    return this.prisma.contactRequest.create({
      data: body,
    });
  }
}