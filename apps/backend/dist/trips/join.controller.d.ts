import { PrismaService } from "../prisma.service";
export declare class JoinController {
    private prisma;
    constructor(prisma: PrismaService);
    joinTrip(req: any, body: {
        code: string;
    }): Promise<{
        joined: boolean;
    }>;
}
