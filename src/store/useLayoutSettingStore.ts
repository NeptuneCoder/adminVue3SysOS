import { defineStore } from "pinia";

export const useLayoutSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      fold: false,
    };
  },
  actions: {},
  getters: {},
});
