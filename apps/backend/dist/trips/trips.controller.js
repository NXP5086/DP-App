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
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_enum_1 = require("../auth/roles.enum");
const crypto_1 = require("crypto");
let TripsController = class TripsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTrip(req, body) {
        if (!body.title || !body.location || !body.startDate || !body.endDate) {
            throw new common_1.BadRequestException("Missing required fields");
        }
        const joinCode = (0, crypto_1.randomBytes)(4).toString("hex");
        const trip = await this.prisma.trip.create({
            data: {
                title: body.title,
                location: body.location,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                joinCode,
                organizerId: req.user.userId,
            },
        });
        return {
            id: trip.id,
            joinCode: trip.joinCode,
        };
    }
    async myTrips(req) {
        const userId = req.user.userId;
        const role = req.user.role;
        if (role === roles_enum_1.Role.ORGANIZER) {
            return this.prisma.trip.findMany({
                where: { organizerId: userId },
                orderBy: { createdAt: "desc" },
            });
        }
        return this.prisma.trip.findMany({
            where: {
                guests: {
                    some: { userId },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async getTimeline(req, tripId) {
        const userId = req.user.userId;
        const role = req.user.role;
        const trip = await this.prisma.trip.findFirst({
            where: {
                id: tripId,
                OR: [
                    { organizerId: userId },
                    {
                        guests: {
                            some: { userId },
                        },
                    },
                ],
            },
        });
        if (!trip) {
            throw new common_1.ForbiddenException("You are not part of this trip");
        }
        const visibilityFilter = role === roles_enum_1.Role.ORGANIZER
            ? undefined
            : {
                in: ["ALL", "GUEST"],
            };
        return this.prisma.timelineItem.findMany({
            where: {
                tripId,
                ...(visibilityFilter && {
                    visibility: visibilityFilter,
                }),
            },
            orderBy: {
                date: "asc",
            },
        });
    }
    async createTimelineItem(req, tripId, body) {
        const { date, title, description, visibility } = body;
        if (!date || !title || !visibility) {
            throw new common_1.BadRequestException("Missing required fields");
        }
        if (!["ORGANIZER", "GUEST", "ALL"].includes(visibility)) {
            throw new common_1.BadRequestException("Invalid visibility value");
        }
        const trip = await this.prisma.trip.findFirst({
            where: {
                id: tripId,
                organizerId: req.user.userId,
            },
        });
        if (!trip) {
            throw new common_1.ForbiddenException("You do not own this trip");
        }
        return this.prisma.timelineItem.create({
            data: {
                tripId,
                date: new Date(date),
                title,
                description,
                visibility,
            },
        });
    }
};
exports.TripsController = TripsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ORGANIZER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "createTrip", null);
__decorate([
    (0, common_1.Get)("my"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "myTrips", null);
__decorate([
    (0, common_1.Get)(":tripId/timeline"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Post)(":tripId/timeline"),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ORGANIZER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("tripId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "createTimelineItem", null);
exports.TripsController = TripsController = __decorate([
    (0, common_1.Controller)("trips"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsController);
//# sourceMappingURL=trips.controller.js.map