<template>
  <div id="good">
    <el-container id="menu">
      <el-header>
        <div class="searbox_wrap">
          <div class="searFormRow1" style="float: left">
            <el-form ref="orderFormRef" :model="orderForm" label-width="90px">
              <el-form-item label="订单号" class="date">
                <el-input
                  clearable
                  width:150
                  style="height: 30px"
                  v-model="orderForm.orderNumber"
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
            <el-button size="mini" type="success" @click="getMenuList"
              >查询</el-button
            >
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
        <el-table-column prop="orderNumber" label="订单号"> </el-table-column>
        <el-table-column prop="userName" label="下单用户"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column prop="money" label="金额"> </el-table-column>
        <el-table-column prop="time" label="下单时间"> </el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delOrder(scope.row)"
              >删除</el-button
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeight: 700,

      total: 1,
      pageNum: 1,
      pageSize: 15,
      orderForm: {
        orderNumber: "",
      },
      tableData: [],
    };
  },

  created() {
    this.getMenuList();
  },
  methods: {
    delOrder(val) {
      let param = {
        orderNumber: val.orderNumber,
      };
      this.$http.post("deleteOrder", param).then((res) => {
        this.getMenuList();
      });
    },
    getMenuList() {
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderNumber: this.orderForm.orderNumber,
      };
      this.$http.post("getOrder", param).then((res) => {
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
</style>