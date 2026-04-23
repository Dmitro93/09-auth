import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const getMeServer = async () => {
  const cookieStore = cookies();

  const res = await fetch(baseURL + "/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();
};