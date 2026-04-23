import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main>
      <h1>Profile Page</h1>

      <Link href="/profile/edit">Edit Profile</Link>

      <Image
        src={user.avatar}
        alt="avatar"
        width={120}
        height={120}
      />

      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </main>
  );
}