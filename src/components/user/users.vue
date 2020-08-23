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
  <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query" clearable @clear='getUserList'>
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
</el-col>
    <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </el-col>
</el-row>
<el-table :data="userList" stripe >
  <el-table-column type="index" label="#">

  </el-table-column>
  <el-table-column
      prop="name"
      label="姓名"
     >
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
    >
    </el-table-column>
    <el-table-column
      prop="job"
      label="岗位"
     >
    </el-table-column>
     <el-table-column
      prop="state"
      label="状态"
    >
      <!-- 作用域插槽 -->
       <template slot-scope="scope">
         <el-switch
  v-model="scope.row.state" @change="userStateChanged(scope.row)">
</el-switch>
      </template>
    </el-table-column>
     <el-table-column
      prop="jobww"
      label="操作"
      width='200px'
     >
     <template slot-scope="scope">

       <el-button type='primary' icon="el-icon-edit" size='mini' @click="showDialogEdit(scope.row.id)"></el-button>
       <el-button type='danger' icon="el-icon-delete" size='mini' @click="removeUserInfo(scope.row.id)"></el-button>
       <el-tooltip content="Top center" placement="top" :enterable='false'>
<el-button type='warning' icon="el-icon-setting" size='mini'></el-button>
</el-tooltip>

     </template>

    </el-table-column>
</el-table>
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2,4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total">
    </el-pagination>
</el-card>
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="50%"
  @close='addFormClosed'
  >
 <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password" type="password"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="phone">
    <el-input v-model="addForm.phone"></el-input>
  </el-form-item>
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户信息 -->
<el-dialog  
  title="修改用户信息"
  :visible.sync="EditdialogVisible"
  width="50%"
  @close='editFormClosed'
  >
  <el-form :model="editForm"  :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="用户名">
    <el-input v-model="editForm.name" disabled></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop='email'>
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop='phone'>
    <el-input v-model="editForm.phone"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="EditdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    //验证邮箱的规则
     var  checkEmail=(rule,value,cb)=>{
       const regEmail= /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)){
       //合法的邮箱
       return cb()
     }
     cb(new Error('请输入合法的邮箱'))
     }
    //验证手机号码
    var checkPhone=(rule,value,cb)=>{
      const regPhone=/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if(regPhone.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }
    //获取用户列表的参数对象
   return{
     queryInfo:{  
       query:"",
       pagenum:1,
       pagesize:2,
       total:4
     },
     //默认不显示
     dialogVisible:false,
     //获取用户数据1
     userList:[],
    //  表单数据
    addForm:{
   username:"",
   password:"",
   email:"",
   phone:""
    },
    //验证添加用户规则对象
   addFormrules:{
     username:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
     ],
     password:[
         { required: true, message: '请输入密码', trigger: 'blur' }
     ],
     email:[
        { required: true, message: '请输入邮箱', trigger: 'blur' },
       { validator: checkEmail, trigger: 'blur' }
     ],
     phone:[
        { required: true, message: '请输入手机', trigger: 'blur' },
        {validator:checkPhone,trigger:'blur'}

     ]
     
   },
  editForm:{},
   //修改用户信息规则对象
   editFormRules:{
     email:[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
     ],
     phone:[
       {required:true,message:'请输入手机',trigger:'blur'},
         { validator: checkPhone  , trigger: 'blur' }
     ],
   },
   EditdialogVisible:false,
   //
   
     
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
    },

    
    handleSizeChange(newSize){
      console.log(newSize)
    
      this.queryInfo.pagesize=newSize
        this.getUserList()
    },
    // 触发page
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pagenum=newPage
        this.getUserList()
    },
    //监听switch开关状态的改变
    userStateChanged(userinfo){
          console.log(userinfo)
          this.$axios.put(`users/${userinfo.id}/state/${userinfo.state}`).then((res)=>{
            console.log(res)
          })
          if(res.meta.status !==200){
            userinfo.state=!userinfo.state
            return this.$message.error('更新用户失败')
          }
    },
    // 监听用户对话框的关闭事件
    addFormClosed(){
       this.$refs.addFormRef.resetFields()
    },
    //添加用户
    addUser(){
       console.log(this.addForm)
      this.$refs.addFormRef.validate((valid)=>{
            if(!valid) return
          this.$axios.get('./static/data.json',{params:this.addForm}).then((res)=>{
            console.log(res)
           
              if(res.status!==200){
              this.$message.error('添加失败')
              
          }
        else{
             this.$message.success('添加成功')
        } 
          })
        //关闭对话框
         setTimeout(()=>{
              this.dialogVisible=false
         })
        //重新获取列表数据
             this.getUserList()
        
      })
    },
    //
showDialogEdit(id){
  console.log(id)
        this.EditdialogVisible=true
        this.$axios.get('./static/data3.json').then((res)=>{
          console.log(res.data.list[id])
          this.editForm=res.data.list[id]
        })
}   ,
//重置修改用户的关闭事件
editFormClosed(){
  this.$refs.editFormRef.resetFields()
} ,
//验证修改用户信息
editUserInfo(){
  this.$refs.editFormRef.validate((valid)=>{
    if(!valid) return
    this.$axios.get('./static/data3.json',{email:this.editForm.email,phone:this.editForm.phone}).then((res)=>{
      console.log(res)
      if(res.status!==200){
              this.$message.error('用户信息失败')
              
          }
        else{
             this.$message.success('用户信息成功')
        } 
        this.EditdialogVisible=false;
        this.getUserList()
    })
  })
},
// 删除用户信息
 removeUserInfo(id){
    console.log(id)
    this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('./static/data3.json',{params:{id:id}}).then((res)=>{
            console.log(res)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
 }
  }

}
</script>

<style>
/* .el-table{
  width:600px;
} */
</style>