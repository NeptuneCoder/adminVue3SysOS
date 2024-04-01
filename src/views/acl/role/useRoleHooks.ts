import { Role } from "@/api/acl/user/types";
import { onMounted, ref } from "vue";
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";
import { reqAllRoles, reqDelRole } from "@/api/acl/role";
import { ElMessage } from "element-plus";
export default function () {
  const layoutSettingStore = useLayoutSettingStore();
  const roles = ref<Role[]>([]);
  const pageNo = ref(1);
  const pageSize = ref(10);
  const totalSize = ref(0);
  const keyword = ref("");
  // TODO: implement search hooks
  const search = () => {
    // TODO: implement search logic
    console.log("search", keyword.value);
    getRoles();
  };

  const reset = () => {
    // TODO: implement reset logic
    console.log("reset");
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
  };

  const getRoles = async () => {
    const res = await reqAllRoles(pageNo.value, pageSize.value, keyword.value);
    if (res.code === 200) {
      roles.value = res.data.records;
      totalSize.value = res.data.total;
    }
  };
  onMounted(() => {
    getRoles();
  });

  const delRole = async (role: Role) => {
    // TODO: implement delete role logic
    console.log(role);
    let res = await reqDelRole(role.id!);
    if (res.code === 200) {
      getRoles();
      ElMessage.success("删除成功");
    } else {
      ElMessage.error("删除失败");
    }
  };

  return {
    roles,
    pageNo,
    pageSize,
    totalSize,
    keyword,
    search,
    reset,
    getRoles,
    delRole,
  };
}
