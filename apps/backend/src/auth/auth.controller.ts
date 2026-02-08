import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./jwt.guard";
import { Roles } from "./roles.decorator";
import { Role } from "./roles.enum";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  /* ============================
     LOGIN
  ============================ */

  @Public()
  @Post("login")
  async login(@Body() body: any) {
    console.log("LOGIN BODY →", body);

    // ✅ Normalize email safely
    const email =
      typeof body?.email === "string"
        ? body.email
        : typeof body?.email?.email === "string"
        ? body.email.email
        : null;

    if (!email) {
      throw new BadRequestException(
        "Client bug: invalid login payload (email must be string)"
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return { user, token };
  }

  /* ============================
     SIGNUP
  ============================ */

  @Public()
  @Post("signup")
  async signup(@Body() body: any) {
    console.log("SIGNUP BODY →", body);

    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.name !== "string"
    ) {
      throw new BadRequestException("Invalid signup payload");
    }
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          role: "GUEST",
        },
      });

      const token = this.jwtService.sign({
        sub: user.id,
        role: user.role,
      });

      return { user, token };
    } catch (err: any) {
      console.error("SIGNUP ERROR ->", err);
      // Prisma unique constraint error when email already exists
      if (err?.code === "P2002") {
        throw new BadRequestException("Email already registered");
      }
      throw err;
    }
  }

  /* ============================
     CURRENT USER
  ============================ */

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() req: any) {
    return req.user;
  }

  /* ============================
     ROLE TEST ENDPOINTS
  ============================ */

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard)
  @Get("organizer-only")
  organizerOnly() {
    return { ok: true, message: "Organizer access granted" };
  }

  @Roles(Role.GUEST)
  @UseGuards(JwtAuthGuard)
  @Get("guest-only")
  guestOnly() {
    return { ok: true, message: "Guest access granted" };
  }
}