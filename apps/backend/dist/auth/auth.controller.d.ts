import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthController {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(body: any): Promise<{
        user: import(".prisma/client").User;
        token: string;
    }>;
    signup(body: any): Promise<{
        user: import(".prisma/client").User;
        token: string;
    }>;
    me(req: any): any;
    organizerOnly(): {
        ok: boolean;
        message: string;
    };
    guestOnly(): {
        ok: boolean;
        message: string;
    };
}
