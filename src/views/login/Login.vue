<template>
    <div class="login">
        <div class="login_box">
            <div class="logo"><img src="~assets/img/logo.png"></div>
            <el-form :rules="rules" ref="loginForm" :model="login_form">
                <el-form-item prop="username">
                    <el-input v-model="login_form.username">
                        <i class="iconfont icon-user" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="login_form.password" type="password">
                        <i class="iconfont icon-3702mima" slot="prefix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="login_btns">
                    <el-button type="primary" @click="loginClick">登录</el-button>
                    <el-button type="info" @click="resetClick">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import {reqLogin} from "network/api"
  export default {
    name: "Login",
    data(){
     return {
       //表单失去焦点验证规则
       rules:{
         username: [
           { required: true, message: '必须输入用户名', trigger: 'blur' },
           { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ],
         password: [
           { required: true, message: '必须输入密码', trigger: 'blur' },
           { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ]
       },
       //表单数据绑定
       login_form:{
         username:'admin',
         password:'123456'
       }
     }
    },
    methods:{
      //重置按钮点击
      resetClick(){
        this.$refs.loginForm.resetFields()
      },
      //登录点击事件
      loginClick(){
        this.$refs.loginForm.validate(async valid => {
          if (!valid){
            return
          }
          //发登录请求
          const result = await reqLogin(this.login_form)
          console.log(result)
          const {status,msg} = result.meta
          if (status !== 200){
            //登录失败
            return this.$message.error(msg)
          }
          //登录成功
          // 保存token
          const {token} = result.data
          sessionStorage.setItem("token",token)
          //跳转页面
          this.$router.replace("/home")




        })
      }
    }
  }
</script>

<style scoped lang="less">
.login{
    background-color: #2b4b6b;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: relative;
        .logo{
            width: 130px;
            height: 130px;
            background-color: #fff;
            border-radius: 50%;
            /*border: 1px solid;*/
            box-shadow: 0 0 10px #fff;
            padding: 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }

        }
        .el-form{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            .login_btns{
                text-align: right;
            }
        }
    }
}
</style>
