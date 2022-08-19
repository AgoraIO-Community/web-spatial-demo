import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './permission'
//在入口文件，main.js中引入vue-i18n模块，并使用
import VueI18n from 'vue-i18n'
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

Vue.use(VueI18n); //通过插件的形式挂载到Vue上
//根据浏览器语言切换语言
const navigatorLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();

const i18n = new VueI18n({
  //实例化VueI18n对象
  locale: navigatorLanguage == 'en'?'en':"zh", //语言标识
  //this.$i18n.local   通过切换locale的值来实现语言切换
  messages: {
    zh: require("@/lang/zh.js"), // 中文语言
    en: require("@/lang/en.js") // 英文语言
  }
});
if (navigatorLanguage === "zh") {
  Vue.use(ElementUI);
} else {
  Vue.use(ElementUI, { locale });
}
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
