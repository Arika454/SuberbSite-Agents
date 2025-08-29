"use client";

import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import "./register.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [province, setProvince] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phonenumber)) {
      alert("Please enter a valid phone number (10–15 digits).");
      return;
    }
    try {
      const user = await registerUser(
        email,
        password,
        firstName,
        lastName,
        username,
        phonenumber,
        province
      );
      alert("Registered successfully!");
      console.log(user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="register-page">
      <a href="https://superbsite.co.za/">
        <img src="logo.webp" alt="Logo" className="logo" />
      </a>
      <header className="register-header">
        <h1>Sales Agent Sign-Up</h1>
      </header>
      <div className="text-image-container">
        <h1 className="text">
          Become a member of our sales team and unlock a world of unlimited
          earning potential! As a Sales Agent, you’ll play a crucial role in
          connecting our products with customers, building relationships, and
          driving sales growth. Our straightforward process is designed to
          support your success: simply sign up, complete our comprehensive
          training program, and start selling! With our competitive commission
          structure, you’ll have the opportunity to earn significant income
          based on your sales performance. The more you sell, the more you’ll
          earn – it’s that simple. Join our dynamic team of Sales Agents today
          and start building a brighter financial future!
        </h1>
        <img src="comission.webp" alt="Logo" className="comission" />
      </div>

      <form
        id="register-form"
        onSubmit={handleRegister}
        className="register-form"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        >
          <option value="">Select Province</option>
          <option value="Eastern Cape">Eastern Cape</option>
          <option value="Free State">Free State</option>
          <option value="Gauteng">Gauteng</option>
          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
          <option value="Limpopo">Limpopo</option>
          <option value="Mpumalanga">Mpumalanga</option>
          <option value="Northern Cape">Northern Cape</option>
          <option value="North West">North West</option>
          <option value="Western Cape">Western Cape</option>
        </select>
      </form>
      <div className="buttons">
        <button className="register" type="submit" form="register-form">
          Register
        </button>
        <button
          className="signin"
          type="button"
          onClick={() => router.push("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
