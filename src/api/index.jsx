import axios from 'axios';

let ws = null;

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000, // 超时时间
  });

async function checkIsLogin(options) {
    return instance.post('/isLogin', options)
}

async function userLogin(options){
    return instance.post('/login', options)
}
 
async function userLoginout(options){
   return instance.post('/loginout', options)
}

export {
    checkIsLogin,
    userLogin,
    userLoginout,
}