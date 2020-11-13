<template>
  <div id="good">
    <el-container id="menu">
      <el-header>
        <div class="searbox_wrap">
          <el-form ref="infoRef" :model="info" label-width="90px">
            <el-form-item label="用户名" class="date" prop="userName">
              <el-input
                clearable
                width:150
                style="height: 30px"
                v-model="info.userName"
              ></el-input>
            </el-form-item>
            <el-form-item label="原始密码" class="date" prop="oldPassword">
              <el-input
                clearable
                width:150
                style="height: 30px"
                v-model="info.oldPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" class="date" prop="newPassword">
              <el-input
                clearable
                width:150
                style="height: 30px"
                v-model="info.newPassword"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div
          :style="{
            float: 'left',
            marginTop: '2px',
            marginLeft: '50px',
            verticalAlign: 'top',
          }"
        >
          <el-button size="mini" type="success" @click="submit"
            >提 交</el-button
          >
          <el-button size="mini" type="success" @click="reset">重 置</el-button>
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeight: 700,
      info: {
        userName: "",
        oldPassword: "",
        phone: "",
        newPassword: "",
      },
    };
  },
  methods: {
    submit() {
      let param = {
        name: this.info.userName,
        oldPassword: this.info.oldPassword,
        newPassword: this.info.newPassword,
      };
      this.$http.post("infoEdit", param).then((res) => {
        if (res.data == "0") {
          this.$message({
            type: "danger",
            message: "原账号或密码错误",
          });
        } else {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    reset() {
      this.$refs.infoRef.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
#good {
  background-color: white;
}
#good {
  height: 620px;
  padding: 5px;
  background-color: white;
}
#menu {
  height: 610px;
  padding: 10px;
  background-color: white;
}
</style>