import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {createExam, fetchCourseList, fetchQuestionList, tagsList, searchQuestions, searchCourse} from "../../api";
import User from "../../store/user";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function EditExam() {
  const states = useRef({
    quesCheckBoxs: new Set(),
    examQuesCheckBoxs: new Set(),
    examQuesToBeDelete: new Set(),
  });
  const [questionCheckState, setQuestionCheckState] = useState({});
  const [sortByQuestionNo, setSortByQuestionNo] = useState('asc'); // 初始排序为升序
  const [selectedUsage, setSelectedUsage] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [originQuestionList, setOriginQuestionList] = useState([]);
  const [createTime, setCreateTime] = useState('');
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questionTagss, setQuestionTagss] = useState([]);
  const [examTagss, setExamTagss] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    const currDate = dayjs(new Date());
    const formattedDate = currDate.format('DD/MMM/YYYY').toLowerCase();
    setCreateTime(formattedDate);

    fetchData();
  }, []);

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
      let selectBody = document.createElement('select');
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
      inputBoxText.id = i+'-marks';
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

  // 更改question list复选框的选中状态
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
    const createDate = examDateBody.value;

    let rightTableBody = document.getElementById('exam-ques-list');
    const quesLen = rightTableBody.children.length;
    let quesList = [];
    let orderDuplicateCheckSet = new Set();
    let orderHasDuplicate = false;
    for (let i=0;i<quesLen;i++) {
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
    const questions = JSON.stringify(quesList);
    const status = "Active";
    const divisionNo = User.userInfo.division_id;
    if (!divisionNo) {
      alert('user is not login, please login');
      return;
    }

    const res = await createExam({
      divisionNo, courseNo, examNo, createBy, createDate, tags, status, questions,
    });
    if(res.data.isSuccess){
      navigate("/exam/view");
    }
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
        <h1>Create this Exam</h1>
        <div className="create-exam-content">
          <div className="top-section">
            <div className="top-section-item">
              <label>Course No. :</label>
              <select id="create-exam-course-no">
                {courseList.map((course) => (
                    <option value={course.number}>{course.number}</option>
                ))}
              </select>
            </div>
            <div className="top-section-item">
              <label>Tags :</label>
              <select id="create-exam-tags">
                {examTagss.map((tag) => (
                    <option value={tag.tags}>{tag.tags}</option>
                ))}
              </select>
            </div>
            <div className="top-section-item">
              <label>Exam No. :</label>
              <input type="text" id="create-exam-no" />
            </div>
            <div className="top-section-item">
              <label>Create by :</label>
              <input id="create-exam-user" type="text" value={User.userInfo.first_name+User.userInfo.last_name} />
            </div>
            <div className="top-section-item">
              <label>Create date :</label>
              <input id="create-exam-date" type="text" value={createTime} />
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

