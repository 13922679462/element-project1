<template>
  <div id="home">
   
      <el-container>
          <!-- 头部 -->
  <el-header>
      <div>
          <img src="../assets/logo.png" alt="">
      <span>电商后台管理系统</span>
      </div>
      
         <el-button type="info" @click="logout">退出</el-button>
  </el-header>

  <el-container>
      <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px':'200px'">
        <!-- 侧边菜单区域 -->
         <!-- 折叠 -->
         <div class="toggle-button" @click="toggleButton">|||</div>
        <el-menu :default-active="$route.path" router unique-opened background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
            
           <el-submenu :index="item.data.id+''" v-for="item in menuList" :key="item.id">
           <!-- 一级菜单模板区域 -->
           <template slot="title">
               <i class="el-icon-location"></i>
               <span>{{item.data.authName}}</span>
           </template> 
           <el-menu-item :index='"/"+subitem.path' v-for="subitem in item.data.children" :key="subitem.id">
               <template slot="title">
               <i class="el-icon-location"></i>
               <span>{{subitem.authName}}</span>
           </template> 
           </el-menu-item>
           </el-submenu>
        </el-menu   >
    
    </el-aside>
    <!-- 主体部分s -->
    <el-main>
        <router-view></router-view>

        <div id="dv1">111</div>
        <!-- Main
        <p v-for="item in menuList" :key="item.id">{{item.data.authName}}
         {{item.data.id}}
          <span v-for="subitem in item.data.children" :key="subitem.id">{{subitem.authName}}</span>
        </p> -->
    </el-main>
  </el-container>
</el-container>
  </div> 
</template>

<script>
// import "./home.less"

export default {
    created(){
        this.getMenuList()
    },
    data(){
        return{
         menuList:[],
         isCollapse:false,
        }
    },
    methods:{
        logout(){
            //清除token
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        getMenuList(){
            //获取数据
            this.$axios.get('./static/data2.json').then(({data})=>{
              console.log(data.meta.status)
              if(data.meta.status !==200) return this.$message.error(data.meta.status)
              this.menuList=data.list
            console.log(data.list)
            })
        },
        toggleButton(){
           

    //  this.isCollapse=(this.isCollapse==this.isCollapse ? !this.isCollapse :this.isCollapse )
    this.isCollapse =!this.isCollapse
         console.log(this.isCollapse)
        }
        

    },
    fn(){
          this.$refs.numbox.change()
    }
   

}
</script>

<style  scoped>
#home{height:100%}
.el-container{
    height: 100%;
}
.el-header{
    background-color:#373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}
.el-header div{
    display: flex;
    align-items: center;
    padding-left:0;
}
.el-header div span{
    margin-left:10px
}
.el-header img{
    width: 50px;
    height: 50px;
}
.el-aside{
background-color:#333744;
height: 100%;
}
.el-main{
    background-color: #fff;
}
.el-menu{
    border-right: none;
}
.toggle-button{
    color:white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>