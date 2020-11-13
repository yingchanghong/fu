<template>
  <el-col style="height: 90%" :span="4">
    <div class="aside">
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="/goodInfoManage">
          <i class="el-icon-setting"></i>
          <span slot="title">商品信息管理</span>
        </el-menu-item>
        <el-menu-item index="/orderManage">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/feedback">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">用户反馈管理</span>
        </el-menu-item>
        <el-menu-item index="/changePass">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-col>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.aside {
  height: 100%;
  background-color: #545c64;
}
</style>