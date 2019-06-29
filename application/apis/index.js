import axios from './config' 
class Api {
    get(url, params) {  
        return axios.get(url, { params: params })  
    }
    post(url, params) { 
        return axios.post(url, params) 
    }
    upload(formData) {
        return axios.axiosOur({
            url:'/User/upload',
            method:'post',
            data: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    } 
}
 
const api = new Api() 

export default api