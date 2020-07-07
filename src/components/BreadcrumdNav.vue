<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">{{items[0]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{items[1]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{items[2]}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
  export default {
    name: "BreadcrumdNav",
    props:{
      items:{
        required:true,
        type:Array,
      }
    }
  }
</script>

<style scoped>
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>
