import { Module } from "@nestjs/common";
import { ConciergeController } from "./concierge.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ConciergeController],
  providers: [PrismaService],
})
export class ConciergeModule {}