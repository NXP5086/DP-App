import { PrismaService } from "../prisma.service";
export declare class ConciergeController {
    private prisma;
    constructor(prisma: PrismaService);
    list(tripId: string): Promise<import(".prisma/client").ConciergeMessage[]>;
    send(tripId: string, body: any): Promise<import(".prisma/client").ConciergeMessage>;
}
