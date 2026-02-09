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
    getTimeline(req: any, tripId: string): Promise<import(".prisma/client").TimelineItem[]>;
    createTimelineItem(req: any, tripId: string, body: {
        date: string;
        title: string;
        description?: string;
        visibility: "ORGANIZER" | "GUEST" | "ALL";
    }): Promise<import(".prisma/client").TimelineItem>;
}
