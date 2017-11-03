import api from '~api'
import config from '~api-config'

let mdTable = (params) => api.post('/base/store/list.action',config.api,params);//门店列表
let addMd= (params) => api.post('/base/store/create.action',config.api,params);//新增门店
let editMd= (params) => api.post('/base/store/edit.action',config.api,params);//修改门店
let updateMd= (params) => api.post('/base/store/update.action',config.api,params);//更新门店(确认修改)
let deleteMd= (params) => api.post('/base/store/delete.action',config.api,params);//删除门店
let sytList= (params) => api.post('/base/cashier/list.action',config.api,params);//收银台列表
let updateSyt= (params) => api.post('/base/cashier/update.action',config.api,params);//收银台修改
let addSyt= (params) => api.post('/base/cashier/create.action',config.api,params);//收银台新增
let deleteSyt= (params) => api.post('/base/cashier/delete.action',config.api,params);//收银台删除
let wldwxz= () => api.post('/base/company/list.action',config.api);//往来单位
let editwldw= (params) => api.post('/base/company/edit.action',config.api,params);//往来单位信息
let ckList= (params) => api.post('/base/depot/list.action',config.api,params);//仓库列表
let addCk= (params) => api.post('/base/depot/create.action',config.api,params);//仓库添加

export default {
    mdTable,
    addMd,
    editMd,
    updateMd,
    deleteMd,
    sytList,
    updateSyt,
    addSyt,
    deleteSyt,
    wldwxz,
    editwldw,
    ckList,
    addCk
}
