<template>
  <div>商品详情页面+{{id}}</div>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    }
  },
  onLoad(param) {
    this.id = param.id;
  }
};
</script>

<style lang="less" scoped>
</style>
