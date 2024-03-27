import { RouteRecordRaw } from "vue-router";
// 登录用户信息
export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface BaseResponse {
  code: number;
  message: string;
  ok: boolean;
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
