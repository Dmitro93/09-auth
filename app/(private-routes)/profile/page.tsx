import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = cookies();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const user = await res.json();

  return (
    <main>
      <h1>Profile</h1>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </main>
  );
}