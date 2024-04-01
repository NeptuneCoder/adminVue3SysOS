import { ref } from "vue";
import { User, Role } from "@/api/acl/user/types";

import { reqAllRoleUser } from "@/api/acl/user";
export default function () {
  const drawerRole = ref(false);

  const handleOpenRole = (user: User) => {
    console.log("handleOpenRole  我被调用了嘛？");
    drawerRole.value = true;
    roleUsername.value = user.username;
    getAllRoleUser(user.id!);
  };

  const handleCloseRole = () => {
    drawerRole.value = false;
  };
  //点击提交
  const handleRoleSubmit = () => {};
  const allRoleList = ref<Role[]>([]);
  const roleUsername = ref<string>("");

  const checkAll = ref(false);
  const isIndeterminate = ref(true);

  const checkedRole = ref<Role[]>([]);
  const handleCheckAllChange = (val: boolean) => {
    console.log("handleCheckAllChange  val = ", val);
    checkedRole.value = val ? allRoleList.value : [];
    console.log("checkedRole = ", checkedRole.value);
    isIndeterminate.value = false;
  };
  const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === allRoleList.value.length;
    isIndeterminate.value =
      checkedCount > 0 && checkedCount < allRoleList.value.length;
  };

  const getAllRoleUser = async (userId: number) => {
    const res = await reqAllRoleUser(userId);
    if (res.code !== 200) {
      console.log("获取角色失败");
      return;
    }
    checkedRole.value = res.data.assignRoles;
    allRoleList.value = res.data.allRolesList;
    isIndeterminate.value = false;
    checkAll.value = false;
  };
  return {
    checkAll,
    isIndeterminate,
    checkedRole,
    drawerRole,
    roleUsername,
    allRoleList,
    handleOpenRole,
    handleCloseRole,
    handleRoleSubmit,
    handleCheckAllChange,
    handleCheckedCitiesChange,
  };
}
