import api from '~api'
import config from '~api-config'

let ckTable = (params) => api.post('/base/depot/list.action',config.api,params);//仓库列表
let addCk= (params) => api.post('/base/depot/create.action',config.api,params);//新增仓库
let editCk= (params) => api.post('/base/depot/edit.action',config.api,params);//修改仓库
let updateCk= (params) => api.post('/base/depot/update.action',config.api,params);//更新仓库
let deleteCk= (params) => api.post('/base/depot/delete.action',config.api,params);//删除仓库

export default {
    ckTable,
    addCk,
    editCk,
    updateCk,
    deleteCk
}
