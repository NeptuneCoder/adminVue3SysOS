import netInstance from "@/utils/request";
import { AttrTypeResponse, AttrValue } from "@/api/attr/types";
import { BaseResponse } from "../base";

// 商品分类相关API
enum API {
  //获取一级分类接口地址
  C1_URL = "/admin/product/getCategory1",
  //获取二级分类接口地址
  C2_URL = "/admin/product/getCategory2/",
  //获取三级分类接口地址
  C3_URL = "/admin/product/getCategory3/",
  //获取属性列表接口地址
  ATTR_URL = "/admin/product/attrInfoList/",
  DELETE_ATTR_URL = "/admin/product/deleteAttr/",
  MODIFY_ATTR_URL = "/admin/product/saveAttrInfo",
}

export function getCategory1() {
  return netInstance.get<any, AttrTypeResponse>(API.C1_URL);
}

export function getCategory2(id: number) {
  return netInstance.get<any, AttrTypeResponse>(API.C2_URL + id);
}

export function getCategory3(id: number) {
  return netInstance.get<any, AttrTypeResponse>(API.C3_URL + id);
}

export function reqCategoryList(c1Id: string, c2Id: string, c3Id: string) {
  return netInstance.get<any, BaseResponse>(
    API.ATTR_URL + c1Id + "/" + c2Id + "/" + c3Id,
  );
}

export function reqDelAttr(attrId: string | number) {
  return netInstance.get<any, BaseResponse>(API.DELETE_ATTR_URL + `${attrId}`);
}

export function reqModifyAttr(data: AttrValue) {
  return netInstance.post<any, BaseResponse>(API.MODIFY_ATTR_URL, data);
}
