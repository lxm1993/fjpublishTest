import Vue from 'vue'
import Router from 'vue-router'
/*登录*/
//import login from '../views/home/login/app.vue'
const login = '../views/home/login/app.vue'
/*导航*/
//import daohang from '../views/home/index/main.vue'
const daohang = '../views/home/index/main.vue'
/*商品*/
// import goodsDetail from '../views/home/goods/goodsDetail/app.vue'
// import suk from '../views/home/goods/suk/app.vue'
// import goodstc from '../views/home/goods/goodstc/app.vue'
const goodsDetail = '../views/home/goods/goodsDetail/app.vue'
const suk = '../views/home/goods/suk/app.vue'
const goodstc = '../views/home/goods/goodstc/app.vue'

/*资料*/
// import wldw from '../views/home/data/wldw/app.vue'
// import mdgl from '../views/home/data/mdgl/app.vue'
// import ckgl from '../views/home/data/ckgl/app.vue'
// import fyzc from '../views/home/data/fyzc/app.vue'
// import xjyh from '../views/home/data/xjyh/app.vue'
// import qtsr from '../views/home/data/qtsr/app.vue'
// import wlgs from '../views/home/data/wlgs/app.vue'
const wldw = '../views/home/data/wldw/app.vue'
const mdgl = '../views/home/data/mdgl/app.vue'
const ckgl = '../views/home/data/ckgl/app.vue'
const fyzc = '../views/home/data/fyzc/app.vue'
const xjyh = '../views/home/data/xjyh/app.vue'
const qtsr = '../views/home/data/qtsr/app.vue'
const wlgs = '../views/home/data/wlgs/app.vue'
/*店面管理*/
// import repair from '../views/home/manage/repair/app.vue'
// import vipManage from '../views/home/manage/vipManage/app.vue'
const repair = '../views/home/manage/repair/app.vue'
const vipManage = '../views/home/manage/vipManage/app.vue'
/*进货*/
// import inv from '../views/home/purchase/purchaseInv/app.vue'
// import list from '../views/home/purchase/purchaseList/app.vue'
const inv = '../views/home/purchase/purchaseInv/app.vue'
const list = '../views/home/purchase/purchaseList/app.vue'
/*销售*/
// import rtl from '../views/home/retail/retailList/app.vue'
// import rtrun from '../views/home/retail/return/app.vue'
// import excg from '../views/home/retail/exChange/app.vue'
// import prc from '../views/home/retail/priceManage/app.vue'
const rtl = '../views/home/retail/retailList/app.vue'
const rtrun = '../views/home/retail/return/app.vue'
const excg = '../views/home/retail/exChange/app.vue'
const prc = '../views/home/retail/priceManage/app.vue'
/*库存*/
// import ware from '../views/home/stock/warehouse/app.vue'
// import tory from '../views/home/stock/inventory/app.vue'
// import che from '../views/home/stock/check/app.vue'
const ware = '../views/home/stock/warehouse/app.vue'
const tory = '../views/home/stock/inventory/app.vue'
const che = '../views/home/stock/check/app.vue'

/*记账科目明细账*/
//import mxz from '../views/home/mxz/app.vue'
const mxz = '../views/home/mxz/app.vue'

/*系统配置*/
//import perm from '../views/home/system/perm/app.vue'
const perm = '../views/home/system/perm/app.vue'

Vue.use(Router)

