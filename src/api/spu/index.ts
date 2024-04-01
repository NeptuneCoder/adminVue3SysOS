import netInstance from "@/utils/request";

import {
  SupDataBaseResponse,
  AllTrademarkBaseResponse,
  SpuImageBaseResponse,
  SpuSaleAttrBaseResponse,
  HasSaleAttrBaseResponse,
} from "@/api/spu/types";

enum API {
  SPU_LIST = "/admin/product/{page}/{limit}",
  //品牌列表接口
  TRADMARK_LIST = "/admin/product/baseTrademark/getTrademarkList",
  //获取一个spu下的所有品牌图片集合
  SPU_IMAGE_LIST = "/admin/product/spuImageList/{spuId}",
  //商品销售属性列表接口
  SPU_SALE_ATTR_LIST = "/admin/product/spuSaleAttrList/{spuId}",
  //获取sup的销售属性列表
  SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
  //追加新的spu
  ADD_SPU = "/admin/product/saveSpuInfo",
  //更新已有的spu
  UPDATE_SPU = "/admin/product/updateSpuInfo",
}

export const reqSpuList = (page: number, limit: number, categoryId: number) => {
  return netInstance.get<any, SupDataBaseResponse>(
    API.SPU_LIST.replace("{page}", page.toString()).replace(
      "{limit}",
      limit.toString(),
    ) + `?category3Id=${categoryId}`,
  );
};

//获取所有的品牌集合
export const reqAllSupTradmarkList = () => {
  return netInstance.get<any, AllTrademarkBaseResponse>(API.TRADMARK_LIST);
};

//获取一个spu下的所有品牌图片集合
export const reqSpuImageList = (spuId: number) => {
  return netInstance.get<any, SpuImageBaseResponse>(
    API.SPU_IMAGE_LIST.replace("{spuId}", spuId.toString()),
  );
};

//获取sup的销售属性列表
export const reqSpuSaleAttrList = (spuId: number) => {
  return netInstance.get<any, SpuSaleAttrBaseResponse>(
    API.SPU_SALE_ATTR_LIST.replace("{spuId}", spuId.toString()),
  );
};
//获取已有的全部的销售属性
export const reqAllSaleAttrList = () => {
  return netInstance.get<any, HasSaleAttrBaseResponse>(API.SALE_ATTR_URL);
};
