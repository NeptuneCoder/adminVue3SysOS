import { RouteRecordRaw } from "vue-router";
import { BaseResponse } from "@/model/base";
// 登录用户信息
export interface LoginUserRequest {
  username: string;
  password: string;
}

// 登录用户响应
export interface LoginUserResponse extends BaseResponse {
  data: string;
}

export interface UserInfoResponse extends BaseResponse {
  data: {
    name: string;
    avatar: string;
    roles: string[];
    routes: string[];
    buttons: string[];
  };
}

export interface UserState {
  token: string | null;
  routes: RouteRecordRaw[];
  username: string;
  avatar: string;
}
