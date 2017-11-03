import api from '~api'
import config from '~api-config'

let wldwTable = (params) => api.post('/base/company/list.action',config.api,params);//表格查询
let addWldw = (params) => api.post('/base/company/create.action',config.api,params);//新增往来单位
let editWldw = (params) => api.post('/base/company/edit.action',config.api,params);//编辑往来单位
let updateWldw = (params) => api.post('/base/company/update.action',config.api,params);//更新往来单位
let deleteWldw = (params) => api.post('/base/company/delete.action',config.api,params);//删除往来单位
let qcyfkWldw = (params) => api.post('/base/company/initialCashier/update.action',config.api,params);//修改期初应收应付
let xyxxWldw = (params) => api.post('/base/company/credit/update.action',config.api,params);//修改信用信息
let addrList = (params) => api.post('/base/shippingaddress/insert/list.action',config.api,params);//从新增入口进入的地址列表
let editAddrList = (params) => api.post('/base/shippingaddress/list.action',config.api,params);//从编辑入口进入的地址列表
let addAddr = (params) => api.post('/base/shippingaddress/create.action',config.api,params);//新增地址
let deleteAddr = (params) => api.post('/base/shippingaddress/delete.action',config.api,params);//删除地址
let editAddr = (params) => api.post('/base/shippingaddress/edit.action',config.api,params);//点击修改地址
let updateAddr = (params) => api.post('/base/shippingaddress/update.action',config.api,params);//保存修改地址

export default {
    wldwTable,
    addWldw,
    editWldw,
    updateWldw,
    deleteWldw,
    qcyfkWldw,
    xyxxWldw,
    addrList,
    editAddrList,
    addAddr,
    deleteAddr,
    editAddr,
    updateAddr
}
