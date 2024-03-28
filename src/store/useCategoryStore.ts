import { defineStore } from "pinia";
import { getCategory1, getCategory2, getCategory3 } from "@/api/attr";
import { AttrStoreState } from "@/api/types";

export const useCategoryStore = defineStore("category", {
  state: (): AttrStoreState => ({
    c1Arr: [],
    c1v: "",
    c2Arr: [],
    c2v: "",
    c3Arr: [],
    c3v: "",
  }),
  getters: {},
  actions: {
    async getC1() {
      const res = await getCategory1();
      this.c1Arr = res.data;
    },

    async getC2(id: number) {
      const res = await getCategory2(id);
      if (res.code == 200) {
        this.c2Arr = res.data;
      } else {
        this.c2Arr = [];
      }
      return res;
    },
    async getC3(id: number) {
      const res = await getCategory3(id);
      this.c3Arr = res.data;
    },
  },
});
