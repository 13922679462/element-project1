<template>
  
  <div id="login">
      <div class="login_container">
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <!-- 表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username"  prefix-icon="el-icon-user"></el-input>
          </el-form-item>
           <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns"> 
            <el-button type="success" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>  
      </div>
     
  </div>
</template>

<script>
import less from "@/main.js"
export default {
  data(){
    return{
      //这是登录属性的绑定  
      loginForm:{
        username:"xxx",
        password:11

      },
    // 表单验证
      loginFormRules:{
        username:[{ required: true, message: '请输入用户名', trigger: 'blur' },],
        password:[{ min: 3, max: 10, message: '长度在 3 到 9 个字符', trigger: 'blur' }]
      }
    }
  },
  methods:{
    //点击重置按钮
    resetLoginForm(){
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login(){
      this.$refs.loginFormRef.validate((value)=>{
        console.log(value)
        if(!value) return
        this.$axios.get("./static/data.json",this.loginForm).then((data)=>{
          // console.log(data)
          if(data.status !==200) return this.$message.error('登录失败')
          this.$message.success('登录成功')
          let token="abcdjp23n44pnvpd44dvg"
         window.sessionStorage.setItem('token',token)
         this.$router.push('/home')
        })
      })
    }
  }

}
</script>

<style Lang="less" scoped>
html,body,#login{
  height: 100%;
}
 .login_container{
    background: #2b4b6b;
    height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color:#fff;
  border-radius:3px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  
}
.avatar_box{
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  top:-25%;
  transform: translate(-50%)
}
.avatar_box img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #eee;
}
.login_form{
  position: absolute;
  bottom: 0    ;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

}
.btns{
  display: flex;
  justify-content: flex-end;  
}
</style>
