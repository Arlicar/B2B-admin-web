<template>
  <div class="Login_container">
    <div class="right">
      <div class="denglu">登录</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
      >
        <!--账号区域-->
        <i class="el-icon-user-solid"></i>
        <el-form-item class="userName" prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="输入邮箱"
          ></el-input>
        </el-form-item>
        <!--密码区域-->
        <i class="el-icon-s-opportunity"></i>
        <el-form-item class="password" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btn1">
          <el-button type="success" round @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="btn2">
          <el-button type="info" round @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        userName: "admin",
        password: "123456",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        userName: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      //				console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        login(this.loginForm)
          .then((response) => {
            if (response.data.code == 200) {
              this.$message.success("登陆成功");
              this.$store.commit("setToken", response.data.data.token);
              this.$store.commit("setUserInfo", response.data.data.userInfo);
              this.$store.commit("setPerms", response.data.data.perms);
              this.$router.push("/Home");
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // const email = this.loginForm.userName;
        // const pwd = this.loginForm.password;
        // console.log(this.loginForm);
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        // if (res.code !== 200) return this.$message.error("登录失败");
      });
    },
  },
};
</script>

<style scoped="scoped">
.Login_container {
  width: 100%;
  height: 100%;
  background-color: #80b168;
  overflow: hidden;
}

.right {
  position: relative;
  margin: 180px auto;
  width: 450px;
  height: 350px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
}

.denglu {
  position: absolute;
  top: 30px;
  width: 100px;
  height: 50px;
  text-align: center;
  font-size: 40px;
  font-family: Adobe Heiti Std;
  text-decoration: none;
  right: 176px;
  color: #67c23a;
  border-bottom: 4px solid #67c23a;
}

.userName {
  position: absolute;
  top: 110px;
  left: 80px;
  width: 300px;
}

.password {
  position: absolute;
  top: 180px;
  left: 80px;
  width: 300px;
}

.btn1 {
  position: absolute;
  top: 280px;
  left: 135px;
}

.btn2 {
  position: absolute;
  top: 280px;
  left: 235px;
}

.el-icon-user-solid {
  position: absolute;
  color: #67c23a;
  font-size: 30px;
  top: 115px;
  left: 40px;
}

.el-icon-s-opportunity {
  position: absolute;
  color: #67c23a;
  font-size: 30px;
  top: 185px;
  left: 40px;
}
</style>