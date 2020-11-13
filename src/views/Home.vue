<template>
  <div style="height: 100%" class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header id="header" ref="header" class="header">
        <div class="header_left">
          <span class="header_name">餐饮点单管理平台</span>
        </div>
        <div
          style="
            height: 30px;
            float: right;
            line-height: 60px;
            margin-right: 100px;
          "
        >
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img
                style="
                  height: 30px;
                  vertical-align: middle;
                  width: 30px;
                  border-radius: 50%;
                "
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1772272762,4220566636&fm=15&gp=0.jpg"
                alt=""
              />
              <span
                style="color: white; vertical-align: middle; margin-left: 5px"
                >{{ name }}</span
              >
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout" @click="logout"
                >退出</el-dropdown-item
              >
              <el-dropdown-item>
                <el-dropdown
                  class="colorBtn"
                  @command="changeType"
                  :placement="'top'"
                >
                  <span class="el-dropdown-link"
                    >换肤<i class="el-icon-arrow-down el-icon--right"></i
                  ></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">默认</el-dropdown-item>
                    <el-dropdown-item command="1">sany红</el-dropdown-item>
                    <el-dropdown-item command="2">淡紫</el-dropdown-item>
                    <el-dropdown-item command="3">浅绿</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button type="text">
            <img
              style="width: 30px; border-radius: 50%"
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1772272762,4220566636&fm=15&gp=0.jpg"
              alt=""
            />
            <span style="display: inline-block">test</span>
            <i class="el-icon-arrow-down"></i>
          </el-button> -->
        </div>
      </el-header>
      <!-- 页面主体区域 -->
    </el-container>
    <aside-menu></aside-menu>
    <!-- 右侧 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import AsideMenu from "./aside.vue";
export default {
  name: "Home",
  components: {
    AsideMenu,
  },
  data() {
    return {
      name: "",
      imageUrl: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  created() {
    this.name = window.sessionStorage.getItem("user");
    console.log(this.name);
  },
  methods: {
    // 登录状态操作
    handleCommand(command) {
      if (command == "logout") {
        this.logout();
      }
    },
    changeType(command) {
      if (command == "0") {
        document.getElementById("header").style.backgroundColor = "#373d41";
      } else if (command == "1") {
        document.getElementById("header").style.backgroundColor = "#f44336";
      } else if (command == "2") {
        document.getElementById("header").style.backgroundColor = "#9c27b0";
      } else if (command == "3") {
        document.getElementById("header").style.backgroundColor = "#4caf50";
      }
    },
    logout() {
      this.$router.push("/");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  div {
    display: flex;
  }
  .userSelect {
    width: 10px;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.logo img {
  width: 100px;
  height: 60px;
}
.header_left {
  height: 100%;
  float: left;
}
.info {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.header_name {
  height: 100%;
  color: white;
  font-size: 20px;
  line-height: 60px;
  margin-left: 15px;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  color: white;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
