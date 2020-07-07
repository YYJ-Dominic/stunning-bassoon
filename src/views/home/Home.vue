<template>
    <el-container class="home">
        <el-header>
            <div class="logo">
                <img src="~assets/img/logo.png" alt="">
                <h1>电商后台管理系统</h1>
            </div>

            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container class="home-content">

            <el-aside :width="menuFlge ? '64px' : '200px'">
                <div class="toggle-menu" @click="toggleMenu">| | |</div>
                <el-menu background-color="#333744" text-color="#fff" unique-opened :collapse="menuFlge"
                         :collapse-transition="false"
                         router
                         :default-active="activePath"
                >
                    <el-submenu v-for="item in menuList" :index="item.id + ''" :key="item.id">
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item v-for="citem in item.children" :index="'/'+citem.path" :key="citem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{citem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  import {reqMenu} from "network/api"

  export default {
    name: "Home",
    data() {
      return {
        menuList: [], //导航栏数组
        icons: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao',
        },
        menuFlge: false,
        // activePath:'/users'
      }
    },
    created() {
      this.getMenu()
    },
    methods: {
      //点击切换侧边栏
      toggleMenu() {
        this.menuFlge = !this.menuFlge
      },
      //请求menu
      async getMenu() {
        const result = await reqMenu()
        if (result.meta.status !== 200) return this.$message.error("获取导航栏信息失败")
        this.menuList = result.data

      },
      //退出
      logout() {
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/login")
          sessionStorage.clear()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });
        });


      }
    },
    computed:{
      //激活那一项路由
      activePath(){
        const childs = []
        this.menuList.forEach(item => {
          item.children.forEach(cItem => {
            childs.push("/"+cItem.path)
          })
        })
        const cItem = childs.find(item => {
          return this.$route.path.indexOf(item) >= 0
        })
        return cItem
      }
    }
  }
</script>
<style scoped lang="less">
    .home {
        height: 100%;

        .home-content {
            height: 100% !important;
        }

        .logo {
            width: 300px;
            height: 100%;
            display: flex;
            align-items: center;

            img {
                width: 55px;
                height: 55px;
            }

            h1 {
                color: #fff;
                font-size: 20px;
                margin-left: 10px;
            }
        }

        .toggle-menu {
            background-color: #4a5064;
            color: #fff;
            font-size: 12px;
            text-align: center;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconfont {
        margin-right: 10px;
    }


</style>
