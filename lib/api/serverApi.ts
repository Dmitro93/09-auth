import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const getHeaders = () => {
  const cookieStore = cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};


export const fetchNotes = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) => {
  const query = new URLSearchParams(params as Record<string, string>);

  const res = await fetch(`${baseURL}/notes?${query}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  return res.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await fetch(`${baseURL}/notes/${id}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  return res.json();
};


export const getMe = async (): Promise<User> => {
  const res = await fetch(`${baseURL}/users/me`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  return res.json();
};

export const checkSession = async (): Promise<User | null> => {
  const res = await fetch(`${baseURL}/auth/session`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  return data || null;
};