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
let DocumentsController = class DocumentsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(tripId) {
        return this.prisma.document.findMany({
            where: { tripId },
        });
    }
    async upload(tripId, body) {
        return this.prisma.document.create({
            data: { ...body, tripId },
        });
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)("tripId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "upload", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)("trips/:tripId/documents"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map