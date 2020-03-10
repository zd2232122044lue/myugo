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
        Vue.prototype.$request = async ({ path,param }) => {
            // 显示加载提示
            uni.showLoading({
                title: "正在加载数据..."
            })
          // 实现发送请求
          // uni-app对部分小程序原生API进行了封装,可以支持Promise
            const [error, res] = await uni.request({
              url: options.baseURL + path,
              data: param
            })  
            // 隐藏加载提示
            uni.hideLoading()
            // 返回异步接口的结果
            return res.data
        }
    }
}