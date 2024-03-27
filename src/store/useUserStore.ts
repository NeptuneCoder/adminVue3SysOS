import { login, getUserInfo, reqlogout } from "@/api/user";
import { defineStore } from "pinia";
import { getToken, saveToken, removeToken } from "@/utils/storeUtils";
import { constantRoute } from "@/router/routers";
import { UserState } from "@/model/user/types";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: getToken(),
      routes: constantRoute,
      username: "", //
      avatar: "", //
    };
  },
  actions: {
    async userLogin(username: string, pwd: string) {
      const res = await login({ username: username, password: pwd });
      if (res.code == 200) {
        const token = res.data;
        console.log("登录成功", token);
        this.token = token;
        saveToken(token);
        return "ok";
      } else {
        return Promise.reject(new Error("登录失败"));
      }
    },
    async getUserInfo() {
      // TODO: 获取用户信息

      const res = await getUserInfo();
      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        console.log("获取用户信息成功", this.avatar);
        console.log("获取用户信息成功", this.username);
        res.data.roles.forEach((item) => {
          console.log(item);
        });
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    async logout() {
      console.log("logout");
      reqlogout();
      this.token = "";
      this.username = "";
      this.avatar = "";
      removeToken();
      return "ok";
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
});
