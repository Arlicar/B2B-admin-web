<template>
  <div>
    <!-- 管理员 -->
    <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- tab标签导航栏 -->
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first" :lazy="true"
          ><Role></Role
        ></el-tab-pane>
        <el-tab-pane label="路由管理" name="second" :lazy="true"
          ><Router></Router
        ></el-tab-pane>
        <el-tab-pane label="用户管理" name="third" :lazy="true"
          ><User></User
        ></el-tab-pane>
        <el-tab-pane label="API管理" name="fourth" :lazy="true"
          ><Api></Api
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Api from "./manage/Api.vue";
import Role from "./manage/Role.vue";
import User from "./manage/User.vue";
import Router from "./manage/Router.vue";
export default {
  components: {
    Api,
    Role,
    User,
    Router,
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
</style>