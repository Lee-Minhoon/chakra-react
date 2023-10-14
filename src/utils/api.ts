import { QueryParams } from "@/types";

const protoc = process.env.NODE_ENV === "production" ? "https" : "http";
const domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

type Api = {
  get: <T>(url: string, params?: QueryParams) => Promise<T>;
  post: <T>(url: string, body?: unknown) => Promise<T>;
  put: <T>(url: string, body?: unknown) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};

export const api: Api = {
  get: (url, params) => {
    const queryString = new URLSearchParams(params as Record<string, string>);
    return fetch(`${protoc}://${domain}/${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  post: (url, body) => {
    return fetch(`${protoc}://${domain}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  put: (url, body) => {
    return fetch(`${protoc}://${domain}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  delete: (url) => {
    return fetch(`${protoc}://${domain}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};
