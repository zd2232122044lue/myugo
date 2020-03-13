// 封装一个通用的接口调用模块

// // vue插件用法一
// export default () => {
//     return (Vue) => {
//         Vue.prototype.request = () => {
//             // 这里实现调接口的动作
//             console.log('request'); 
//         }
//     }
// }

// vue插件用法二(官方规范)
export default {
  install: (Vue, options) => {
    Vue.prototype.$request = async ({ path, param, method = 'get' }) => {
      // 显示加载提示
      uni.showLoading({
        title: "正在加载数据..."
        // mask: true
        // 防止频繁加载方案一,接口调用前显示提示框并且显示蒙层，可以防止触摸穿透，
        // 只有上一次数据返回后才隐藏提示框，那么才可以发送下次请求
      })
      // 实现发送请求
      // uni-app对部分小程序原生API进行了封装,可以支持Promise
      const [error, res] = await uni.request({
        // 请求地址
        url: options.baseURL + path,
        // 请求参数
        data: param,
        // 请求方式
        method: method
      })
      // 隐藏加载提示
      uni.hideLoading()
      // 返回异步接口的结果
      return res.data
    }
  }
}