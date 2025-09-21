import { RegisterForm } from "@/types/RegisterForm";

export default class AuthService {
  static async register(data: RegisterForm) {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Register failed");
    return response.json();
  }

  static async login(data: { email: string; password: string }) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  }
}
