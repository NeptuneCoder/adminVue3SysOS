import { login, getUserInfo } from "@/api/user";
import { defineStore } from "pinia";
import { getToken, saveToken } from "@/utils/storeUtils";
import { constantRoute } from "@/router/routers";
import { UserState } from "@/model/types";

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: getToken(),
      routes: constantRoute,
      username: "admin",//
      avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",//
    };
  },
  actions: {
    async userLogin(username: string, pwd: string) {
      console.log("这里是store中，我被调用了嘛？");
      const res = await login({ username: name, pwd: pwd });
      if (res.data.code === 200) {
        let token = res.data.token;
        this.token = token;
        saveToken(token);
        return "ok";
      } else {
        return Promise.reject(new Error("登录失败"));
      }
    },
    async getUserInfo() {
      // TODO: 获取用户信息

      let res = await getUserInfo();

      console.log("获取用户信息", res);
      return "userInfo";
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
});
