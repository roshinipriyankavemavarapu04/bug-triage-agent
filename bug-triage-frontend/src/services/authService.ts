import apiClient from "../api/api";

/* ==========================================
   Interfaces
========================================== */

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  username: string;
  email: string;
}

/* ==========================================
   Authentication Service
========================================== */

export const authService = {
  // ----------------------------
  // Register User
  // ----------------------------
  async register(
    username: string,
    email: string,
    password: string
  ) {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  },

  // ----------------------------
  // Login User
  // ----------------------------
  async login(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  },

  // ----------------------------
  // Logout
  // ----------------------------
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // ----------------------------
  // Token Operations
  // ----------------------------
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  // ----------------------------
  // User Operations
  // ----------------------------
  getUser(): User | null {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  },

  setUser(user: User) {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  },
};