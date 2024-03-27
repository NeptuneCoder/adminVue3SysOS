import netInstance from "@/utils/request";
import {
  LoginUserRequest,
  UserInfoResponse,
  LoginUserResponse,
} from "@/models/user/types";
import API from "./API";

export function login(data: LoginUserRequest): Promise<LoginUserResponse> {
  return netInstance.request({
    url: API.LOGIN_URL,
    method: "post",
    data: data,
  });
}

export function getUserInfo(): Promise<UserInfoResponse> {
  return netInstance.request({
    url: API.getUserInfo,
    method: "get",
  });
}

export const reqlogout = () => {
  return netInstance.request({
    url: API.logout,
    method: "post",
  });
};
