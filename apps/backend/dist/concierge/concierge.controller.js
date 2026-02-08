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
exports.ConciergeController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ConciergeController = class ConciergeController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(tripId) {
        return this.prisma.conciergeMessage.findMany({
            where: { tripId },
            orderBy: { createdAt: "asc" },
        });
    }
    async send(tripId, body) {
        return this.prisma.conciergeMessage.create({
            data: { ...body, tripId },
        });
    }
};
exports.ConciergeController = ConciergeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConciergeController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)("tripId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConciergeController.prototype, "send", null);
exports.ConciergeController = ConciergeController = __decorate([
    (0, common_1.Controller)("trips/:tripId/concierge"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConciergeController);
//# sourceMappingURL=concierge.controller.js.map