<template>
  <view>
    <button type="primary" open-type="getUserInfo" @getUserInfo="getUserInfo">点击授权</button>
  </view>
</template>

<script>
  export default {
      methods:{
          getUserInfo(e){
              // 1.获取微信的授权信息
              const {
                encryptedData,
                iv,
                rawData,
                signature 
              } = e.detail

              // 2.获取code
              // uni.login({
              //     success: (res) =>{
              //         const {code} = res
              //     }
              // })

              const [error,res] = await uni.login()

              // 3.调用后台接口获取token信息
              const {message} = await this.$request({
                path: 'users/wxlogin',
                param: {
                  encryptedData,
                  iv,
                  rawData,
                  signature,
                  code: res.code 
                }
              })

              // 4.获取token后,进行缓存,然后跳回到上一个页面
              uni.setStorageSync('mytoken',message.token)
              // uni.switchTab({
              //   url: '/pages/cart/index'
              // })
              uni.navigateBack({
                delta: 1
              })
          }
      }
}
</script>

<style lang="less" scoped>
</style>
