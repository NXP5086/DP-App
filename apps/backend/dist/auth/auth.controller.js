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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_guard_1 = require("./jwt.guard");
const roles_decorator_1 = require("./roles.decorator");
const roles_enum_1 = require("./roles.enum");
const public_decorator_1 = require("./public.decorator");
let AuthController = class AuthController {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(body) {
        console.log("LOGIN BODY →", body);
        const email = typeof body?.email === "string"
            ? body.email
            : typeof body?.email?.email === "string"
                ? body.email.email
                : null;
        if (!email) {
            throw new common_1.BadRequestException("Client bug: invalid login payload (email must be string)");
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        const token = this.jwtService.sign({
            sub: user.id,
            role: user.role,
        });
        return { user, token };
    }
    async signup(body) {
        console.log("SIGNUP BODY →", body);
        if (!body ||
            typeof body.email !== "string" ||
            typeof body.name !== "string") {
            throw new common_1.BadRequestException("Invalid signup payload");
        }
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    role: "GUEST",
                },
            });
            const token = this.jwtService.sign({
                sub: user.id,
                role: user.role,
            });
            return { user, token };
        }
        catch (err) {
            console.error("SIGNUP ERROR ->", err);
            if (err?.code === "P2002") {
                throw new common_1.BadRequestException("Email already registered");
            }
            throw err;
        }
    }
    me(req) {
        return req.user;
    }
    organizerOnly() {
        return { ok: true, message: "Organizer access granted" };
    }
    guestOnly() {
        return { ok: true, message: "Guest access granted" };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ORGANIZER),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("organizer-only"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "organizerOnly", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.GUEST),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("guest-only"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "guestOnly", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map