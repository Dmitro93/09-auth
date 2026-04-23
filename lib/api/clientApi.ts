import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";


export const fetchNotes = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) => {
  const res = await api.get("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await api.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};


export const register = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get("/auth/session");
  return res.data || null;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch("/users/me", data);
  return res.data;
};