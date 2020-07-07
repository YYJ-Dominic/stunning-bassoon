<template>

    <div>
        <!--    导航-->
        <breadcrumd-nav :items="['首页','权限管理','角色列表']"></breadcrumd-nav>


    </div>


</template>

<script>
    import BreadcrumdNav from "components/BreadcrumdNav";
  export default {
    name: "Roles",
    components:{
      BreadcrumdNav
    }
  }
</script>

<style scoped>

</style>
