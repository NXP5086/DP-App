import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(email: string, password: string): Promise<{
        id: string;
        email: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
