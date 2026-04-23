"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push("/sign-in");
  };

  if (isAuthenticated) {
    return (
      <>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <p>{user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/sign-in">Login</Link>
      </li>
      <li>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
}