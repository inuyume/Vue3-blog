<script setup>
import { ElContainer, ElHeader, ElTable, ElTableColumn, ElButton, ElMain, ElMessage } from "element-plus";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from "../api/api.js";

const blogs = ref([]);
const router = useRouter();

onMounted(() => {
  fetchBlogs();
});

const fetchBlogs = () => {
  apiClient().get('/blog/list')
      .then(response => {
        blogs.value = response.data;
      })
      .catch(error => {
        ElMessage.error('Error fetching blogs:', error);
      });
};

const editBlog = (id) => {
  router.push(`/admin/system/edit-blog?id=${id}`);
};

const deleteBlog = (id) => {
  apiClient().delete(`/blog/delete/${id}`)
      .then(() => {
        ElMessage.success('博客删除成功');
        // 更新博客列表
        fetchBlogs();
      })
      .catch(error => {
        ElMessage.error('博客删除失败:', error);
      });
};

const toggleVisibility = (blog) => {
  blog.visible = blog.visible === 1 ? 0 : 1;
  apiClient.put(`/blog/update/${blog.id}`, blog)
      .then(() => {
        ElMessage.success('博客可见性更新成功');
        // 更新博客列表
        fetchBlogs();
      })
      .catch(error => {
        ElMessage.error('博客可见性更新失败:', error);
      });
};
</script>

<template>
  <el-container>
    <el-header>
      <h1>文章管理</h1>
    </el-header>
    <el-main>
      <el-table :data="blogs" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="visible" label="状态">
          <template #default="{ row }">
            <span>{{ row.visible === 1 ? '可见' : '隐藏' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="editBlog(row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteBlog(row.id)" type="text" size="small" style="color: red;">删除</el-button>
            <el-button @click="toggleVisibility(row)" type="text" size="small">
              {{ row.visible === 1 ? '隐藏' : '显示' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
