import netInstance from "@/utils/request";
import {
  UserBaseResponse,
  User,
  RoleBaseResponse,
  AssignRoleRequest,
} from "@/api/acl/user/types";
import { BaseResponse } from "@/api/base";
enum API {
  USER_LIST = "/admin/acl/user/{page}/{limit}",
  ADD_USER = "/admin/acl/user/save",
  UPDATE_USER = "/admin/acl/user/update",
  DELETE_USER = "/admin/acl/user/remove/{id}",
  ALL_ROLE_USER = "/admin/acl/user/toAssign/{adminId}",
  //分配角色
  ASSIGN_ROLE = "/admin/acl/user/doAssignRole",
  //删除一批用户
  DELETE_BATCH_USER = "/admin/acl/user/batchRemove",
}

export const reqDeleteUser = (id: number): Promise<BaseResponse> => {
  return netInstance.delete<any, BaseResponse>(
    API.DELETE_USER.replace("{id}", id.toString()),
  );
};

/**
 * 
 * @param data {
  "createTime": "2024-03-29T13:28:28.083Z",
  "id": 0,
  "name": "string",
  "password": "string",
  "phone": "string",
  "roleName": "string",
  "updateTime": "2024-03-29T13:28:28.083Z",
  "username": "string"
}
 * @returns 
 */
export const reqAddOrUpdateUser = (data: User): Promise<BaseResponse> => {
  if (data.id) {
    return netInstance.put<any, BaseResponse>(API.UPDATE_USER, data);
  } else {
    return netInstance.post<any, BaseResponse>(API.ADD_USER, data);
  }
};

export const reqAllUserInfo = (
  page: number,
  limit: number,
  username?: string,
): Promise<UserBaseResponse> => {
  return netInstance.get<any, UserBaseResponse>(
    API.USER_LIST.replace("{page}", page.toString()).replace(
      "{limit}",
      limit.toString(),
    ) +
      "?username=" +
      username,
  );
};

export const reqAllRoleUser = (adminId: number): Promise<RoleBaseResponse> => {
  return netInstance.get<any, RoleBaseResponse>(
    API.ALL_ROLE_USER.replace("{adminId}", adminId.toString()),
  );
};

export const reqAssignRole = (
  data: AssignRoleRequest,
): Promise<BaseResponse> => {
  return netInstance.post<any, BaseResponse>(API.ASSIGN_ROLE, data);
};

export const reqDeleteBatchUser = (ids: number[]): Promise<BaseResponse> => {
  return netInstance.post<any, BaseResponse>(API.DELETE_BATCH_USER, ids);
};
