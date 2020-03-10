<template>
  <div>列表页面+{{kw}}</div>
</template>

<script>
  export default {
      data(){
          return{
              kw: ''
          }
      },
      onLoad(param){
          this.kw = param.kw
      }
}
</script>

<style lang="less" scoped>
</style>
