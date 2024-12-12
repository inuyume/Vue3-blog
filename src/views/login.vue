<!--login.vue-->
<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import ValidCode from "../components/ValidCode.vue";
import { ElButton, ElMessage, ElForm, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';
import apiClient from "../api/api.js";

const form = reactive({
  username : '',
  password : '',
  code : '',
  sourcecode : '',/* 验证码组件传入的验证码*/
})
const checkData = reactive({
  checkDataOne: false,
  checkDataTwo: false,
})
function getCode(code){
  form.sourcecode=code
}
const check = () =>{
  if (form.code==="" && checkData.checkDataOne === false && checkData.checkDataTwo === false ){
    ElMessage.error("请输入账号密码")
  }else {
    let valid = true/*检测跟踪表单状态*/
    if (form.code===""){
      ElMessage.error("请输入验证码")
      valid = false;
    }else if (form.code !== form.sourcecode){
      ElMessage.error("验证码输入错误")
      valid = false
    }else {
      checkData.checkDataOne = true;
    }
    if (form.username==="" || form.password==="" ){
      ElMessage.error("请输入账号密码")
      valid = false
    }else {
      checkData.checkDataTwo = true;
    }
    if ( valid && checkData.checkDataOne && checkData.checkDataTwo){
      console.log("yes")
      apiClient.post("/user/login",{
        username : form.username,
        password : form.password
      },{withCredentials : true}).then(response => {/*withCredentials : true 处理跨域请求中的凭证问题*/
        console.log(response)
        const jwtToken = response.data;// 后端返回的JWT作为响应数据
        localStorage.setItem("jwtToken",jwtToken)// 将JWT存储在localStorage中
        ElMessage.success("登录成功");
        router.push("/admin")
      }).catch(error => {
        console.error(error)
        ElMessage.error("登录失败，请检查用户名或密码")
      })
    }
  }
}

const router = useRouter()
const navigateToRegister = () => {
  router.push('/login/register')// 跳转到注册页面
}
</script>

<template>
  <div style="height: 100vh; overflow: hidden;display: flex; align-items: center;justify-content: center; background-color: #79bbff;">
    <div class="form-side">
      <div class="form-side-one">
        <el-form v-model="form" style="width: 100%">
          <div class="form-title">欢迎登陆</div>
          <el-form-item prop="username">
            <el-input prefix-icon="User" size="large" placeholder="请输入用户名" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" size="large" placeholder="请输入密码" v-model="form.password" show-password></el-input>
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
            <el-button type="primary" style="width: 100%" @click="check">登录</el-button>
          </el-form-item>
          <div style="display:flex;">
            <div style="flex: 1">
              还没有账号？请<span style="color: #79bbff;cursor: pointer;" @click="navigateToRegister">注册</span>
            </div>
            <div style="flex: 1;color: #79bbff;cursor: pointer; text-align: right;">忘记密码</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-side{
  display: flex;
  background-color: white;
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.form-side-one{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 50%;
}
.form-title{
  font-size: 20px;
  font-weight: bold;/*加粗*/
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>