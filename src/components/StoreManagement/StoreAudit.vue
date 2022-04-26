<template>
  <div>
      <!-- 顶部面包屑导航区域 -->
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <!-- 列表视图区域 -->
    <div class="card">
      <el-card>
        <el-table :data="shopList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="店铺ID" prop="shopId"></el-table-column>
          <el-table-column label="店铺名称" prop="shopName"></el-table-column>
          <el-table-column label="商品种类" prop="goodsType"></el-table-column>
          <el-table-column label="退款率">
            <template scope="scope">
              {{scope.row.refundRate}}%
            </template>
          </el-table-column>
          <el-table-column label="投诉率">
            <template scope="scope">
              {{scope.row.complainRate}}%
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template scope="scope">
              <el-select
                v-model="scope.row.state"
                placeholder="请选择"
                @change="changeState($event, scope.row)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>


    
    <!-- 底部分页区 -->
    <div class="footer">
      <el-card>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-sizes="[10, 15, 30, 60]"
          :page-size="query.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getShops,putShopId } from "@/api/stores"
export default {
  data(){
    return{
      options: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "停用",
        },
        {
          value: "2",
          label: "注销",
          disabled: true
        },
      ],
      query:{
        page:1,
        rows:10,
        shopId:null
      },
      total:0,
      shopList:[]
    }
  },
  created(){
    this.getShopList()
  },
  methods:{
    async getShopList(){
      const {data:res} = await getShops({params:this.query})
      if(res.code !== 200){
        return this.$message.error('获取店铺列表失败~')
      }
      
      this.$message.success('获取店铺列表成功！')
      this.shopList = res.data.shopList
      this.total = res.data.count
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize;
      this.getShopList();
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getShopList();
    },
    async changeState(e,b){
      const {data:res} = await putShopId({state:e,shopId:b.shopId})
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("修改失败~");
      }

      this.$message.success("修改成功");
      this.getShopList()
    }
  }
}
</script>

<style scoped="scoped">

</style>