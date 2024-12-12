<!--index.vue-->
<script setup>
import { ElMenu, ElMenuItem, ElSubMenu, ElMessage} from 'element-plus';
import {onMounted, ref} from "vue";
import axios from "axios";
import {startSakura} from "../components/Sakura.js";
import MouseClickEffect from '../components/MouseClickEffect.vue';
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css'
import apiClient from "../api/api.js";

//默认选中索引
const selectedIndex = ref("1")
//选中菜单触发回调
const selected = (index,indexPath) => {
  console.log("index:",index,"indexPath:",indexPath)
}
//跳转指定url
const urlTo = (url,mouesNumber) =>{
  if(mouesNumber) {
    window.location.href = url;
  }else {
    window.open(url,'_blank')
  }

}
const mouseClick =(event,url) => {
  event.preventDefault();//阻止默认事件
  if (event.button === 0){//左键
    urlTo(url,true)
  }else if (event.button ===1){//中键
    urlTo(url,false)
  }
}
// 获取博客数据
const blogs = ref([]); // 定义 blogs 作为响应式变量
const fetchBlogs = () => {
  apiClient.get('/blog/list') // 替换为实际的 API 路径
      .then(response => {
        // 处理并设置博客数据
        blogs.value = response.data.filter(blog => blog.visible === 1); // 过滤出可见的博客
        // id降序排列
        blogs.value = blogs.value.sort((a, b) => b.id - a.id)
      })
      .catch(error => {
        ElMessage.error('获取博客数据失败', error);
      });
};
//古诗词
const poem = ref('');

  const fetchPoem = () => {
    axios.get('https://v1.jinrishici.com/rensheng.txt')
        .then(response => {
          poem.value = response.data
          console.log(poem.value)
        })
        .catch(error => {
          console.error('诗词请求失败', error)
        })
  }
  const ap = ref(null)
  onMounted(()=> {
  fetchPoem()
  fetchBlogs()
  startSakura()
  ap.value = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    theme: '#F57F17',
    lrcType: 3,
    audio: [{
      name: 'Cycle Of Sorrow',
      artist: 'ダイヤモンドダスト',
      url: 'http://localhost:5173/src/assets/music/Cycle Of Sorrow - ダイヤモンドダスト.mp3',
      cover: 'https://p1.music.126.net/9EHMEiYJ2GF9kEF9mAoh1A==/109951169687120876.jpg?param=130y130',
      lrc: 'http://localhost:5173/src/assets/music/Cycle Of Sorrow - ダイヤモンドダスト.lrc',
    }]
  })
})
</script>

<template>
  <MouseClickEffect>
    <div id="aplayer"></div>
    <div>
      <!--  视频背景-->
      <div class="background_video">
        <video autoplay muted loop id="bg_video">
          <source src="../assets/崩坏3三周年全家福-1080p.mp4" type="video/mp4">
        </video>
        <!-- 中心文本-->
        <div class="center_text">
          <h1>二次元拯救世界</h1>
          <h4>"世の中に人としてまもれなければならないものが3つあります、約束と愛と賞味期限です！"</h4>
        </div>
        <div>
          <div class="banner_wave_1"></div>
          <div class="banner_wave_2"></div>
        </div>
        <!--    导航-->
        <div class="daohang">
          <!--mode="horizontal"水平导航 :default-active="selectedIndex"默认选中-->
          <el-menu mode="horizontal"  :default-active="selectedIndex" @select="selected" class="menu">
            <!-- 左侧 logo -->
            <div  class="logo-item">
              <img src="../assets/logo.ico" alt="Logo" class="logo">
            </div>
            <div>
              <p class="shine">{{poem}}</p>
            </div>
            <!--右侧 导航  -->
            <div class="menu-items">
              <el-menu-item index="1" class="menu-items">主页</el-menu-item>
              <el-sub-menu index="2">
                <template #title>大佬聚集地</template>
                <el-menu-item index="2-1" @mousedown="(event) =>mouseClick(event,'')">
                  <div class="avatar-container">
                    <img src="" class="avatar" alt=""></div>
                  <div class="link-text">name</div>
                </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>tools</template>
                <el-menu-item index="2-4" @mousedown="(event) =>mouseClick(event,'https://gchq.github.io/CyberChef/')">
                  <div class="link-text">CyberChef</div>
                </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>正在施工中~</template>

                <el-menu-item index="4-1">4-1</el-menu-item>
                <el-menu-item index="4-2">4-2</el-menu-item>
              </el-sub-menu>
              <!--            <el-dropdown @command="">&lt;!&ndash;@command绑定的事件 &ndash;&gt;-->
              <!--              <span>个人中心</span>-->
              <!--              <template #dropdown>-->
              <!--                <el-dropdown-menu>-->
              <!--                  <el-dropdown-item>登录</el-dropdown-item>-->
              <!--                  <el-dropdown-item>登出</el-dropdown-item>-->
              <!--                </el-dropdown-menu>-->
              <!--              </template>-->
              <!--            </el-dropdown>-->
            </div>
          </el-menu>
        </div>
      </div>
      <div class="blog">
        <!-- 博客简介 -->
        <div class="blog-container">
          <div class="blog-item" v-for="(blog, index) in blogs" :key="index">
            <h2 class="blog-title">{{ blog.title }}</h2>
            <p class="blog-summary">{{ blog.text }}</p>
            <p class="blog-summary">{{ blog.createTime }}</p>
            <a :href="'http://localhost:5173/#/blog/' + blog.id" class="blog-link" target="_blank">阅读更多</a>
          </div>
        </div>
      </div>
    </div>
  </MouseClickEffect>
