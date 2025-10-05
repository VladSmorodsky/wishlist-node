import request from "supertest";
import { app } from "../../src/app";
import * as db from "../db";

describe("Auth Controller", () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe("POST /sign-up", () => {
    it("should return Invalid email address message", async () => {
      const response = await request(app).post("/auth/sign-up").send({
        name: "Test User",
        email: "",
        password: "password123",
      });

      expect(response.status).toBe(400);
      const body = response.body;
      expect(body).toHaveProperty("error");
      expect(body.error).toBe("Invalid email address");
    });

    it("should return Password confirmation is required message", async () => {
      const response = await request(app).post("/auth/sign-up").send({
        name: "Test User",
        email: "test@example.com",
        password: "Password123",
      });

      expect(response.status).toBe(400);
      const body = response.body;
      expect(body).toHaveProperty("error");
      expect(body.error).toBe("Password confirmation is required");
    });

    it("should return error must be at least 8 characters long message", async () => {
      const response = await request(app).post("/auth/sign-up").send({
        name: "Test User",
        email: "test@example.com",
        password: "Pass123",
      });

      expect(response.status).toBe(400);
      const body = response.body;
      expect(body).toHaveProperty("error");
      expect(body.error).toBe("Password must be at least 8 characters long");
    });

    it("should create user with valid data", async () => {
      const response = await request(app).post("/auth/sign-up").send({
        name: "Test User",
        email: "test@example.com",
        password: "Password123",
        passwordConfirmation: "Password123",
      });
      expect(response.status).toBe(201);
      const body = response.body;
      expect(body).toHaveProperty("message", "User signed up successfully");
      expect(body).toHaveProperty("user");
      expect(body.user).toHaveProperty("id");
      expect(body.user).toHaveProperty("name", "Test User");
      expect(body.user).toHaveProperty("email", "test@example.com");
    });
  });
});
