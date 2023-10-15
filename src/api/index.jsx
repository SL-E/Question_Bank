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

async function examList(options){
    return instance.get('/examList', options)
}

async function createExam(options){
    return instance.post('/createExam', options)
}

async function editExam(options){
    return instance.post('/editExam', options)
}

async function fetchDivisionList(options){
    return instance.get('/divisionList', options)
}

async function getExam(options){
    return instance.get('/exam', options)
}

async function searchExam(options) {
    return instance.get('/searchExam', options)
}

async function tagsList(options) {
    return instance.get('/tagsList', options)
}

async function searchQuestions(options) {
    return instance.get('/searchQuestions', options)
}

async function searchCourse(options) {
    return instance.get('/searchCourse', options);
}

async function examAllNo(options) {
    return instance.get("/examAllNo", options);
}

async function examByNo(options) {
    return instance.get("/examByNo", options);
}

async function getExamChangeRecord(options) {
    return instance.get("/getExamChangeRecord", options);
}

async function getExamChangeRecordById(options) {
    return instance.get('/getExamChangeRecordById', options)
}

async function updateOriginExam(options) {
    return instance.post('/updateOriginExam', options);
}

async function getQuestionByNo(options) {
    return instance.get('/getQuestionByNo', options);
}

async function getExamByIdFromUpdateRecord(options) {
    return instance.get('/getExamByIdFromUpdateRecord', options);
};

async function editExamRecord(options) {
    return instance.post('/editExamRecord', options);
}

async function courseListByDivision(options) {
    return instance.get("/courseListByDivision", options);
}

async function fetchUniversitiesList(options) {
    return instance.get('/universitiesList', options);
}

async function divisionListByUniversities(options) {
    return instance.get('/divisionListByUniversities', options);
}

async function searchCourseByData(options) {
    return instance.get('/searchCourseByData', options);
}

async function searchTeacherByData(options) {
    return instance.get('/searchTeacherByData', options);
}

async function createCourse(options) {
    return instance.post('/createCourse', options);
}

async function deleteCourse(options) {
    return instance.post('/deleteCourse', options);
}

async function editCourse(options) {
    return instance.post('/editCourse', options);
}

async function searchCourseById(options) {
    return instance.get('/searchCourseById', options);
}

async function getUniversitiesByDivision(options) {
    return instance.get('/getUniversitiesByDivision', options);
}

async function searchTeacherByName(options) {
    return instance.get('/searchTeacherByName', options);
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
    uploadImage,
    examList,
    createExam,
    fetchDivisionList,
    getExam,
    editExam,
    searchExam,
    tagsList,
    searchQuestions,
    searchCourse,
    examAllNo,
    examByNo,
    getExamChangeRecord,
    getExamChangeRecordById,
    updateOriginExam,
    getQuestionByNo,
    getExamByIdFromUpdateRecord,
    editExamRecord,
    courseListByDivision,
    fetchUniversitiesList,
    divisionListByUniversities,
    searchCourseByData,
    searchTeacherByData,
    createCourse,
    deleteCourse,
    editCourse,
    searchCourseById,
    getUniversitiesByDivision,
    searchTeacherByName,
}