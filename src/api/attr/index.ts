import netInstance from "@/utils/request";

// 商品分类相关API
enum API {
  CONE_CATAGORY = "/admin/product/get/category1/id",
  CTWO_CATAGORY = "/admin/product/get/category2/id",
  CTHREE_CATAGORY = "/admin/product/get/category3/id",
}

export function getCategory1(id: number) {
  return netInstance.get(API.C1_CATAGORY.replace("id", id.toString()));
}
