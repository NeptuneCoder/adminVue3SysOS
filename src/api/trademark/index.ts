import netInstance from "@/utils/request";
import { TrademarkListResponse, TrademarkItemData } from "@/types/trademark";
import { BaseResponse } from "../base";
enum API {
  GET_TRADEMARK_LIST = "/admin/product/baseTrademark/", //获取品牌的列表
  SAVE_TRADEMARK = "/admin/product/baseTrademark/save", //保存品牌POST
  UPDATE_TRADEMARK = "/admin/product/baseTrademark/update", //更新品牌PUT
  DELETE_TRADEMARK = "/admin/product/baseTrademark/remove/", //删除品牌
}

export const getTrademarkList = (
  page: number,
  limit: number,
): TrademarkListResponse => {
  //获取类型里列表
  return netInstance.get(API.GET_TRADEMARK_LIST + page + "/" + limit);
};
export const addOrUpdateTrademark = (
  data: TrademarkItemData,
): Promise<BaseResponse> => {
  if (data.id != -1) {
    //更新品牌
    return netInstance.put(API.UPDATE_TRADEMARK, data);
  } else {
    return netInstance.post(API.SAVE_TRADEMARK, data);
  }
};

export const reqDeleteTrademark = (id: number): Promise<BaseResponse> => {
  return netInstance.delete(API.DELETE_TRADEMARK + id);
};
