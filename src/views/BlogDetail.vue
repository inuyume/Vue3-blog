<script setup>
import {ElContainer, ElHeader, ElMain} from "element-plus";
import {useRoute} from "vue-router";
import {onMounted,ref} from "vue";
import {startSakura} from "../components/Sakura.js";
import apiClient from "../api/api.js";

// 定义 blog 响应式数据
const blog = ref({});
// 获取路由参数中的 ID
const route = useRoute();
// 在组件挂载时获取博客数据
onMounted(() => {
  startSakura()
  const id = route.params.id;
  apiClient.get(`/blog/get/${id}`)
      .then(response => {
        blog.value = response.data; // 将响应数据赋值给 blog
      })
      .catch(error => {
        console.error('Error fetching blog:', error); // 处理错误
      });
});
</script>

<template>
  <el-container>
    <el-main>
      <div v-html="blog.content"></div>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>