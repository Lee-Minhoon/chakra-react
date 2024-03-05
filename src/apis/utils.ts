import axios from "axios";
import { QueryKey, UrlBuilder } from "./types";

const protoc =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https" : "http";

const getDomain = () => {
  return process.env.NODE_ENV === "production"
    ? window.location.host
    : process.env.NEXT_PUBLIC_SERVER_DOMAIN;
};

export class Api {
  static instance = axios.create({
    baseURL: `${protoc}://${getDomain()}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static addToken = (token: string) => {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  static removeToken = () => {
    delete this.instance.defaults.headers.common["Authorization"];
  };

  static get = async <T>(url: string, params?: object) => {
    return this.instance.get<T>(url, { params }).then((res) => res.data);
  };

  static post = async <T>(url: string, body?: object) => {
    return this.instance.post<T>(url, body).then((res) => res.data);
  };

  static put = async <T>(url: string, body?: object) => {
    return this.instance.put<T>(url, body).then((res) => res.data);
  };

  static patch = async <T>(url: string, body?: object) => {
    return this.instance.patch<T>(url, body).then((res) => res.data);
  };

  static delete = async <T>(url: string) => {
    return this.instance.delete<T>(url).then((res) => res.data);
  };

  static postForm = async <T>(url: string, body?: FormData) => {
    return this.instance.postForm<T>(url, body).then((res) => res.data);
  };
}

export const buildUrl = <T>(url: UrlBuilder<T>, data: T) => {
  return typeof url === "function" ? url(data) : url;
};

export const buildQueryKey = <T>(queryKey: QueryKey<T>, data: T) => {
  const [url, params] = queryKey;
  return [buildUrl(url, data), params];
};
