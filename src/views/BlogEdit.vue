<script setup>
import { ref, onMounted, watch, shallowRef, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElContainer, ElHeader, ElButton, ElMain, ElMessage, ElInput, ElForm, ElFormItem } from "element-plus";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import apiClient from "../api/api.js";

const blog = ref({
  title: '',
  content: ''
});
const blogId = ref(''); // 用于存储和输入ID

const route = useRoute();
const router = useRouter();

// 初始化编辑器实例的引用
const editorRef = shallowRef();

// 编辑器的内容
const valueHtml = ref('');

// 工具栏和编辑器配置
const toolbarConfig = {};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: "http://localhost:8080/blog/upload/images",
      fieldName: 'file',
      maxNumberOfFiles: 3,
      maxFileSize: 5 * 1024 * 1024,
      allowedFileTypes: ['image/jpeg', 'image/png'],
      customInsert(res, insertFn) {
        if (res.errno === 0) {
          ElMessage.success("上传成功");
          insertFn(res.data.url);
        } else if (res.errno === 1) {
          ElMessage.error("上传失败");
        } else {
          ElMessage.error("未知错误");
        }
      }
    }
  }
};

// 处理编辑器创建
const handleCreated = (editor) => {
  editorRef.value = editor;
};

// 清理编辑器实例
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});

// 根据ID获取博客数据
const fetchBlog = () => {
  apiClient.get(`/blog/get/${blogId.value}`)
      .then(response => {
        blog.value = response.data;
        valueHtml.value = response.data.content; // 设置编辑器内容
      })
      .catch(error => {
        ElMessage.error('Error fetching blog:', error);
      });
};

// 更新博客
const updateBlog = () => {
  apiClient.put(`/blog/update/${blogId.value}`, {
    title: blog.value.title,
    content: valueHtml.value,
    text: editorRef.value.getText()
  })
      .then(() => {
        ElMessage.success('博客更新成功');
        // router.push(`/blog/${blogId.value}`); /*自动跳转*/
      })
      .catch(error => {
        console.error('Error updating blog:', error);
        ElMessage.error('博客更新失败');
      });
};


// 监听编辑器内容变化
watch(valueHtml, (newValue) => {
  // 可以处理内容变化时的逻辑
});
</script>

<template>
      <el-form>
        <el-form-item label="博客ID">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <el-input
                placeholder="请输入文章ID"
                v-model="blogId"
                style="flex-grow: 1; margin-right: 10px"
            ></el-input>
            <el-button type="primary" @click="fetchBlog">加载博客</el-button>
          </div>
        </el-form-item>
        <el-form-item label="文章标题">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <el-input
                prefix-icon="Finished"
                placeholder="请输入文章标题"
                style="flex-grow: 1; margin-right: 10px"
                v-model="blog.title"></el-input>
            <el-button @click="updateBlog">保存</el-button>
          </div>
        </el-form-item>
        <el-form-item>
            <div style="border: 1px solid #ccc">
              <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
              />
              <Editor
                  style="height: 500px; overflow-y: hidden;"
                  v-model="valueHtml"
                  :defaultConfig="editorConfig"
                  @onCreated="handleCreated"
              />
            </div>
        </el-form-item>
      </el-form>
</template>

<style scoped>
</style>
