import { Module } from "@nestjs/common";
import { TripsController } from "./trips.controller";
import { JoinController } from "./join.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [TripsController, JoinController],
  providers: [PrismaService],
})
export class TripsModule {}