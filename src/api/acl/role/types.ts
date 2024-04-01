import { BaseResponse } from "@/api/base";
import { Role } from "@/api/acl/user/types";

export interface RoleBaseResponse extends BaseResponse {
  data: RoleData;
}
/**
 *  "total": 41,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 5
 */
export interface RoleData {
  records: Role[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface BasePermissionResponse extends BaseResponse {
  data: Permission[];
}
export interface Permission {
  id: number;
  level: number;
  name: string;
  children: Permission[];
  select: boolean;
}
