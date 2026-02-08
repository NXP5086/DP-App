import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma.service";
import { jwtConstants } from "./jwt.constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, JwtStrategy],
})
export class AuthModule {}