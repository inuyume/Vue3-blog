# Vue3 blog

### 主要使用了element ui wangeditor aplayer axios vue-router
### 开发于2024.07
实现了博客主页，博客文章展示，文章撰写，修改，删除，隐藏，音乐播放器，鼠标点击特效，樱花飘落特效<br>
后端使用spring boot3编写，数据库使用PostgreSQL，但是这里只有前端。<br>
如需使用此项目，需要修改 src/api/api.js 的 apiClient方法的 baseURL 字段，和 BlogEdit.vue 中的 editorConfig 方法的server字段，因为这些默认监听在 http://localhost:8080/ , 需要修改 index.vue 中的 文章跳转的\<a>\标签 

index.vue中的\<div class="menu-items">\ 的 \<el-sub-menu index="2">\ 可以用于编写友链





