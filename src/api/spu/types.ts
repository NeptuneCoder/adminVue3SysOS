import { BaseResponse } from "../base";
import { TrademarkItemData } from "@/api/trademark/types";

export type SupRecords = SupRecord[];

export interface SupRecord {
  id: number;
  createTime: string;
  updateTime: string;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string; //品牌id
  spuSaleAttrList: SpuSaleAttr[] | null; //spu销售属性列表
  spuImageList: SupImages | null; //已有的spu图片列表
  spuPosterList: HasSaleAttr[] | null; //spu海报列表
}
export interface SupDataBaseResponse extends BaseResponse {
  data: SupData;
}

export interface SupData {
  total: number;
  records: SupRecords;
  size: number;
  current: number;
  orders: Array<any>;
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: any;
  maxLimit: any;
  searchCount: boolean;
  pages: number;
}
export interface AllTrademarkBaseResponse extends BaseResponse {
  data: TrademarkItemData[];
}
export type SupImages = SupImage[];

export interface SupImage {
  id: number;
  supId: number;
  imgName: string;
  imgUrl: string;
}

export interface SpuImageBaseResponse extends BaseResponse {
  data: SupImages;
}

/**
 * 销售属性对象
 * {
      "id": 29,
      "spuId": 18,
      "baseSaleAttrId": 0,
      "saleAttrName": "",
      "spuSaleAttrValueList": [
        {
          "id": 58,
          "spuId": 18,
          "baseSaleAttrId": 0,
          "saleAttrValueName": "",
          "saleAttrName": "",
          "isChecked": null
        }
      ]
    }
 */

export interface SpuSaleAttr {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValue[];
}

export interface SpuSaleAttrValue {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: boolean;
}
export interface SpuSaleAttrBaseResponse extends BaseResponse {
  data: SpuSaleAttr[];
}

export interface HasSaleAttr {
  id: number;
  name: string;
}
export interface HasSaleAttrBaseResponse extends BaseResponse {
  data: HasSaleAttr[];
}
