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

async function fetchCourseList(options){
    return instance.get('/courseList', options)
}

async function fetchQuestionList(options){
    return instance.get('/questionList', options)
 }

 async function editQuestion(options){
    return instance.post('/editQuestion', options)
 }

 async function createQuestion(options){
    return instance.post('/createQuestion', options)
 }

 async function deleteQuestion(options){
    return instance.post('/deleteQuestion', options)
 }

 async function uploadImage(options){
    return instance.post('/uploadImage', options)
 }

export {
    checkIsLogin,
    userLogin,
    userLoginout,
    fetchCourseList,
    fetchQuestionList,
    editQuestion,
    createQuestion,
    deleteQuestion,
    uploadImage
}