export default new Router({
  //  mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: function(resolve) {
                require(['../views/home/index/main.vue'], resolve);
            },
            meta:{requiresAuth:true}
        },
        {
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: function(resolve) {
                require(['../views/home/goods/goodsDetail/app.vue'], resolve);
            }
        },
        {
            path: '/suk',
            name: 'suk',
            component: function(resolve) {
                require(['../views/home/goods/suk/app.vue'], resolve);
            }
        },
        {
            path: '/goodstc',
            name: 'goodstc',
            component: function(resolve) {
                require(['../views/home/goods/goodstc/app.vue'], resolve);
            }
        },
        {
            path: '/wldw',
            name: 'wldw',
            component: function(resolve) {
                require(['../views/home/data/wldw/app.vue'], resolve);
            }
        },
        {
            path: '/mdgl',
            name: 'mdgl',
            component: function(resolve) {
                require(['../views/home/data/mdgl/app.vue'], resolve);
            }
        },
        {
            path: '/ckgl',
            name: 'ckgl',
            component: function(resolve) {
                require(['../views/home/data/ckgl/app.vue'], resolve);
            }
        },
        {
            path: '/fyzc',
            name: 'fyzc',
            component: function(resolve) {
                require(['../views/home/data/fyzc/app.vue'], resolve);
            }
        },
        {
            path: '/xjyh',
            name: 'xjyh',
            component: function(resolve) {
                require(['../views/home/data/xjyh/app.vue'], resolve);
            }
        },
        {
            path: '/qtsr',
            name: 'qtsr',
            component: function(resolve) {
                require(['../views/home/data/qtsr/app.vue'], resolve);
            }
        },
        {
            path: '/wlgs',
            name: 'wlgs',
            component: function(resolve) {
                require(['../views/home/data/wlgs/app.vue'], resolve);
            }
        }
        ,
        {
            path: '/repair',
            name: 'repair',
            component: function(resolve) {
                require(['../views/home/manage/repair/app.vue'], resolve);
            }
        },
        {
            path: '/vipManage',
            name: 'vipManage',
            component: function(resolve) {
                require(['../views/home/manage/vipManage/app.vue'], resolve);
            }
        },
        {
            path: '/inv',
            name: 'inv',
            component: function(resolve) {
                require(['../views/home/purchase/purchaseInv/app.vue'], resolve);
            }
        },
        {
            path: '/list',
            name: 'list',
            component: function(resolve) {
                require(['../views/home/purchase/purchaseList/app.vue'], resolve);
            }
        },
        {
            path: '/rtl',
            name: 'rtl',
            component: function(resolve) {
                require(['../views/home/retail/retailList/app.vue'], resolve);
            }
        },
        {
            path: '/rtrun',
            name: 'rtrun',
            component: function(resolve) {
                require(['../views/home/retail/return/app.vue'], resolve);
            }
        },
        {
            path: '/excg',
            name: 'excg',
            component: function(resolve) {
                require(['../views/home/retail/exChange/app.vue'], resolve);
            }
        },
        {
            path: '/prc',
            name: 'prc',
            component: function(resolve) {
                require(['../views/home/retail/priceManage/app.vue'], resolve);
            }
        },
        {
            path: '/ware',
            name: 'ware',
            component: function(resolve) {
                require(['../views/home/stock/warehouse/app.vue'], resolve);
            }
        },
        {
            path: '/tory',
            name: 'tory',
            component: function(resolve) {
                require(['../views/home/stock/inventory/app.vue'], resolve);
            }
        },
        {
            path: '/che',
            name: 'che',
            component: function(resolve) {
                require(['../views/home/stock/check/app.vue'], resolve);
            }
        },
        {
            path: '/login',
            name: 'login',
            component: function(resolve) {
                require(['../views/home/login/app.vue'], resolve);
            }
        },
        {
            path: '/mxz',
            name: 'mxz',
            component: function(resolve) {
                require(['../views/home/mxz/app.vue'], resolve);
            }
        },
        {
            path: '/perm',
            name: 'perm',
            component: function(resolve) {
                require(['../views/home/system/perm/app.vue'], resolve);
            }
        }
    ]
})
// Vue.use(Router)
//
// export default new Router({
//     routes: [
//     { path: '/', component: daohang ,meta:{requiresAuth:true}},
//     { path: '/login', component: login },
//     { path: '/goodsDetail', component: goodsDetail },
//     { path: '/suk', component: suk },
//     { path: '/goodstc', component: goodstc },
//     { path: '/wldw', component: wldw },
//     { path: '/mdgl', component: mdgl },
//     { path: '/ckgl', component: ckgl },
//     { path: '/fyzc', component: fyzc },
//     { path: '/xjyh', component: xjyh },
//     { path: '/qtsr', component: qtsr },
//     { path: '/wlgs', component: wlgs },
//     { path: '/repair', component: repair },
//     { path: '/vipManage', component: vipManage },
//     { path: '/inv', component: inv },
//     { path: '/list', component: list },
//     { path: '/rtl', component: rtl },
//     { path: '/rtrun', component: rtrun },
//     { path: '/excg', component: excg },
//     { path: '/prc', component: prc },
//     { path: '/ware', component: ware },
//     { path: '/tory', component: tory },
//     { path: '/che', component: che },
//     { path: '/mxz', component: mxz },
//     { path: '/perm', component: perm }
//
//     ]
// })
