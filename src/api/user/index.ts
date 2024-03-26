import netInstance from "@/utils/request";
import { LoginUser } from "@/models/user";
import API from "./API";

export function login(data: LoginUser) {
  return netInstance.request({
    url: API.login,
    method: "post",
    data: data,
  });
}

export function getUserInfo() {
  return netInstance.request({
    url: API.getUserInfo,
    method: "get",
  });
}
