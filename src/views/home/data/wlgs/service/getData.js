import api from '~api'
import config from '~api-config'

let wlList = (params) => api.post('/base/logistics/list.action',config.api,params);//物流列表
let addWl= (params) => api.post('/base/logistics/create.action',config.api,params);//新增物流公司
let editWl= (params) => api.post('/base/logistics/edit.action',config.api,params);//编辑物流公司
let updateWl= (params) => api.post('/base/logistics/update.action',config.api,params);//更新物流公司
let deleteWl= (params) => api.post('/base/logistics/delete.action',config.api,params);//删除物流公司
let addrList = (params) => api.post('/base/shippingaddress/insert/list.action',config.api,params);//地址列表(从新增入口进入的)
let editAddrList = (params) => api.post('/base/shippingaddress/list.action',config.api,params);//从编辑入口进入的地址列表
let addAddr = (params) => api.post('/base/shippingaddress/create.action',config.api,params);//新增地址
let deleteAddr = (params) => api.post('/base/shippingaddress/delete.action',config.api,params);//删除地址
let editAddr = (params) => api.post('/base/shippingaddress/edit.action',config.api,params);//点击修改地址
let updateAddr = (params) => api.post('/base/shippingaddress/update.action',config.api,params);//保存修改地址

export default {
    wlList,
    addWl,
    editWl,
    updateWl,
    deleteWl,
    addrList,
    editAddrList,
    addAddr,
    deleteAddr,
    editAddr,
    updateAddr
}
