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
}
export type AttrTypes = AttrType[];

export interface AttrTypeResponse extends BaseResponse {
  data: AttrTypes;
}

export interface AttrStoreState {
  c1Arr: AttrTypes;
  c2Arr: AttrTypes;
  c3Arr: AttrTypes;
  c1v: number;
  c2v: number;
  c3v: number;
}
