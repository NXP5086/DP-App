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
exports.TravelController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const roles_enum_1 = require("../auth/roles.enum");
let TravelController = class TravelController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTravel(req, tripId) {
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
        const where = role === roles_enum_1.Role.ORGANIZER
            ? { tripId }
            : { tripId, userId };
        return this.prisma.travelItem.findMany({
            where,
            orderBy: { createdAt: "asc" },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
    }
    async createTravel(req, tripId, body) {
        const { userId } = req.user;
        const { type } = body;
        if (!type) {
            throw new common_1.BadRequestException("Missing travel type");
        }
        const count = await this.prisma.travelItem.count({
            where: { tripId, userId, type },
        });
        if ((type === "FLIGHT" && count >= 2) ||
            (type === "STAY" && count >= 1) ||
            (type === "TRANSFER" && count >= 1)) {
            throw new common_1.BadRequestException("Travel item limit reached");
        }
        if (type === "FLIGHT") {
            if (!body.airline ||
                !body.flightNumber ||
                !body.departureDateTime ||
                !body.arrivalDateTime) {
                throw new common_1.BadRequestException("Missing flight details");
            }
        }
        if (type === "STAY") {
            if (!body.hotelName || !body.checkIn || !body.checkOut) {
                throw new common_1.BadRequestException("Missing stay details");
            }
        }
        if (type === "TRANSFER") {
            if (!body.transferType ||
                (!body.airportDepartureDateTime &&
                    !body.hotelDepartureDateTime)) {
                throw new common_1.BadRequestException("Missing transfer details");
            }
        }
        return this.prisma.travelItem.create({
            data: {
                ...body,
                tripId,
                userId,
            },
        });
    }
    async updateTravel(req, id, body) {
        const { userId } = req.user;
        const item = await this.prisma.travelItem.findUnique({
            where: { id },
        });
        if (!item || item.userId !== userId) {
            throw new common_1.ForbiddenException("Cannot edit this item");
        }
        if (body.type && body.type !== item.type) {
            const count = await this.prisma.travelItem.count({
                where: {
                    tripId: item.tripId,
                    userId,
                    type: body.type,
                },
            });
            if ((body.type === "FLIGHT" && count >= 2) ||
                (body.type === "STAY" && count >= 1) ||
                (body.type === "TRANSFER" && count >= 1)) {
                throw new common_1.BadRequestException("Travel item limit reached");
            }
        }
        return this.prisma.travelItem.update({
            where: { id },
            data: body,
        });
    }
    async deleteTravel(req, id) {
        const { userId } = req.user;
        const item = await this.prisma.travelItem.findUnique({
            where: { id },
        });
        if (!item || item.userId !== userId) {
            throw new common_1.ForbiddenException("Cannot delete this item");
        }
        await this.prisma.travelItem.delete({
            where: { id },
        });
        return { ok: true };
    }
};
exports.TravelController = TravelController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "getTravel", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "createTravel", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "updateTravel", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteTravel", null);
exports.TravelController = TravelController = __decorate([
    (0, common_1.Controller)("trips/:tripId/travel"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TravelController);
//# sourceMappingURL=travel.controller.js.map