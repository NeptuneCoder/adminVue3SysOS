<template>
  <el-menu
    class="menu"
    :collapse="false"
    background-color="#001529"
    text-color="#fff"
  >
    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          @click="goRoute"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length === 1">
        <!-- index: {{ index }} 一样会导致标签事件错乱 -->
        <el-menu-item :index="item.path" v-if="!item.meta.hidden">
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <NavMenu :menuList="item.children"></NavMenu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup name="NavMenu">
import { defineProps } from "vue";
defineProps(["menuList"]);
import { useRouter } from "vue-router";
const router = useRouter();

const goRoute = (route) => {
  console.log("route === ", route);
  router.push(route.index);
};
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.menu {
  padding: 10px;

  p {
    color: #fff;
  }
}
</style>
