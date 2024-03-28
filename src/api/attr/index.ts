import netInstance from "@/utils/request";

// 商品分类相关API
enum API {
  //获取一级分类接口地址
  C1_URL = "/admin/product/getCategory1",
  //获取二级分类接口地址
  C2_URL = "/admin/product/getCategory2/",
  //获取三级分类接口地址
  C3_URL = "/admin/product/getCategory3/",
}

export function getCategory1() {
  return netInstance.get(API.C1_URL);
}

export function getCategory2(id: number) {
  return netInstance.get(API.C2_URL + id);
}

export function getCategory3(id: number) {
  return netInstance.get(API.C3_URL + id);
}
