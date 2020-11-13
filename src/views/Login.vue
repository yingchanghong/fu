<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->

      <!-- 头像区域结束 -->
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input
            clearable
            type="text"
            v-model="loginForm.name"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            clearable
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login" size="mini">登录</el-button>
          <el-button type="info" @click="register" size="mini">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单区域结束 -->
    </div>
    <!-- 注册弹框 -->
    <el-dialog title="注册页面" :visible.sync="registerDialog" width="30%">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            type="password"
            v-model="registerForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRegister" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitRegister" size="mini"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerDialog: false,
      registerForm: {
        name: "",
        password: "",
        checkPassword: "",
        phone: "",
      },
      registerRules: {
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
        //验证用户名合法性
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //验证密码合法性
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      },
      radio: "1",
      //这是登录表单的数据绑定对象，里面是该绑定对象的值
      loginForm: {
        name: "test",
        password: "123456",
      },
      //表单的验证规则对象
      loginFormRules: {
        //验证用户名合法性
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //验证密码合法性
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    resetField() {
      this.$refs.registerFormRef.resetFields();
    },
    closeRegister() {
      this.resetField();
      this.registerDialog = false;
    },
    submitRegister() {
      this.$refs.registerFormRef.validate((valid) => {
        if (!valid) return;
        else {
          let param = {
            name: this.registerForm.name,
            password: this.registerForm.password,
            phone: this.registerForm.phone,
          };
          this.$http.post("register", param).then((res) => {
            this.$message({
              type: "success",
              message: "注册成功",
            });
          });
          this.resetField();
          this.registerDialog = false;
        }
      });
    },
    register() {
      this.registerDialog = true;
    },
    //点击重置按钮 ，重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        else {
          let param = {
            name: this.loginForm.name,
            password: this.loginForm.password,
          };
          this.$http.post("login", param).then((res) => {
            if (res.data.length == 0) {
              this.$message({
                type: "error",
                message: "账号或密码输入错误",
              });
            } else {
              this.$message({
                type: "success",
                message: "登陆成功",
              });
              window.sessionStorage.setItem("user", this.loginForm.name);
              this.$router.push("/home");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  background-color: white;
  width: 450px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  padding: 10px;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translate(-50%, 50%);
  border: 1px solid #eee;
  border-radius: 50%;
  height: 130px;
  width: 130px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.el-form-item {
  margin-bottom: 12px;
}
/deep/.el-dialog__header {
  background-color: #2196f3;
}
</style>
