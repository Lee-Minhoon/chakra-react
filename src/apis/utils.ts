import { getHost, getProtocol } from "@/utils";
import axios, { AxiosInstance } from "axios";
import { QueryKey, UrlBuilder } from "./types";

export class Api {
  static instance: AxiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    baseURL: `${getProtocol()}://${getHost()}`,
  });

  static addToken = (token: string) => {
    localStorage.setItem("token", token);
    Api.instance.defaults.headers["Authorization"] = token;
  };

  static removeToken = () => {
    localStorage.removeItem("token");
    delete Api.instance.defaults.headers["Authorization"];
  };

  static get = async <T>(url: string, params?: object) => {
    return Api.instance.get<T>(url, { params }).then((res) => res.data);
  };

  static post = async <T>(url: string, body?: object) => {
    return Api.instance.post<T>(url, body).then((res) => res.data);
  };

  static put = async <T>(url: string, body?: object) => {
    return Api.instance.put<T>(url, body).then((res) => res.data);
  };

  static patch = async <T>(url: string, body?: object) => {
    return Api.instance.patch<T>(url, body).then((res) => res.data);
  };

  static delete = async <T>(url: string) => {
    return Api.instance.delete<T>(url).then((res) => res.data);
  };

  static postForm = async <T>(url: string, body?: FormData) => {
    return Api.instance.postForm<T>(url, body).then((res) => res.data);
  };
}

export const buildUrl = <T>(url: UrlBuilder<T>, data: T) => {
  return typeof url === "function" ? url(data) : url;
};

export const buildQueryKey = <T>(queryKey: QueryKey<T>, data: T) => {
  const [url, params] = queryKey;
  return [buildUrl(url, data), params];
};
