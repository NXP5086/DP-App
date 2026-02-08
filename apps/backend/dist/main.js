"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.enableCors({
        origin: "*",
        credentials: true,
    });
    const port = 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`Backend listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map