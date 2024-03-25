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
