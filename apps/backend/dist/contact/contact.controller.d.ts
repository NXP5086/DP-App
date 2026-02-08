import { PrismaService } from "../prisma.service";
export declare class ContactController {
    private prisma;
    constructor(prisma: PrismaService);
    create(body: any): Promise<import(".prisma/client").ContactRequest>;
}
