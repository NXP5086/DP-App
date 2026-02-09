import { PrismaService } from "../prisma.service";
export declare class ConciergeController {
    private prisma;
    constructor(prisma: PrismaService);
    sendMessage(req: any, tripId: string, body: {
        message: string;
    }): Promise<import(".prisma/client").ConciergeMessage>;
    getMessages(req: any, tripId: string): Promise<import(".prisma/client").ConciergeMessage[]>;
}
