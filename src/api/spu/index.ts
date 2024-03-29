import netInstance from "@/utils/request";
import { BaseResponse } from "../base";

enum API {
  SPU_LIST = "/admin/product/{page}/{limit}",
  SPU_ADD = "/spu/add",
  SPU_UPDATE = "/spu/update",
}

/**
 * 
 *  {
        "records": [
            {
                "id": 11169,
                "createTime": "2024-03-28 16:27:41",
                "updateTime": "2024-03-28 16:27:41",
                "spuName": "我",
                "description": "吾问无为谓",
                "category3Id": 62,
                "tmId": 5,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11159,
                "createTime": "2024-03-24 22:05:47",
                "updateTime": "2024-03-24 22:07:24",
                "spuName": "111111",
                "description": "111111",
                "category3Id": 62,
                "tmId": 1,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11157,
                "createTime": "2024-03-28 16:07:38",
                "updateTime": "2024-03-28 16:07:38",
                "spuName": "我",
                "description": "我",
                "category3Id": 62,
                "tmId": 2,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11151,
                "createTime": "2024-03-28 15:48:55",
                "updateTime": "2024-03-28 15:48:55",
                "spuName": "我",
                "description": "我问问呜呜呜呜",
                "category3Id": 62,
                "tmId": 23,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11150,
                "createTime": "2024-03-24 22:05:47",
                "updateTime": "2024-03-24 22:07:24",
                "spuName": "1231",
                "description": "123",
                "category3Id": 62,
                "tmId": 1,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11149,
                "createTime": "2024-03-24 22:05:47",
                "updateTime": "2024-03-24 22:07:24",
                "spuName": "test11122",
                "description": "111",
                "category3Id": 62,
                "tmId": 3,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11148,
                "createTime": "2024-03-24 22:05:47",
                "updateTime": "2024-03-24 22:07:24",
                "spuName": "2222222",
                "description": "22",
                "category3Id": 62,
                "tmId": 4,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11147,
                "createTime": "2024-03-28 15:39:10",
                "updateTime": "2024-03-28 15:39:10",
                "spuName": "123321",
                "description": "123321222",
                "category3Id": 62,
                "tmId": 3,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11145,
                "createTime": "2024-03-28 14:41:32",
                "updateTime": "2024-03-28 14:41:32",
                "spuName": "wgl-52",
                "description": "wgl-desc-5",
                "category3Id": 62,
                "tmId": 4,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            },
            {
                "id": 11089,
                "createTime": "2024-03-26 20:14:24",
                "updateTime": "2024-03-26 20:14:24",
                "spuName": "你好-41",
                "description": "没啥说的-4",
                "category3Id": 62,
                "tmId": 35900,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            }
        ],
        "total": 11,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 2
    }
 */
/**
 *  {
                "id": 11089,
                "createTime": "2024-03-26 20:14:24",
                "updateTime": "2024-03-26 20:14:24",
                "spuName": "你好-41",
                "description": "没啥说的-4",
                "category3Id": 62,
                "tmId": 35900,
                "spuSaleAttrList": null,
                "spuImageList": null,
                "spuPosterList": null
            }
 */
export type SupRecords = SupRecord[];
export interface SupRecord {
  id: number;
  createTime: string;
  updateTime: string;
  spuName: string;
  description: string;
  category3Id: number;
  tmId: number;
  spuSaleAttrList: any;
  spuImageList: any;
  spuPosterList: any;
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
//上面定义类型别名，下面实现接口

export const reqSpuList = (page: number, limit: number, categoryId: number) => {
  return netInstance.get<any, SupDataBaseResponse>(
    API.SPU_LIST.replace("{page}", page.toString()).replace(
      "{limit}",
      limit.toString(),
    ) + `?category3Id=${categoryId}`,
  );
};

//下面实现接口
