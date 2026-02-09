import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [DocumentsController],
  providers: [PrismaService],
})
export class DocumentsModule {}