import api from '~api'
import config from '~api-config'

let addVip = (params) => api.post('/member/create.action',config.apiVip,params);//新增会员
let editVip= (params) => api.post('/member/update/wechat.action',config.apiVip,params);//通过openid修改
let updateVip= (params) => api.post('/member/update.action',config.apiVip,params);//更新
let deleteVip= (params) => api.post('/member/cancel.action',config.apiVip,params);//用户注销
let vipList= (params) => api.post('/member/list.action',config.apiVip,params);//门店用户列表(通过storeId查询)
let allVipList= (params) => api.post('/member/listall.action',config.apiVip,params);//全部用户列表

export default {
    addVip,
    editVip,
    updateVip,
    deleteVip,
    vipList,
    allVipList
}
