"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const roles_enum_1 = require("../auth/roles.enum");
const client_1 = require("@prisma/client");
let DocumentsController = class DocumentsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadDocument(req, tripId, body) {
        const { userId, role } = req.user;
        const trip = await this.prisma.trip.findFirst({
            where: {
                id: tripId,
                OR: [
                    { organizerId: userId },
                    { guests: { some: { userId } } },
                ],
            },
        });
        if (!trip) {
            throw new common_1.ForbiddenException("No access to this trip");
        }
        const visibility = role === roles_enum_1.Role.ORGANIZER
            ? body.visibility ?? client_1.DocumentVisibility.PRIVATE
            : client_1.DocumentVisibility.PRIVATE;
        return this.prisma.document.create({
            data: {
                tripId,
                fileName: body.fileName,
                uploadedById: userId,
                uploadedByRole: role,
                visibility,
            },
        });
    }
    async getDocuments(req, tripId) {
        const { userId, role } = req.user;
        const trip = await this.prisma.trip.findFirst({
            where: {
                id: tripId,
                OR: [
                    { organizerId: userId },
                    { guests: { some: { userId } } },
                ],
            },
        });
        if (!trip) {
            throw new common_1.ForbiddenException("No access to this trip");
        }
        if (role === roles_enum_1.Role.ORGANIZER) {
            return this.prisma.document.findMany({
                where: {
                    tripId,
                    uploadedByRole: roles_enum_1.Role.ORGANIZER,
                },
                orderBy: { createdAt: "desc" },
            });
        }
        return this.prisma.document.findMany({
            where: {
                tripId,
                OR: [
                    { uploadedById: userId },
                    { visibility: client_1.DocumentVisibility.SHARED },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocuments", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)("trips/:tripId/documents"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map