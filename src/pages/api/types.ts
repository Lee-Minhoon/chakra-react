import { Nullable } from "@/types";

export type ID = number;

export type Session = Nullable<ID>;

export type Order = "asc" | "desc";

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export interface User extends Scheme {
  name: string;
  email: string;
  phone: string;
  profile?: string;
  approved: boolean;
}

export interface Post extends Scheme {
  userId: number;
  title: string;
  content: string;
}
