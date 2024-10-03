import dotenv from "dotenv";
import { createClient } from "redis";
import { logger } from "../logger/index.js";

dotenv.config();
export class Redis {
  private static instance: Redis;
  private client: ReturnType<typeof createClient>;
  constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 15515,
      },
    });
    this.client.on("connect", () => {
      console.log("Connected to Redis");
    });
    this.client.on("error", (err) => {
      logger.error("Redis error:", err);
      throw new Error("Redis error");
    });
  }

  static getInstance() {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }
  async connect() {
    await this.client.connect();
  }
  getClient() {
    return this.client;
  }
  async getCache(key: string) {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    }
  }
  async setCache(key: string, value: object | string | number, time?: number) {
    const dataToCache = JSON.stringify(value);
    time
      ? this.client.set(key, dataToCache, { EX: time })
      : this.client.set(key, dataToCache);
  }
  async deleteCache(key: string) {
    await this.client.del(key);
  }
}
