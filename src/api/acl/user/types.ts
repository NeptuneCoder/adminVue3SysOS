import { BaseResponse } from "../../base";
/**
 * "total": 5,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": null,
		"maxLimit": null,
		"searchCount": true,
		"pages": 1
 */
export interface UserBaseResponse extends BaseResponse {
  data: UserData;
}

export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username: string;
  password: string;
  name: string;
  phone?: string;
  roleName?: string;
}

export interface UserData {
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: any;
  maxLimit: any;
  searchCount: boolean;
  pages: number;
  records: User[];
}
