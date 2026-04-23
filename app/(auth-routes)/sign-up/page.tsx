"use client";

import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const user = await login({ email, password });
      setUser(user);
      router.push("/profile");
    } catch {
      setError("Login error");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input name="email" />
        <input name="password" />
        <button type="submit">Log in</button>
        <p>{error}</p>
      </form>
    </main>
  );
}