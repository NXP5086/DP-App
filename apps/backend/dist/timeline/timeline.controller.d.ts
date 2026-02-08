import { PrismaService } from "../prisma.service";
export declare class TimelineController {
    private prisma;
    constructor(prisma: PrismaService);
    list(tripId: string): Promise<import(".prisma/client").TimelineItem[]>;
}
