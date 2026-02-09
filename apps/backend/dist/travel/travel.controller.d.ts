import { PrismaService } from "../prisma.service";
export declare class TravelController {
    private prisma;
    constructor(prisma: PrismaService);
    getTravel(req: any, tripId: string): Promise<(import(".prisma/client").TravelItem & {
        user: {
            id: string;
            name: string;
            email: string;
        };
    })[]>;
    createTravel(req: any, tripId: string, body: any): Promise<import(".prisma/client").TravelItem>;
    updateTravel(req: any, id: string, body: any): Promise<import(".prisma/client").TravelItem>;
    deleteTravel(req: any, id: string): Promise<{
        ok: boolean;
    }>;
}
