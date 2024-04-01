import { ref } from "vue";
import { reqAllUserInfo } from "@/api/acl/user";
import { User } from "@/api/acl/user/types";
import { useLayoutSettingStore } from "@/store/useLayoutSettingStore";

export default function () {
  const settingStore = useLayoutSettingStore();
  const keyword = ref("");
  const pageNo = ref(1);
  const pageSize = ref(10);
  //分页总数
  const totalSize = ref(0);
  const users = ref<User[]>([]);

  const getAllUserInfo = async (page: number, pageSize: number) => {
    let res = await reqAllUserInfo(page, pageSize, keyword.value);
    users.value = res.data.records;
    totalSize.value = res.data.total;
  };

  const reset = async () => {
    // pageNo.value = 1;
    // pageSize.value = 10;
    // keyword.value = "";
    // let res = await reqAllUserInfo(pageNo.value, pageSize.value);
    // users.value = res.data.records;
    // totalSize.value = res.data.total;
    settingStore.refresh = !settingStore.refresh;
  };
  return {
    users,
    pageNo,
    pageSize,
    totalSize,
    keyword,
    getAllUserInfo,
    reset,
  };
}
