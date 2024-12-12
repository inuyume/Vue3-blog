<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted, watch} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {ElButton, ElMessage, ElForm, ElFormItem, ElInput} from "element-plus";
import apiClient from "../api/api.js";

const form = ref({
  title: "",
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
const toolbarConfig = {}
const editorConfig = {MENU_CONF: {}}
editorConfig.placeholder = '请输入内容...'
editorConfig.MENU_CONF['uploadImage'] = {
  server: "http://localhost:8080/blog/upload/images",
  fieldName: 'file',
  maxNumberOfFiles: 3,
  maxFileSize: 5 * 1024 * 1024,
  allowedFileTypes: ['image/jpeg', 'image/png'], // 允许的文件类型
  customInsert(res, insertFn) {
    //
    if (res.errno === 0) {
      ElMessage.success("上传成功")
      insertFn(res.data.url)
    } else if (res.errno === 1) {
      ElMessage.error("上传失败")
    } else {
      ElMessage.error("未知错误")
    }

  }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const mode = 'default'

function hello() {
  console.log(valueHtml)
  console.log(editorRef.value.getText())
}

// 监听 valueHtml 的变化
watch(valueHtml, (newValue) => {
  hello()
})

const upload = () => {
  const htmlContent = valueHtml.value;
  // 使用 editorRef 获取编辑器实例并提取文本内容
  const textContent = editorRef.value.getText();
  // 发送 POST 请求，将 HTML 内容发送到后端
  apiClient.post('http://localhost:8080/blog/save', {
    title: form.value.title,
    content: htmlContent,
    text: textContent
  })
      .then(response => {
        ElMessage.success("保存成功");
      })
      .catch(error => {
        console.error('保存失败:', error);
        ElMessage.error("保存失败");
      });

}
</script>

<template>
  <el-form>
    <el-form-item>
      <div style="display: flex; justify-content: space-between;align-items: center;">
        <el-input prefix-icon="Finished" placeholder="请输入文章标题" style="flex-grow: 1; margin-right: 10px"
                  v-model="form.title"></el-input>
        <el-button style="" @click="upload">保存</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <div style="border: 1px solid #ccc">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
        />
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>