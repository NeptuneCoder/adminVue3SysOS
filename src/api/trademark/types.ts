import { BaseResponse } from "@/mode/base";
/**
 * {
      "createTime": "2024-03-27T07:15:05.081Z",
      "id": 0,
      "logoUrl": "string",
      "tmName": "string",
      "updateTime": "2024-03-27T07:15:05.081Z"
    }
 */
export interface TrademarkListResponse extends BaseResponse {
  data: TrademarkData;
}

export interface TrademarkItemData {
  id: number;
  tmName: string;
  logoUrl: string;
}
export type Records = TrademarkItemData[];
export interface TrademarkData {
  records: Records;
  total: number;
  size: number;
  current: number; //当前第几页
  pages: number;
}
