import { PrismaService } from "../prisma.service";
export declare class DocumentsController {
    private prisma;
    constructor(prisma: PrismaService);
    list(tripId: string): Promise<import(".prisma/client").Document[]>;
    upload(tripId: string, body: any): Promise<import(".prisma/client").Document>;
}
