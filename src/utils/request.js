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
        Vue.prototype.$request = () => {
            console.log("vue实例方法")
        }
    }
}