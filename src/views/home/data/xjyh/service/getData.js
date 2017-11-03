import api from '~api'
import config from '~api-config'

let xjyhList = (params) => api.post('/base/BankCash/list.action',config.api,params);//现金银行列表
let addXjyh= (params) => api.post('/base/BankCash/create.action',config.api,params);//新增现金银行
let editXjyh= (params) => api.post('/base/BankCash/edit.action',config.api,params);//编辑现金银行
let updateXjyh= (params) => api.post('/base/BankCash/update.action',config.api,params);//更新现金银行
let deleteXjyh= (params) => api.post('/base/BankCash/delete.action',config.api,params);//删除现金银行

export default {
    xjyhList,
    addXjyh,
    editXjyh,
    updateXjyh,
    deleteXjyh
}
