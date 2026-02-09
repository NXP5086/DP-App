import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { TripsModule } from "./trips/trips.module";
import { PrismaService } from "./prisma.service";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { RolesGuard } from "./auth/roles.guard";
import { DocumentsModule } from "./documents/documents.module";
import { ConciergeModule } from "./concierge/concierge.module";
import { TravelModule } from "./travel/travel.module";

@Module({
  imports: [AuthModule, TripsModule, DocumentsModule, ConciergeModule, TravelModule],
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