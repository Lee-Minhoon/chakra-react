import { ApiError } from "./types";

const protoc = process.env.NODE_ENV === "production" ? "https" : "http";
const domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

const extendedFetch = async (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new ApiError(res.status, data.message);
    return data;
  });
};

type Api = {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, body?: object) => Promise<T>;
  put: <T>(url: string, body?: object) => Promise<T>;
  patch: <T>(url: string, body?: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};

export const api: Api = {
  get: (url, params) => {
    const queryString = new URLSearchParams(params as Record<string, string>);
    return extendedFetch(`${protoc}://${domain}/${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  post: (url, body) => {
    return extendedFetch(`${protoc}://${domain}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  put: (url, body) => {
    return extendedFetch(`${protoc}://${domain}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  patch: (url, body) => {
    return extendedFetch(`${protoc}://${domain}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  delete: (url) => {
    return extendedFetch(`${protoc}://${domain}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
