import api from '~api'
import config from '~api-config'

let listSp = () => api.get('/product/productSpec/list.action',config.apiSpxx);//表格数据
let createSp = (params) => api.post('/product/productSpec/create.action',config.apiSpxx,params);//新增商品
let editSp = (params) => api.post('/product/productSpec/edit.action',config.apiSpxx,params);//编辑商品
let updateSp = (params) => api.post('/product/productSpec/update.action',config.apiSpxx,params);//更新商品
let deleteSp = (params) => api.post('/product/productSpec/delete.action',config.apiSpxx,params);//删除商品
//let bmSp = (params) => api.post('/base/company/type/list.action',config.api,params);//部门分类
let flSp = (params) => api.post('/product/productCategory/list.action',config.apiSpxx,params);//商品分类
let createFl = (params) => api.post('/product/productCategory/create.action',config.apiSpxx,params);//商品分类新增
let deleteFl = (params) => api.post('/product/productCategory/delete.action',config.apiSpxx,params);//商品分类删除
let updateFl = (params) => api.post('/product/productCategory/update.action',config.apiSpxx,params);//商品分类编辑

export default {
    listSp,
    createSp,
    editSp,
    updateSp,
    deleteSp,
    //bmSp
    flSp,
    createFl,
    deleteFl,
    updateFl
}
