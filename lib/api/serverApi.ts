import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// helper
const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

// NOTES
export const fetchNotes = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) => {
  const headers = await getCookieHeader();

  const res = await api.get("/notes", {
    params,
    headers,
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getCookieHeader();

  const res = await api.get(`/notes/${id}`, {
    headers,
  });

  return res.data;
};

// USER
export const getMe = async (): Promise<User> => {
  const headers = await getCookieHeader();

  const res = await api.get("/users/me", {
    headers,
  });

  return res.data;
};

export const checkSession = async () => {
  const headers = await getCookieHeader();

  const res = await api.get("/auth/session", {
    headers,
  });

  return res; 
};