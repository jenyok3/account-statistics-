import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.stats.get.path, async (req, res) => {
    const stats = await storage.getAccountStats();
    res.json(stats);
  });

  // Seed data if empty
  const stats = await storage.getAccountStats();
  if (stats.total === 0) {
    console.log("Seeding database...");
    await storage.createUser({ username: "user1", status: "active" });
    await storage.createUser({ username: "user2", status: "active" });
    await storage.createUser({ username: "user3", status: "active" });
    await storage.createUser({ username: "user4", status: "blocked" });
    await storage.createUser({ username: "user5", status: "blocked" });
    await storage.createUser({ username: "user6", status: "active" });
    console.log("Database seeded!");
  }

  return httpServer;
}
