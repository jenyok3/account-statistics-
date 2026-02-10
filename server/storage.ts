import { users, type User, type InsertUser, type AccountStats } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAccountStats(): Promise<AccountStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAccountStats(): Promise<AccountStats> {
    const [stats] = await db
      .select({
        total: sql<number>`count(*)`,
        active: sql<number>`count(*) filter (where ${users.status} = 'active')`,
        blocked: sql<number>`count(*) filter (where ${users.status} = 'blocked')`,
      })
      .from(users);

    return {
      total: Number(stats?.total || 0),
      active: Number(stats?.active || 0),
      blocked: Number(stats?.blocked || 0),
    };
  }
}

export const storage = new DatabaseStorage();
