"use client";

import css from "./EditProfilePage.module.css";
import { useState, useEffect } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore"; 

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser); 

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = await updateMe({ username });

    setUser(updatedUser); 

    router.push("/profile");
  };

  const handleCancel = () => {
    router.back(); // 
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel} 
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}