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
exports.JoinController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const roles_enum_1 = require("../auth/roles.enum");
const roles_decorator_1 = require("../auth/roles.decorator");
let JoinController = class JoinController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async joinTrip(req, body) {
        const trip = await this.prisma.trip.findUnique({
            where: { joinCode: body.code },
        });
        if (!trip) {
            throw new common_1.NotFoundException("Invalid trip code");
        }
        if (trip.organizerId === req.user.userId) {
            return { joined: true };
        }
        await this.prisma.tripGuest.upsert({
            where: {
                tripId_userId: {
                    tripId: trip.id,
                    userId: req.user.userId,
                },
            },
            update: {},
            create: {
                tripId: trip.id,
                userId: req.user.userId,
            },
        });
        return { joined: true };
    }
};
exports.JoinController = JoinController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.GUEST),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JoinController.prototype, "joinTrip", null);
exports.JoinController = JoinController = __decorate([
    (0, common_1.Controller)("trips/join"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JoinController);
//# sourceMappingURL=join.controller.js.map