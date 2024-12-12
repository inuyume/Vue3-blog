<script setup>
import { reactive } from 'vue';
import { ElButton, ElMessage, ElForm, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';
import ValidCode from '../components/ValidCode.vue';
import apiClient from "../api/api.js";

const form = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  email: '',
  code: '',
  sourcecode: '', /* 验证码组件传入的验证码 */
});

const checkData = reactive({
  checkDataOne: false,
  checkDataTwo: false,
  checkDataThree: false,
  checkDataFour: false,
  checkDataFive: false,
});

function getCode(code) {
  form.sourcecode = code;
}

const check = () => {
  let valid = true;

  if (form.username === '') {
    ElMessage.error("请输入用户名");
    valid = false;
  } else {
    checkData.checkDataOne = true;
  }

  if (form.nickname === '') {
    ElMessage.error("请输入昵称");
    valid = false;
  } else {
    checkData.checkDataTwo = true;
  }

  if (form.email === '') {
    ElMessage.error("请输入邮箱地址");
    valid = false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    ElMessage.error("邮箱格式不正确");
    valid = false;
  } else {
    checkData.checkDataThree = true;
  }

  if (form.password === '' || form.confirmPassword === '') {
    ElMessage.error("请输入密码和确认密码");
    valid = false;
  } else if (form.password !== form.confirmPassword) {
    ElMessage.error("两次输入的密码不一致");
    valid = false;
  } else {
    checkData.checkDataFour = true;
  }

  if (form.code === '' || form.code !== form.sourcecode) {
    ElMessage.error("验证码输入错误");
    valid = false;
  } else {
    checkData.checkDataFive = true;
  }

  if (valid && checkData.checkDataOne && checkData.checkDataTwo && checkData.checkDataThree && checkData.checkDataFour && checkData.checkDataFive) {
    apiClient.post("/blog/register", {
      username: form.username,
      nickname: form.nickname,
      password: form.password,
      email: form.email,
    }).then(response => {
      ElMessage.success("注册成功");
      console.log(response);
    }).catch(error => {
      ElMessage.error("注册失败");
      console.log(error);
    });
  }
};
</script>

<template>
  <div style="height: 100vh; overflow: hidden;display: flex; align-items: center;justify-content: center; background-color: #79bbff;">
    <div class="form-side">
      <div class="form-side-one">
        <el-form v-model="form" style="width: 100%">
          <div class="form-title">用户注册</div>
          <el-form-item prop="username">
            <el-input prefix-icon="User" size="large" placeholder="请输入用户名" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input prefix-icon="UserFilled" size="large" placeholder="请输入昵称" v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input prefix-icon="Message" size="large" placeholder="请输入邮箱地址" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" size="large" type="password" placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input prefix-icon="Lock" size="large" type="password" placeholder="请确认密码" v-model="form.confirmPassword" show-password></el-input>
          </el-form-item>
          <el-form-item prop="VerificationCode">
            <div style="display: flex">
              <el-input prefix-icon="Check" size="large" style="flex: 1" placeholder="请输入验证码" v-model="form.code"></el-input>
              <div style="flex: 1">
                <valid-code @update:value="getCode"></valid-code>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="check">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-side {
  display: flex;
  background-color: white;
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.form-side-one {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 50%;
}
.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>