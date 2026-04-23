"use client";

import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMe({ username });
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}