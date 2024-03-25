import { RouteRecordRaw } from "vue-router";

export interface LoginUser {
  username: string;
  pwd: string;
}

export interface UserState {
  token: string | null;
  routes: RouteRecordRaw[];
}
