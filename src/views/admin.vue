<!-- admin.vue -->
<script setup>
import {useRoute} from "vue-router";
import { ElContainer, ElAside, ElHeader, ElMain, ElMenu, ElMenuItem, ElSubMenu, ElBreadcrumb, ElBreadcrumbItem, ElDropdown, ElDropdownMenu, ElDropdownItem} from 'element-plus';
import {House, Menu} from "@element-plus/icons-vue";
import router from "../router/index.js";
const route = useRoute();
const handleLogout = () => {
  // 清除 JWT Token
  localStorage.removeItem('jwtToken');

  // 重新定向到登录页面
  router.push('/login');
};
</script>
<template>
  <div>
    <el-container>
      <!--    左侧边栏-->
      <el-aside style="width: 200px; min-height: 100vh; background-color: #001529">
        <div class="logo"><p class="shine">inuyume'Blog</p></div>
        <el-menu
            router
            background-color="#001529"
            text-color="rgba(255,255,255,0.65)"
            active-text-color="#fff"
            style="border: none;"
            :default-active="$route.path">
          <el-menu-item index="/admin">
            <i style="flex: 0.5"><House style="display: flex;"/></i>
            <span style="flex: 2.5">系统首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title class="menu-title">
              <i style="flex: 1"><Menu style="display: flex;align-items: center;justify-content: center;"/></i>
              <span style="flex: 5">系统管理</span>
            </template>
            <div style="background-color: #000c17;">
              <el-menu-item index="/admin/system/articles">文章管理</el-menu-item>
              <el-menu-item index="/admin/system/write-blog">撰写博客</el-menu-item>
              <el-menu-item index="/admin/system/edit-blog">修改博客</el-menu-item>
              <el-menu-item index="">成员管理</el-menu-item>
            </div>
          </el-sub-menu>
          <el-menu-item>正在开发中~</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
<!--        右侧-->
        <el-header style="">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">系统首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.path.includes('system')">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.path.includes('system/articles')">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.path.includes('system/write-blog')">撰写博客</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.path.includes('system/edit-blog')">修改博客</el-breadcrumb-item>

            <!-- 可以根据实际路径调整 -->
          </el-breadcrumb>
          <div style="flex: 1; display:flex; align-items: center; justify-content: flex-end">
            <el-dropdown>
              <img src="../assets/vue.svg" alt="">
              <template #dropdown>
                <el-dropdown-menu style="width: 80px; text-align: center" >
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main style="">
          <router-view /> <!-- 用于渲染子路由 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.logo{
  display: flex;
  align-items: center;/*竖直居中*/
  justify-content: center;/*水平居中*/
  height: 60px;
}
.shine {
  width: 100%;
  font-size: 20px;
  text-align: center;
  background: linear-gradient(90deg, #0f0, #00f, #f00, #0f0, #00f, #f00, #0f0);
  background-size: 200%;
  -webkit-background-clip: text; /* 背景被裁剪到文字 */
  color: transparent; /* 设置文字的填充颜色为透明 */
  animation: shine 5s linear infinite; /* 设置动画 */
}
@keyframes shine { /* 创建动画 */
  0% {
    background-position: 0 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.el-menu--inline .el-menu-item{
  background-color: #000c17;
}
.el-menu-item:hover, .el-sub-menu__title:hover span, .el-sub-menu__title:hover i{
  color: white;
}
.el-menu-item.is-active {
  background-color: #1890ff;
  border-radius: 5px;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  margin: 4px;
}
.el-sub-menu__title {
  height: 40px;
  line-height: 40px;
}
.el-aside {
  box-shadow: 2px 0 6px rgba(0,21,41,.35);/*左侧导航栏阴影*/
}
.el-header {
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  border-radius: 5px;
  display: flex;
  align-items: center;
}
</style>