import { ApiError, QueryKey, UrlBuilder } from "./types";

const protoc = process.env.NODE_ENV === "production" ? "https" : "http";

const getDomain = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_DOMAIN
    : window.location.host;
};

const getUrl = (url: string, searchParams?: URLSearchParams) => {
  return `${protoc}://${getDomain()}/${url}${
    searchParams ? `?${searchParams}` : ""
  }`;
};

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
  postForm: <T>(url: string, body?: FormData) => Promise<T>;
};

export const api: Api = {
  get: (url, params) => {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    return extendedFetch(getUrl(url, searchParams), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  post: (url, body) => {
    return extendedFetch(getUrl(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  put: (url, body) => {
    return extendedFetch(getUrl(url), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  patch: (url, body) => {
    return extendedFetch(getUrl(url), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  delete: (url) => {
    return extendedFetch(getUrl(url), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  postForm: (url, body) => {
    return extendedFetch(getUrl(url), {
      method: "POST",
      body,
    });
  },
};

export const buildUrl = <T>(url: UrlBuilder<T>, data: T) => {
  return typeof url === "function" ? url(data) : url;
};

export const buildQueryKey = <T>(queryKey: QueryKey<T>, data: T) => {
  const [url, params] = queryKey;
  return [buildUrl(url, data), params];
};
