import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: "postgresql://nathanpaul@localhost:5432/dp_app",
  },
});