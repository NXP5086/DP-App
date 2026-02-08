import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ REQUIRED FOR REACT NATIVE FETCH
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