</template>

<style scoped>
.background_video{
  margin: 0;
  padding: 0;
  position: relative;/*这使得 .video-background 元素成为定位上下文，使其子元素（如 #bg-video）可以使用绝对定位。*/
  height: 100vh;/*设置 .video-background 元素的高度为视口高度的 100%，确保它覆盖整个屏幕。*/
  overflow: hidden;/*隐藏任何溢出的内容，确保视频不会超出其容器的边界。*/
}
#bg_video{
  position: absolute;/*使 #bg-video 元素绝对定位在 .video-background 容器内。*/
  top: 50%;
  left: 50%;
  /*#bg-video 元素的中心位置定位在 .video-background 容器的中心点。*/
  width: 100%;
  height: 100%;
  /*将 #bg-video 的宽度和高度设置为 .video-background 容器的 100%，确保视频覆盖整个容器。*/
  object-fit: cover;/*确保视频内容按比例缩放和裁剪，以完全覆盖容器区域，而不会改变视频的纵横比。*/
  transform: translate(-50%,-50%);/*将视频向左和向上平移 50%，使视频的中心点与容器的中心点对齐。*/
  z-index: -1;/*将视频放在所有其他内容的后面，使得其他内容能够在视频上显示。*/
}
.center_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #d1edc4;
  z-index: 1;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  border-radius: 1%; /*设置圆形*/
}
.daohang{
  position: relative;/*使导航元素成为定位上下文，并确保其子元素可以相对于导航进行定位。*/
  z-index: 1;/*确保显示在视频元素之上*/
  width: 100%;/*设置容器宽度为100%*/
}
.menu {
  display: flex;
  justify-content: space-between;  /* 左右分布 */
  align-items: center; /* 垂直居中 */
  padding: 0 20px; /* 根据需要调整内边距 */
}
.menu-items {
  display: flex;
  gap: 20px; /* 调整菜单项之间的间距 */
}
.logo{
  margin: auto;
  height: auto;
  width: auto;
}
.avatar-container {
  display: flex;
  align-items: center;
}
.logo-item {
  flex: 0 1 auto; /* 让 logo 项根据内容自适应宽度 */
}
.avatar {
  height: 30px; /* 根据需要调整头像大小 */
  width: 30px;  /* 根据需要调整头像大小 */
  margin-right: 8px; /* 根据需要调整与文本的间距 */
  border-radius: 50%; /*设置圆形*/
}
.link-text {
  color: inherit; /* 继承父元素颜色 */
}
.blog{
  margin-top: -1px;
  background: #79bbff;
}
/* 博客简介容器 */
.blog-container {
  //position: relative;
  //z-index: 2; /* 确保在视频上方 */
  margin:auto;
  max-width: 800px; /* 最大宽度 */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  /* 确保博客简介容器在视频下方 */
  /* margin-top: 0vh; *//* 距离视口顶部的距离，根据需要调整 */
}
/*博客项 */
.blog-item {
  margin-bottom: 20px; /* 底部间距 */
  padding: 15px;
  border: 1px solid #ddd; /* 边框颜色 */
  border-radius: 8px; /* 圆角边框 */
  background-color: #fff; /* 背景颜色 */
}

/* 博客标题 */
.blog-title {
  margin: 0 0 10px 0; /* 顶部间距0，底部间距10px */
  font-size: 24px; /* 字体大小 */
  color: #333; /* 标题颜色 */
}

/* 博客简介 */
.blog-summary {
  margin: 0 0 10px 0; /* 顶部间距0，底部间距10px */
  font-size: 16px; /* 字体大小 */
  color: #666; /* 简介颜色 */
}

/* 阅读更多链接 */
.blog-link {
  font-size: 16px; /* 字体大小 */
  color: #007bff; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
  font-weight: bold; /* 加粗 */
}

.blog-link:hover {
  text-decoration: underline; /* 鼠标悬停时加下划线 */
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
/*  波浪动画  */
.banner_wave_1 {
  height: 65px;
  background: url(https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@5.3/wave/wave1.png) repeat-x;
  position: absolute;
  bottom: 0;
  width: 400%;
  left: -236px;
  z-index: -1;
  opacity: 1;
  transition-property: opacity, bottom;
  transition-duration: 0.4s, 0.4s;
  animation-name: move2;
  animation-duration: 240s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.banner_wave_2 {
  height: 80px;
  background: url(https://cdn.jsdelivr.net/gh/Ukenn2112/UkennWeb@5.3/wave/wave2.png) repeat-x;
  position: absolute;
  bottom: 0;
  width: 400%;
  left: 0;
  z-index: -1;
  opacity: 1;
  transition-property: opacity, bottom;
  transition-duration: 0.4s, 0.4s;
  animation-name: move1;
  animation-duration: 160s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes move1 {
  100% {
    background-position: 100% 0;
  }
}

@keyframes move2 {
  100% {
    background-position: -100% 0;
  }
}

</style>