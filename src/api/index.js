import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import config from '~api-config'
import {setMessage} from '~utils'

axios.interceptors.request.use(config => {
	NProgress.start();
	config.headers = {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	config.withCredentials = true;
	return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
	NProgress.done()
	if(response){
		if (response.status === 200 || response.status === 304) {
			return response.data
		}
		return {
			success:false,
			code: response.status,
			msg: response.statusText
		}
	}else{
		return {
			code: 0,
			msg: '无法访问服务器'
		}
	}
}

function checkCode(res) {
	if (res.code === 200) {
		res['success'] = true;
	}else {
		res['success'] = false;
		setMessage(res.code, res.msg)
	}
	return res;
}

export default {
	post(url,url2, data) {
		return axios({
			method: 'post',
			url: url2 + url,
			data: qs.stringify(data),
			timeout: config.timeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			withCredentials:true 
		}).then(checkStatus).then(checkCode)
	},
	get(url,url2, params) {
		return axios({
			method: 'get',
			url: url2 + url,
			params,
			timeout: config.timeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(checkStatus).then(checkCode)
	},
    getmap(url, params) {
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}
