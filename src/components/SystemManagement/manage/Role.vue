<template>
  <div>
    <!-- <h1>角色管理</h1> -->
    <div class="card">
      <el-card>
        <el-row>
          <el-button type="success" round plain @click="addDialogVisible = true"
            >新建角色</el-button
          >
        </el-row>
        <el-table :data="roleList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="角色ID" prop="roleId"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <a
                href="javascript:;"
                class="blue"
                @click="showSetDrawer(scope.row)"
                >设置权限</a
              >
              <a
                href="javascript:;"
                class="green"
                @click="showUpdate(scope.row.roleId, scope.row.roleName)"
                >编辑</a
              >
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-warning"
                iconColor="red"
                title="确定删除吗？"
                @confirm="deleteRole(scope.row.roleId)"
              >
                <a href="javascript:;" class="red" slot="reference">删除</a>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 添加新信息 -->
    <el-dialog
      title=" 新建角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="closeAddDialog"
    >
      <!-- 内容主体区 -->
      <el-form :model="addForm" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 更新信息 -->
    <el-dialog
      title="更新用户api"
      :visible.sync="updateDialogVisible"
      width="50%"
      @close="closeUpdate"
    >
      <!-- 内容主体区 -->
      <el-form :model="updateForm" ref="updateFormRef" label-width="70px">
        <el-form-item label="Id" prop="roleId">
          <el-input v-model="updateForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="updateForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置权限的弹出抽屉 -->
    <el-drawer
      title="设置权限"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <!-- 抽屉内容区 -->

      <el-tabs v-model="activeName">
        <!-- 角色菜单 -->
        <el-tab-pane label="角色菜单" name="first" :lazy="true">
          <div class="tree">
            <el-tree
              :data="routeData"
              node-key="id"
              :default-checked-keys="roleRouteForm.roleRouteList"
              ref="routeTree"
              show-checkbox
              check-strictly
              default-expand-all
              highlight-current
            >
            </el-tree>
          </div>
          <div class="btn">
            <el-button type="success" round plain @click="roleRouteChange"
              >确定</el-button
            >
          </div>
        </el-tab-pane>

        <!-- 角色api -->
        <el-tab-pane label="角色API" name="second" :lazy="true">
          <div class="select">
            <el-select
              v-model="roleapiForm.roleApiList"
              multiple
              clearable
              placeholder="请选择"
            >
              <el-option-group
                v-for="group in apiOptions"
                :key="group.apiGroup"
                :label="group.apiGroup"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.apiId"
                  :label="item.apiName"
                  :value="item.apiId"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class="btn">
            <el-button type="success" round plain @click="roleapiChange"
              >确定</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import {
  getRole,
  addRole,
  updateRole,
  deleteRole,
  getRoleRoute,
  updateRoleRoute,
  getRoleApi,
  updateRoleApi,
} from "@/api/systemManagement";
export default {
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      activeName: "first",
      //*新增角色表单
      addForm: {
        roleName: "",
      },
      //*更新角色表单
      updateForm: {
        roleId: null,
        roleName: "",
      },
      query: {},
      roleList: [],
      drawer: false,
      direction: "rtl",
      routeData: [],
      roleRouteForm: {
        roleId: 0,
        roleRouteList: [],
      },
      roleapiForm: {
        roleId: 0,
        roleApiList: [],
      },
      apiOptions: [],
    };
  },
  created() {
    this.getRoleList();
    this.getRouteOptions();
    this.getapiOptions();
  },
  methods: {
    //*获取角色列表
    async getRoleList() {
      const { data: res } = await getRole({ params: this.query });
      if (res.code !== 200) return this.$message.error("获取角色列表失败~");
      this.$message.success("获取角色列表成功！");
      this.roleList = res.data;
    },
    //*关闭新增信息框
    closeAddDialog() {
      this.$refs.addFormRef.resetFields();
    },
    //*展示更新信息框
    showUpdate(id, name) {
      this.updateForm.roleId = id;
      this.updateForm.roleName = name;
      this.updateDialogVisible = true;
    },
    //*关闭更新信息框
    closeUpdate() {
      this.$refs.updateFormRef.resetFields();
    },
    //*添加角色
    async addRole() {
      if (this.addForm.roleName == "")
        return this.$message.error("请填写角色名称~");
      const { data: res } = await addRole({ roleName: this.addForm.roleName });
      if (res.code !== 200) return this.$message.error("添加失败~");
      this.$message.success("添加成功！");
      this.addDialogVisible = false;
    },
    //*删除角色
    async deleteRole(id) {
      const { data: res } = await deleteRole({ roleId: id });
      if (res.code !== 200) return this.$message.error("删除失败~");
      this.$message.success("删除成功！");
      this.getRoleList();
    },
    //*编辑更新角色信息
    async updateRole() {
      const { data: res } = await updateRole(this.updateForm);
      if (res.code !== 200) return this.$message.error("更新失败~");
      this.$message.success("更新成功！");
      this.updateDialogVisible = false;
      this.getRoleList();
    },
    //*展示设置权限抽屉
    showSetDrawer(row) {
      this.drawer = true;
      this.roleapiForm.roleId = row.roleId;
      this.roleapiForm.roleApiList = row.roleApiAuthorityList;
      this.roleRouteForm.roleId = row.roleId;
      this.roleRouteForm.roleRouteList = row.roleRouteAuthorityList;
    },
    //*手动关闭抽屉弹出提示
    handleClose(done) {
      this.$confirm("确认要关闭吗 Σ(っ °Д °;)っ？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //*得到RouteOptions
    getRouteOptions() {
      getRoleRoute({})
        .then((response) => {
          if (response.data.code == 200) {
            const resData = response.data.data;
            // resData.sort(compare("apiGroup"));
            resData.sort(function (obj1, obj2) {
              var apiGroup1 = obj1.parentId;
              var apiGroup2 = obj2.parentId;
              if (apiGroup1 < apiGroup2) {
                return -1;
              }
              if (apiGroup1 > apiGroup2) {
                return 1;
              }
              return 0;
            });
            for (let index = 0; index < resData.length; index++) {
              let target = resData[index];
              if (target.parentId == 0) {
                this.routeData.push({
                  id: target.routeId,
                  label: target.routeName,
                  children: [],
                });
                // map[target.routeId] = true;
              } else {
                //   第一级
                for (let index0 = 0; index0 < this.routeData.length; index0++) {
                  let element = this.routeData[index0];
                  if (element.id == target.parentId) {
                    this.routeData[index0].children.push({
                      id: target.routeId,
                      label: target.routeName,
                      children: [],
                    });
                    break;
                  } else {
                    //   第二级
                    for (
                      let index1 = 0;
                      index1 < this.routeData[index0].children.length;
                      index1++
                    ) {
                      const element = this.routeData[index0].children[index1];
                      if (element.id == target.parentId) {
                        this.routeData[index0].children[index1].children.push({
                          id: target.routeId,
                          label: target.routeName,
                          children: [],
                        });
                        break;
                      }
                    }
                  }
                }
              }
            }
          } else {
          }
        })
        .catch((error) => {});
    },
    //*改变route路由
    roleRouteChange() {
      const roleRouteList = this.$refs.routeTree.getCheckedKeys();
      this.roleRouteForm.roleRouteList = roleRouteList;
      updateRoleRoute(this.roleRouteForm)
        .then((response) => {
          if (response.data.code == 200) {
            this.getRoleList();
            this.$message.success("更改成功");
            this.drawer = false;
          } else {
            this.$message.error("更新失败");
          }
        })
        .catch((error) => {});
    },
    //*获取api
    getapiOptions() {
      getRoleApi()
        .then((response) => {
          if (response.data.code == 200) {
            const resData = response.data.data;
            // resData.sort(compare("apiGroup"));
            resData.sort(function (obj1, obj2) {
              var apiGroup1 = String(obj1.apiGroup).toUpperCase();
              var apiGroup2 = String(obj2.apiGroup).toUpperCase();
              if (apiGroup1 < apiGroup2) {
                return -1;
              }
              if (apiGroup1 > apiGroup2) {
                return 1;
              }
              return 0;
            });
            let tmpGroup = "";
            let tmpIndex = 0;
            for (let index = 0; index < resData.length; index++) {
              const element = resData[index];
              if (element.apiGroup != tmpGroup) {
                this.apiOptions.push({
                  apiGroup: element.apiGroup,
                  options: [],
                });
                tmpGroup = element.apiGroup;
                tmpIndex = this.apiOptions.length - 1;
                this.apiOptions[tmpIndex].options.push({
                  apiId: element.apiId,
                  apiName: element.apiName,
                });
              } else {
                this.apiOptions[tmpIndex].options.push({
                  apiId: element.apiId,
                  apiName: element.apiName,
                });
              }
            }
          } else {
            ElMessage.error({
              message: response.data.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          ElMessage.error({
            message: "连接失败！",
            type: "error",
          });
        });
    },
    //*改变api
    roleapiChange() {
      updateRoleApi(this.roleapiForm)
        .then((response) => {
          if (response.data.code == 200) {
            this.getRoleList();
            this.$message.success("更新成功！");
            this.drawer = false;
          } else {
            this.$message.error("更新失败~");
          }
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.card {
  margin: 5px 15px 15px 7px;
}
a {
  text-decoration: none;
  margin: 0 20px;
  font-size: 15px;
  font-weight: 600;
}
.blue {
  color: #4c81d1;
}
.blue:hover {
  color: #0636d6;
}
.green {
  color: #80b168;
}
.green:hover {
  color: #395a29;
}
.red {
  color: #df8787;
}
.red:hover {
  color: #d83636;
}
.tree {
  border-radius: 15px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);
  margin: 5px 15px 15px 5px;
}
.el-tree {
  border-radius: 15px;
}
.btn {
  height: 40px;
  width: 76px;
  box-shadow: 10px 5px 10px -4px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 15px auto;
}
.select {
  width: 220px;
  border-radius: 5px;
  box-shadow: 10px 5px 10px -4px rgba(0, 0, 0, 0.3);
  margin: auto;
}
</style>