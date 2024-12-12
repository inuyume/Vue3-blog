<template>
  <div @click="handleClick">
    <slot></slot>
    <span v-for="(popup, index) in popups" :key="index" class="text-popup" :style="popup.style">{{ popup.text }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义文本数组
const texts = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];

// 用于存储当前显示的文本元素
const popups = ref([]);

// 点击处理函数
const handleClick = (event) => {
  const x = event.pageX;
  const y = event.pageY;
  const text = texts[Math.floor(Math.random() * texts.length)];

  const popup = {
    text,
    style: {
      left: `${x}px`,
      top: `${y}px`,
    }
  };

  popups.value.push(popup);

  // 动画结束后移除弹出文字
  setTimeout(() => {
    popups.value.shift();
  }, 1000);
};
</script>

<style scoped>
.text-popup {
  animation: textPopup 1s;
  color: #337ecc;
  user-select: none;
  white-space: nowrap;
  position: absolute;
  z-index: 99;
}
@keyframes textPopup {
  0%, 100% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
  }
}
</style>
