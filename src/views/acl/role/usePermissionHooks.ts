import { onMounted, ref } from "vue";
import { Role } from "@/api/acl/user/types";
import { reqPermissionToRole, reqDoAssignPermission } from "@/api/acl/role";
import { Permission } from "@/api/acl/role/types";
import { ElMessage } from "element-plus";
import mitt from "mitt";
export default function () {
  const mitter = mitt();
  const drawerRole = ref(false);
  const permissions = ref<Permission[]>([]);
  const expendKeys = ref<string[]>([]);
  const selectedKeys = ref<number[]>([]);
  const roleId = ref<number>();
  const showPermissionDrawer = (role: Role) => {
    drawerRole.value = true;
    roleId.value = role.id!;
    getPermission(role.id!);
  };
  onMounted(() => {
    // getPermission();
  });

  const getPermission = async (roleId: number) => {
    //TODO: get permission from server
    let res = await reqPermissionToRole(roleId);
    if (res.code !== 200) {
      return;
    }
    getSelectedMenu(res.data);
    permissions.value = res.data;
  };
  const getSelectedMenu = (permissions: Permission[]) => {
    permissions.forEach((item) => {
      if (item.select && item.level != 4) {
        getSelectedMenu(item.children);
      } else {
        if (item.select) {
          selectedKeys.value.push(item.id);
        }
      }
    });
  };

  const tree = ref();
  const submitPermission = () => {
    console.log(selectedKeys);
    drawerRole.value = false;
    const arr1 = tree.value.getCheckedKeys();
    const arr2 = tree.value.getHalfCheckedKeys();
    console.log(arr1, arr2);
    const arr3 = arr1.concat(arr2);
    const res = reqDoAssignPermission(roleId.value!, arr3);
    if (res.code == 200) {
      ElMessage.success("权限分配成功");
    } else {
      ElMessage.error("权限分配失败");
    }
    mitter.emit("refresh");
    console.log("submitPermission:", res);
  };
  return {
    tree,
    drawerRole,
    permissions,
    expendKeys,
    selectedKeys,
    showPermissionDrawer,
    submitPermission,
    mitter,
  };
}
