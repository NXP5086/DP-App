import { PrismaService } from "../prisma.service";
import { DocumentVisibility } from "@prisma/client";
export declare class DocumentsController {
    private prisma;
    constructor(prisma: PrismaService);
    uploadDocument(req: any, tripId: string, body: {
        fileName: string;
        visibility?: DocumentVisibility;
    }): Promise<import(".prisma/client").Document>;
    getDocuments(req: any, tripId: string): Promise<import(".prisma/client").Document[]>;
}
