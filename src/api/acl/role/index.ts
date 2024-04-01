import netInstance from "@/utils/request";
import { BasePermissionResponse, RoleBaseResponse } from "@/api/acl/role/types";
import { Role } from "../user/types";
import { BaseResponse } from "@/api/base";
enum API {
  ALL_ROLE = "/admin/acl/role/{page}/{limit}",
  DEL_ROLE = "/admin/acl/role/remove/{id}",
  ADD_ROLE = "/admin/acl/role/save",
  UPDATE_ROLE = "/admin/acl/role/update",
  ALL_PERMISSION = "/admin/acl/permission",
  Permission_ROLE = "/admin/acl/permission/toAssign/{roleId}",
  //分配权限
  DOASSIGN_PERMISSION = "/admin/acl/permission/doAssign",
}
export const reqAllRoles = (page: number, limit: number, roleName?: string) => {
  return netInstance.get<any, RoleBaseResponse>(
    API.ALL_ROLE.replace("{page}", page.toString()).replace(
      "{limit}",
      limit.toString(),
    ) +
      "?roleName=" +
      roleName,
  );
};
export const reqAddOrUpdateRole = (data: Role) => {
  if (data.id) {
    return netInstance.put<any, BaseResponse>(API.UPDATE_ROLE, data);
  } else {
    return netInstance.post<any, BaseResponse>(API.ADD_ROLE, data);
  }
};

export const reqDelRole = (id: number) => {
  return netInstance.delete<any, BaseResponse>(
    API.DEL_ROLE.replace("{id}", id.toString()),
  );
};

export const reqAllPermissions = () => {
  return netInstance.get<any, BasePermissionResponse>(API.ALL_PERMISSION);
};
export const reqPermissionToRole = (roleId: number) => {
  return netInstance.get<any, BasePermissionResponse>(
    API.Permission_ROLE.replace("{roleId}", roleId.toString()),
  );
};

export const reqDoAssignPermission = (roleId: number, data: number[]) => {
  return netInstance.post<any, BaseResponse>(
    API.DOASSIGN_PERMISSION +
      "?roleId=" +
      roleId +
      "&permissionId=" +
      data.join(","),
  );
};
