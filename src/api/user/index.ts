import netInstance from "@/utils/request";
import {
  LoginUserRequest,
  UserInfoResponse,
  LoginUserResponse,
} from "@/models/user/types";
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  logout = "/admin/acl/index/logout",
  getUserInfo = "/admin/acl/index/info",
  getMenu = "/admin/acl/index/getMenu",
  getRoutes = "/admin/acl/index/getRoutes",
}

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
