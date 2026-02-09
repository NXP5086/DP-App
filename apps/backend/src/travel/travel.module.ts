import { Module } from "@nestjs/common";
import { TravelController } from "./travel.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [TravelController],
  providers: [PrismaService],
})
export class TravelModule {}