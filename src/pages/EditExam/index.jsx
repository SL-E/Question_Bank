import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {fetchCourseList, fetchQuestionList, getExam, editExam, tagsList, searchQuestions, searchCourse, getExamByIdFromUpdateRecord, editExamRecord} from "../../api";
import {useLocation, useNavigate} from "react-router-dom";
import dayjs from 'dayjs';

function EditExam() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examId = searchParams.get('examId');
  const updateExamRecordId = searchParams.get('updateRecordId');

  const states = useRef({
    quesCheckBoxs: new Set(),
    examQuesCheckBoxs: new Set(),
    examQuesToBeDelete: new Set(),
  });
  const [questionCheckState, setQuestionCheckState] = useState({});
  const [isRecord, setIsRecord] = useState(false);
  const [examRecordId, setExamRecordId] = useState('');
  const [sortByQuestionNo, setSortByQuestionNo] = useState('asc'); // 初始排序为升序
  const [selectedUsage, setSelectedUsage] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [originQuestionList, setOriginQuestionList] = useState([]);
  const [currCourseNo, setCurrCourseNo] = useState('');
  const [currTags, setCurrTags] = useState('');
  const [currExamNo, setCurrExamNo] = useState('');
  const [currCreateBy, setCurrCreateBy] = useState('');
  const [currCreateDate, setCurrCreateDate] = useState('');
  const [currQuesList, setCurrQuesList] = useState([]);
  const [currQuessOrders, setCurrQuessOrders] = useState({});
  const [currQuessMarks, setCurrQuessMarks] = useState({});
  const [currExamQuesNum, setCurrExamQuesNum] = useState(0);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questionTagss, setQuestionTagss] = useState([]);
  const [examTagss, setExamTagss] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!examId && !updateExamRecordId) {
        navigate('/Main');
        return;
      }
      try {
        let examInfo = {};
        if (!updateExamRecordId) {
          examInfo = await getExam({
            params: {
              examId: examId,
            }
          });
        } else {
          setIsRecord(true);
          setExamRecordId(updateExamRecordId);
          examInfo = await getExamByIdFromUpdateRecord({
            params: {
              recordId: updateExamRecordId,
            }
          });
        }
        setCurrCourseNo(examInfo.data?.course_no || '');
        setCurrTags(examInfo.data?.tags || '');
        setCurrExamNo(examInfo.data?.exam_no || '');
        setCurrCreateBy(examInfo.data?.create_by || '');
        const createDateFormat = dayjs(examInfo.data?.create_date).format('DD/MMM/YYYY').toLowerCase()
        setCurrCreateDate(createDateFormat);

        const currExamQuesList = JSON.parse(examInfo.data?.questions);
        let quesCheckStateMap = {};
        for (let ce=0;ce<currExamQuesList.length;ce++) {
          const currQuesInfo = currExamQuesList[ce];
          states.current.quesCheckBoxs.add(currQuesInfo.questionNo);
          states.current.examQuesCheckBoxs.add(currQuesInfo.questionNo);
          quesCheckStateMap[currQuesInfo.questionNo] = true;
        }
        setQuestionCheckState(quesCheckStateMap);
        setCurrQuesList(currExamQuesList);
        if (currExamQuesList.length <= 10) {
          setCurrExamQuesNum(10);
        } else if (currExamQuesList.length <= 15 && currExamQuesList.length > 10) {
          setCurrExamQuesNum(15);
        } else if (currExamQuesList.length <= 20 && currExamQuesList.length > 15) {
          setCurrExamQuesNum(20);
        }
        let currQuessOrderMap = {};
        for (let i = 0;i<currExamQuesList.length;i++) {
          currQuessOrderMap[currExamQuesList[i].questionNo] = currExamQuesList[i].order;
        }
        setCurrQuessOrders(currQuessOrderMap);

        let currQuessMarksMap = {};
        for (let i = 0;i<currExamQuesList.length;i++) {
          currQuessMarksMap[currExamQuesList[i].questionNo] = currExamQuesList[i].marks;
        }
        setCurrQuessMarks(currQuessMarksMap);

        const courseListData = await fetchCourseList();
        setCourseList(courseListData?.data || []);
        if(!selectedCourse){
          setSelectedCourse(courseListData?.data?.[0]);
        }
        const questionListData = await fetchQuestionList({
          params: {
            courseId: selectedCourse?.id ? selectedCourse.id : courseListData?.data?.[0]?.id
          }
        });
        setQuestionList(questionListData?.data || []);
        setOriginQuestionList(questionListData?.data || []);
        getQuestionSelects(questionListData?.data || []);
        const tagsListData = await tagsList();
        setQuestionTagss(tagsListData?.data || []);
        setExamTagss(tagsListData?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCourse]);

  const getQuestionSelects = (questions) => {
    let questionTypeArr = [];
    if (questions.length > 0) {
      for (let i = 0;i< questions.length;i++) {
        questionTypeArr = questionTypeArr.concat(questions[i].types);
      }
    }
    setQuestionTypes(Array.from(new Set(questionTypeArr)));
  }

  const handleSortByQuestionNo = (order) => {
    // 只在不同的排序状态下切换
    if (sortByQuestionNo === order) {
      return;
    }
    setSortByQuestionNo(order);
    let questionListTmp = [...questionList];
    // 在这里实现根据 Question No. 进行排序的逻辑
    questionListTmp.sort(sortQuesHandle('question_number', order));
    setQuestionList(questionListTmp);
  };

  const sortQuesHandle = (field, s) => {
    let rev = 1;
    if (s === 'desc') {
      rev = -1;
    }
    return function(objA, objB) {
      let fieldA = objA[field];
      let fieldB = objB[field];
      if (fieldA < fieldB) {
        return rev * -1;
      } else if (fieldA > fieldB) {
        return rev * 1;
      }
      return 0;
    }
  };

  const handleUsageChange = (event) => {
    setSelectedUsage(event.target.value);
    // 实现根据Usage进行筛选的逻辑
    requestSearchQuestions();
  };

  const handleTagsChange = (event) => {
    setSelectedTags(event.target.value);
    // 实现根据Tags进行筛选的逻辑
    requestSearchQuestions();
  };

  const handleExamTagsChange = (event) => {
    setCurrTags(event.target.value);
  };

  const handleExamCourseNoChange = (event) => {
    setCurrCourseNo(event.target.value);
  };

  const requestSearchQuestions = async () => {
    let quesTypeSelectBody = document.getElementById('create-question-type-select');
    const quesType = quesTypeSelectBody.value;
    let quesTagsSelectBody = document.getElementById('create-question-tags-select');
    const quesTag = quesTagsSelectBody.value;
    let courseNoSelectBody = document.getElementById('create-exam-course-no');
    const courseNo = courseNoSelectBody.value;

    const courseInfo = await searchCourse({
      params: {
        courseNo: courseNo,
      }
    });

    const searchQuesListData = await searchQuestions({
      params: {
        courseId: courseInfo?.data?.[0]?.id,
        questionType: quesType,
        tags: quesTag,
      }
    });
    let quesCheckCopy = {};
    for (let i = 0;i < searchQuesListData.data.length;i++) {
      if (states.current.examQuesCheckBoxs.has(searchQuesListData.data[i].question_number)) {
        quesCheckCopy[searchQuesListData.data[i].question_number] = true;
        continue;
      }
      quesCheckCopy[searchQuesListData.data[i].question_number] = false;
    }
    setQuestionCheckState(quesCheckCopy);
    setQuestionList(searchQuesListData?.data || []);
  }

  // 更改exam question list复选框的选中状态
  const updateExamQuesCheckBoxState = (event, checkBoxId) => {
    const isChecked = event.target.checked;
    if (isChecked && states.current.examQuesToBeDelete.has(checkBoxId) || !isChecked && !states.current.examQuesToBeDelete.has(checkBoxId)) {
      return;
    }
    if (isChecked) {
      states.current.examQuesToBeDelete.add(checkBoxId);
      return;
    }
    states.current.examQuesToBeDelete.delete(checkBoxId);
  };

  const addQuesToExam = () => {
    const tableBody = document.getElementById('exam-ques-list');

    if (!tableBody || states.current.quesCheckBoxs.size === 0) {
      return;
    }

    for (let i of states.current.quesCheckBoxs) {
      if (states.current.examQuesCheckBoxs.has(i)) {
        continue;
      }
      const newRow = document.createElement('tr');
      newRow.setAttribute("id", i);
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      // checkbox.addEventListener('change', function(event) {
      //   updateExamQuesCheckBoxState(event, i);
      // });
      checkbox.addEventListener('change', (event) => updateExamQuesCheckBoxState(event, i));
      let tdBox1 = document.createElement('td');
      tdBox1.appendChild(checkbox);
      let tdBox2 = document.createElement('td');
      let editExamCourseSelectBody = document.getElementById('edit-exam-course-select');
      let selectBody = document.createElement('select')
      selectBody.setAttribute("id", i+"-order-select");
      for (let op = 1; op <= editExamCourseSelectBody.value; op++) {
        let optionBody = document.createElement('option')
        optionBody.value = op;
        optionBody.textContent = op;
        selectBody.appendChild(optionBody);
      }
      tdBox2.appendChild(selectBody);
      let tdBox3 = document.createElement('td');
      tdBox3.textContent = i;
      let tdBox4 = document.createElement('td');
      let inputBoxText = document.createElement('input');
      inputBoxText.setAttribute("id", i+"-marks");
      inputBoxText.type = 'text';
      tdBox4.appendChild(inputBoxText);
      let span = document.createElement('span');
      span.textContent = '%';
      tdBox4.appendChild(span);
      newRow.appendChild(tdBox1);
      newRow.appendChild(tdBox2);
      newRow.appendChild(tdBox3);
      newRow.appendChild(tdBox4);
      tableBody.appendChild(newRow);
      states.current.examQuesCheckBoxs.add(i);
    }
  };

  const removeQuesFromExam = () => {
    const tableBody = document.getElementById('exam-ques-list');
    if (!tableBody || states.current.examQuesToBeDelete.size === 0) {
      return;
    }

    let quesCheckCopy = {};
    for (let i in questionCheckState) {
      quesCheckCopy[i] = questionCheckState[i];
    }
    for (let i of states.current.examQuesToBeDelete) {
      const sonBody = document.getElementById(i);
      tableBody.removeChild(sonBody);
      quesCheckCopy[i] = false;
      states.current.examQuesCheckBoxs.delete(i);
      states.current.quesCheckBoxs.delete(i);
    }
    states.current.examQuesToBeDelete = new Set();
    setQuestionCheckState(quesCheckCopy);
  };

  const updateQuesCheckBoxState = (event, checkBoxId) => {
    const isChecked = event.target.checked;
    let quesCheckCopy = {};
    for (let i in questionCheckState) {
      quesCheckCopy[i] = questionCheckState[i];
    }
    quesCheckCopy[checkBoxId] = isChecked;
    setQuestionCheckState(quesCheckCopy);
    if (isChecked) {
      states.current.quesCheckBoxs.add(checkBoxId);
      return;
    }
    states.current.quesCheckBoxs.delete(checkBoxId);
  };

  const editExamNumSelectChange = () => {
    let selectBody = document.getElementById('edit-exam-course-select');
    const quesNum = parseInt(selectBody.value);
    let tBody = document.getElementById('exam-ques-list');
    let selects = tBody.getElementsByTagName('select');
    for (let i = 0;i < selects.length; i++) {
      let select = selects[i];
      let oldQuesNum = select.children.length;
      if (oldQuesNum == quesNum) {
        continue;
      }
      if (parseInt(select.value) > quesNum) {
        let trBody = select.parentNode.parentNode.id + '-input';
        let inputBody = document.getElementById(trBody);
        inputBody.checked = false;
        tBody.removeChild(document.getElementById(select.parentNode.parentNode.id));
        continue;
      }
      if (oldQuesNum < quesNum) {
        for (let j = oldQuesNum+1; j<=quesNum;j++) {
          let optionBody = document.createElement('option');
          optionBody.value = j;
          optionBody.textContent = j;
          select.appendChild(optionBody);
        }
        continue;
      }
      for (let g = quesNum; g<oldQuesNum;g++) {
        select.removeChild(select.lastElementChild);
      }
    }
  };

  const formatDate = (time) => {
    let timeF = time.replace(/\//g, " ");
    let date = new Date(timeF);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth()返回值从0开始, 所以需要+1
    let day = date.getDate();

    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  };

  const saveExam = async () => {
    let courseSelectBody = document.getElementById('create-exam-course-no');
    const courseNo = courseSelectBody.value;
    let examTagsBody = document.getElementById('create-exam-tags');
    const tags = examTagsBody.value;
    let examNoBody = document.getElementById('create-exam-no');
    const examNo = examNoBody.value;
    let examUserBody = document.getElementById('create-exam-user');
    const createBy = examUserBody.value;
    let examDateBody = document.getElementById('create-exam-date');
    const createDate = formatDate(examDateBody.value);

    let rightTableBody = document.getElementById('exam-ques-list');
    const quesLen = rightTableBody.children.length;
    let quesList = [];
    if (quesLen > 0) {
      let orderDuplicateCheckSet = new Set();
      let orderHasDuplicate = false;
      for (let i = 0;i < quesLen; i++) {
        const id = rightTableBody.children[i].id;
        let markInputBody = document.getElementById(id + '-marks')
        let orderInputBody = document.getElementById(id + '-order-select');
        if (orderDuplicateCheckSet.has(orderInputBody.value)) {
          orderHasDuplicate = true;
          break;
        }
        orderDuplicateCheckSet.add(orderInputBody.value);
        const quesInfo = {
          questionNo: id,
          order: orderInputBody.value,
          marks: markInputBody.value,
        };
        quesList.push(quesInfo);
      }
      if (orderHasDuplicate) {
        alert('question order is not duplicate');
        return;
      }
    }
    const status = "Active";
    const questions = JSON.stringify(quesList);

    let isSuccess = false;
    if (isRecord) {
      const updateRecord = JSON.stringify({
        course_no: courseNo, exam_no: examNo, create_by: createBy,
        create_date: createDate, tags, status, questions});
      const res = await editExamRecord({
        recordId: examRecordId,
        examId,
        updateRecord,
      });
      isSuccess = res.data.isSuccess;
    } else {
      const res = await editExam({
        examId, courseNo, examNo, createBy, createDate, tags, status, questions,
      });
      isSuccess = res.data.isSuccess;
    }

    if(isSuccess){
      navigate("/exam/view");
    }
  };

  const handleEditExamQuesOrderChange = (e, quesNo) => {
    let tmp = {};
    for (let i in currQuessOrders) {
      tmp[i] = currQuessOrders[i];
    }
    tmp[quesNo] = e.target.value;
    setCurrQuessOrders(tmp);
  };

  const handleEditExamQuesMarksChange = (e, quesNo) => {
    let tmp = {};
    for (let i in currQuessMarks) {
      tmp[i] = currQuessMarks[i];
    }
    tmp[quesNo] = e.target.value;
    setCurrQuessMarks(tmp);
  };

  const handleCreateExamQuesViewButton = (quesNo) => {
    navigate('/question/edit?courseNumber='+selectedCourse.number+'&questionNumber='+quesNo);
  };

  const handleBackButton = () => {
    navigate('/exam/view');
  };

  return (
      <div className="create-exam-container">
        <div className="back-button-container">
          <button className="back-button" onClick={handleBackButton}>&#9665;</button>
        </div>
        <h1>Edit this Exam</h1>
        <div className="create-exam-content">
          <div className="top-section">
            <div className="top-section-item">
              <label>Course No. :</label>
              <select id="create-exam-course-no" value={currCourseNo} onChange={handleExamCourseNoChange}>
                {courseList.map((course) => (
                    <option value={course.number}>{course.number}</option>
                ))}
              </select>
            </div>
            <div className="top-section-item">
              <label>Tags :</label>
              <select id="create-exam-tags" value={currTags} onChange={handleExamTagsChange}>
                {examTagss.map((tag) => (
                    <option value={tag.tags}>{tag.tags}</option>
                ))}
              </select>
            </div>
            <div className="top-section-item">
              <label>Exam No. :</label>
              <input id="create-exam-no" type="text" value={currExamNo} onChange={(e) => setCurrExamNo(e.target.value)} />
            </div>
            <div className="top-section-item">
              <label>Create by :</label>
              <input id="create-exam-user" type="text" value={currCreateBy} onChange={(e) => setCurrCreateBy(e.target.value)} />
            </div>
            <div className="top-section-item">
              <label>Create date :</label>
              <input id="create-exam-date" type="text" value={currCreateDate} />
            </div>
          </div>
          <div className="bottom-section">
            <div className="left-section">
              <h2>Questions list</h2>
              <table>
                <thead>
                <tr>
                  <th>Selected </th>
                  <th>
                    Question No.
                    <div className="sort-buttons">
                      <button
                          onClick={() => handleSortByQuestionNo('asc')}
                          className={sortByQuestionNo === 'asc' ? 'active' : ''}
                      >
                        <span className="arrow">▲</span>
                      </button>
                      <button
                          onClick={() => handleSortByQuestionNo('desc')}
                          className={sortByQuestionNo === 'desc' ? 'active' : ''}
                      >
                        <span className="arrow">▼</span>
                      </button>
                    </div>
                  </th>
                  <th>Time estimate</th>
                  <th>
                    Usage
                    <select id="create-question-type-select" value={selectedUsage} onChange={handleUsageChange}>
                      <option value="All">All</option>
                      {questionTypes.map((type) => (
                          <option value={type}>{type}</option>
                      ))}
                    </select>
                  </th>
                  <th>
                    Tags
                    <select id="create-question-tags-select" value={selectedTags} onChange={handleTagsChange}>
                      <option value="All">All</option>
                      {questionTagss.map((tagS) => (
                          <option value={tagS.tags}>{tagS.tags}</option>
                      ))}
                    </select>
                  </th>
                </tr>
                </thead>
                <tbody>
                {questionList.map((question) => (
                    <tr>
                      <td><input id={question.question_number+"-input"} type="checkbox" checked={questionCheckState[question.question_number]} onChange={(event) => updateQuesCheckBoxState(event, question.question_number)} /><button onClick={() => handleCreateExamQuesViewButton(question.question_number)}>View</button></td>
                      <td>{question.question_number}</td>
                      <td>{question.time_estimate}</td>
                      <td>{(question.types || []).join(',')}</td>
                      <td>{question.tags ? JSON.parse(question.tags).join(',') : ''}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className=".middle-buttons">
              <button onClick={addQuesToExam}>&gt;&gt;</button>
              <button onClick={removeQuesFromExam}>&lt;&lt;</button>
            </div>
            <div className="right-section">
              <h2>Exam</h2>
              <table>
                <thead>
                <tr>
                  <th>Selected</th>
                  <th>Order in Exam
                    <select id="edit-exam-course-select" onChange={editExamNumSelectChange}>
                      <option value="10">10 Qs in total</option>
                      <option value="15">15 Qs in total</option>
                      <option value="20">20 Qs in total</option>
                    </select>
                  </th>
                  <th>Question No.</th>
                  <th>Marks</th>
                </tr>
                </thead>
                <tbody id="exam-ques-list">
                {currQuesList.map((currQues) => (
                    <tr id={currQues.questionNo}>
                      <td><input type="checkbox" onChange={(event) => updateExamQuesCheckBoxState(event, currQues.questionNo)} /></td>
                      <td>
                        <select id={currQues.questionNo + '-order-select'} value={currQuessOrders[currQues.questionNo]} onChange={(e) => handleEditExamQuesOrderChange(e, currQues.questionNo)}>
                          {Array.from({length: currExamQuesNum}, (_, index) =>
                              <option value={index+1}>{index+1}</option>
                          )}
                        </select>
                      </td>
                      <td>{currQues.questionNo}</td>
                      <td><input type="text" id={currQues.questionNo + '-marks'} value={currQuessMarks[currQues.questionNo]} onChange={(e) => handleEditExamQuesMarksChange(e, currQues.questionNo)} />%</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bottom-buttons">
          <button className="preview-button">Preview</button>
          <button className="save-button" onClick={saveExam}>Save</button>
        </div>
      </div>
  );
}

export default EditExam;




