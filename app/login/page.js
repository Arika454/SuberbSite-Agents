"use client";

import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log("Logged in:", user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <a href="https://superbsite.co.za/">
        <img src="logo.webp" alt="Logo" className="logo" />
      </a>
      <header className="register-header">
        <h1>Sales Agent Login</h1>
      </header>
      <h1 className="text">
        Welcome back, Agent! Log in now to access exclusive sales tools,
        training resources, and start earning uncapped commissions.
      </h1>
      <form id="login-form" onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register">
          Login
        </button>
      </form>
    </div>
  );
}
