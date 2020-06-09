<template>
  <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片区域 -->
<el-card>   
<el-row :gutter='20'>
    <el-col :span="13">
      <!-- 搜索和添加用户  -->
  <el-input placeholder="请输入内容"  class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</el-col>
    <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
    </el-col>
</el-row>
<el-table :data="userList" stripe >
  <el-table-column type="index" label="#">

  </el-table-column>
  <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>
    <el-table-column
      prop="job"
      label="岗位"
      width="180">
    </el-table-column>
</el-table>
</el-card>
  </div>
</template>

<script>
export default {
  data(){
    //获取用户列表的参数对象
   return{
     queryInfo:{  
       query:"",
       pagenum:1,
       pagesize:2
     },
     //获取用户数据1
     userList:[],
     
   }

  },
  created(){
    this.getUserList()
  },
  methods:{
    getUserList(){
      this.$axios.get('./static/data3.json',{params:this.queryInfo}).then(({data})=>{
        console.log(data.list[0].name)
        this.userList=data.list;
        
        // if(data.meta.status!==200) return this.$message.error("获取用户列表失败")
      })
    }
  }

}
</script>

<style>
</style>