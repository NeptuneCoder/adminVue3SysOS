import { defineStore } from "pinia";

export const useLayoutSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      fold: false,
      refresh: false,
      isFullScren: false,
      isMenuCollapsed: false,
    };
  },
  actions: {},
  getters: {},
});
