<template>
  <div id="good">
    <el-container id="menu">
      <el-header>
        <div class="searbox_wrap">
          <div class="searFormRow1" style="float: left">
            <el-form ref="menuForm" :model="form" label-width="90px">
              <el-form-item label="商品名称" class="date">
                <el-input
                  clearable
                  width:150
                  style="height: 30px"
                  v-model="form.orderName"
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
            <el-button size="mini" type="success" @click="addDish"
              >新增</el-button
            >
            <el-button size="mini" type="success" @click="getMenuList"
              >查询</el-button
            >
            <el-button size="mini" type="success">删除</el-button>
          </div>
        </div>
      </el-header>
      <el-table
        :height="tableHeight"
        stripe
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (pageNum - 1) * pageSize }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNumber" label="商品编号"> </el-table-column>
        <el-table-column prop="orderName" label="商品名称"> </el-table-column>
        <el-table-column prop="price" label="商品价格"> </el-table-column>
        <el-table-column prop="type" label="商品类别"> </el-table-column>
        <el-table-column prop="message" label="商品信息"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="imageUrl" label="图片地址">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
            <el-button type="text" size="mini" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              style="float: right; margin-right: 50px"
              size="mini"
              type="text"
              @click="yulan(scope.row)"
              >预览</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-footer style="height: 20px">
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[15, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改 -->
    <el-dialog
      custom-class="yu"
      title="修改页面"
      :visible.sync="editDialog"
      width="40%"
    >
      <el-form :model="editForm" :rules="editRules" ref="editMenuRef">
        <el-form-item
          label="商品名称"
          prop="orderName"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editForm.orderName" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品价格"
          prop="price"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editForm.price" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品类别"
          prop="type"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editForm.type" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品信息"
          prop="message"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editForm.message" autocomplete="off"></el-input
        ></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelEdit">取 消</el-button>
        <el-button size="mini" type="primary" @click="sureEdit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      custom-class="yu"
      title="新增页面"
      :visible.sync="addDialog"
      width="40%"
    >
      <el-form :model="addForm" :rules="addRules" ref="addMenuRef">
        <el-form-item
          label="商品名称"
          prop="orderName"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.orderName" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品价格"
          prop="price"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.price" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品类别"
          prop="type"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.type" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item
          label="商品信息"
          prop="message"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.message" autocomplete="off"></el-input
        ></el-form-item>
        <el-form-item>
          <el-upload
            name="upload"
            action="http://127.0.0.1:3005/upload"
            class="avatar-uploader"
            :show-file-list="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headerObj"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelAdd">取 消</el-button>
        <el-button size="mini" type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      custom-class="yu"
      title="图片预览"
      :visible.sync="yulanDialog"
      width="20%"
    >
      <img :src="yulanImg" alt="暂无图片" style="width: 100%; height: 100%" />
      <div>{{ "商品名称：" + yu.orderName }}</div>
      <div>{{ "商品价格：￥" + yu.price + "元" }}</div>
      <div>{{ "商品类别：" + yu.type }}</div>
      <div>{{ "商品信息：" + yu.message }}</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yu: "",
      // 图片
      headerObj: {},
      file: "",
      uploadUrl: "http://127.0.0.1:3005/upload",
      yulanDialog: false,
      yulanImg: "", //图片预览
      imageUrl: "", //图片上传
      editForm: {},
      editDialog: false,
      addForm: {
        orderNumber: "",
        orderName: "",
        price: 0,
        type: "",
        message: "",
      },
      addRules: {},
      editRules: {},

      addDialog: false,
      formLabelWidth: "100px",
      tableHeight: 700,
      total: 1,
      pageNum: 1,
      pageSize: 15,
      form: {
        orderName: "",
      },
      tableData: [{ orderName: "lisi" }],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 图片预览
    yulan(val) {
      this.yu = val;
      this.yulanDialog = true;
      this.yulanImg = val.imageUrl;
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = "http://127.0.0.1:3005" + "/image/" + res.fileName;
      this.file = file.raw;
    },
    beforeAvatarUpload(file) {
      this.file = file;
      const isJPG = file.type === "image/jpeg";
      // const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 处理图片预览效果
    handlePreview() {},
    // 处理图片移除效果
    handleRemove(file) {
      console.log(file);
    },
    cancelEdit() {
      this.editDialog = false;
      this.reset();
    },
    edit(val) {
      this.editDialog = true;
      this.editForm = val;
      console.log(this.editForm);
    },
    sureEdit() {
      let param = {
        orderNumber: this.editForm.orderNumber,
        orderName: this.editForm.orderName,
        price: this.editForm.price,
        type: this.editForm.type,
        message: this.editForm.message,
      };
      this.editDialog = false;
      this.$http.post("editOrder", param).then((res) => {
        this.getMenuList();
        this.reset();
      });
    },
    del(val) {
      let param = {
        orderNumber: val.orderNumber,
      };
      this.$http.post("delOrder", param).then((res) => {
        this.getMenuList();
      });
    },
    reset() {
      this.$refs.addMenuRef.resetFields();
      this.$refs.editMenuRef.resetFields();
    },
    cancelAdd() {
      this.addDialog = false;
      this.reset();
    },
    sureAdd() {
      let param = {
        orderName: this.addForm.orderName,
        price: this.addForm.price,
        type: this.addForm.type,
        message: this.addForm.message,
        imageUrl: this.imageUrl,
      };
      this.addDialog = false;
      this.$http.post("addGood", param).then((res) => {
        this.getMenuList();
        this.reset();
      });
    },
    addDish() {
      this.addDialog = true;
    },
    getMenuList() {
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderName: this.form.orderName,
      };
      this.$http.post("goodInfoManage", param).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total[0].total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getMenuList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getMenuList();
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
/deep/.el-dialog__header {
  background-color: gray;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/deep/.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>