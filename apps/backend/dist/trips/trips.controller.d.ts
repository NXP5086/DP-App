import { PrismaService } from "../prisma.service";
export declare class TripsController {
    private prisma;
    constructor(prisma: PrismaService);
    createTrip(req: any, body: {
        title: string;
        location: string;
        startDate: string;
        endDate: string;
    }): Promise<{
        id: string;
        joinCode: string;
    }>;
    myTrips(req: any): Promise<import(".prisma/client").Trip[]>;
}
