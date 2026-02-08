import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { TripsModule } from "./trips/trips.module";
import { PrismaService } from "./prisma.service";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { RolesGuard } from "./auth/roles.guard";

@Module({
  imports: [AuthModule, TripsModule],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}