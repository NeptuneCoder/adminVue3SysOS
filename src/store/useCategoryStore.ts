import { defineStore } from "pinia";
import { getCategory1, getCategory2, getCategory3 } from "@/api/attr";
import { AttrStoreState } from "@/api/attr/types";

export const useCategoryStore = defineStore("category", {
  state: (): AttrStoreState => ({
    c1Arr: [],
    c1id: "",
    c2Arr: [],
    c2id: "",
    c3Arr: [],
    c3id: "",
  }),
  getters: {},
  actions: {
    async getC1() {
      const res = await getCategory1();
      this.c1Arr = res.data;
      return res;
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
      return res;
    },
  },
});
