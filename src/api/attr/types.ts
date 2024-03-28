import { BaseResponse } from "@/mode/base";

/**
 * {
            "id": 1,
            "createTime": "2021-12-10 01:31:41",
            "updateTime": "2022-05-07 11:42:44",
            "name": "图书/音像/电子书刊"
        }
 */

export interface AttrType {
  id: number;
  createTime: string;
  updateTime: string;
  name: string;
  category1Id?: number | string;
  category2Id?: number | string;
}
export type AttrTypes = AttrType[];

export interface AttrTypeResponse extends BaseResponse {
  data: AttrTypes;
}

export interface AttrStoreState {
  c1Arr: AttrTypes;
  c2Arr: AttrTypes;
  c3Arr: AttrTypes;
  c1id: string | number;
  c2id: string | number;
  c3id: string | number;
}

/**
 * 根据属性值获取到的属性列表
 *  {
            "id": 30263,
            "createTime": null,
            "updateTime": null,
            "attrName": "1231456",
            "categoryId": 61,
            "categoryLevel": 3,
            "attrValueList": [
                {
                    "id": 327331,
                    "createTime": null,
                    "updateTime": null,
                    "valueName": "123456",
                    "attrId": 30263
                }
            ]
        }
 */

export interface AttrValueBaseResponse extends BaseResponse {
  data: AttrValue[];
}
export interface AttrValue {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  attrName: string;
  categoryId?: number | string;
  categoryLevel: number;
  attrValueList: AttrItemValue[];
}

export interface AttrItemValue {
  id?: number;
  createTime: string | null;
  updateTime: string | null;
  valueName: string;
  attrId?: number;
}
