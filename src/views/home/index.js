import Vue from 'vue'
import Vuex  from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '~src/assets/less/common.less'
import App from '../home/app.vue'
import router from '../../router'
//import '~src/assets/js/directive/drag.js'
import drag from '~src/assets/js/directive/drag.js'
//import store from './index'
//import '~src/assets/js/common.js'

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.directive('drag',drag)

const store = new Vuex.Store({
    state: {
        isActive:true,
        index:0,
        historyArr:[],
        historyList:[],
        isLogin:false
    },
    getters:{
        getIsLogin:state => {
            return state.isLogin
        }
    },
    mutations:{
        setIsLogin(state,isLogin){
            state.isLogin = isLogin;
        }
    }
})
export default store

/***登录页路由跳转**/
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next()
        }
    } else {
        next()
    }
});
const loggedIn = function() {
    var id = window.localStorage.getItem('userId')
    if (id === null) { // 未登录
        return false
    }
    return true
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})
app.$mount('#app')
