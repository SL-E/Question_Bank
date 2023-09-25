import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, memo } from 'react';
import dayjs from 'dayjs';
import { fetchCourseList, fetchQuestionList } from '../../api';
import './index.css';

function QuestionsList() {
  const [courseList, setCourseList] = useState([]); 
  const [questionList, setQuestionList] = useState([]); 
  const [originQuestionList, setOriginQuestionList] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectType, setSelectType] = useState();
  const [selectGrade, setSelectGrade] = useState();
  const [selectStatus, setSelectStatus] = useState();
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCourse]);

  const onEditBtnClick = (questionNumber) => {
    navigate(`/question/edit?courseNumber=${selectedCourse.number}&questionNumber=${questionNumber}`);
  }

  const onClickNewQuestion = () => {
    navigate(`/question/edit?courseNumber=${selectedCourse.number}&courseId=${selectedCourse.id}`);
  }

  const onChangeSelectedCourse = (e) => {
    const item = courseList.find((item) => {
      return Number(item.id) === Number(e.target.value)
    })

    if(item){
      setSelectedCourse(item)
    }
  }

  const onChangeSelectType = (e) => {
    if(e.target.value === "All"){
      setQuestionList(originQuestionList);
      return;
    }
    setSelectType(e.target.value);
    const filterQuestionList = originQuestionList.filter((item) => item.types.includes(e.target.value)) 
    setQuestionList(filterQuestionList || [])
  }

  const onChangeSelectGrade = (e) => {
    if(e.target.value === "All"){
      setQuestionList(originQuestionList);
      return;
    }
    setSelectGrade(e.target.value);
    const filterQuestionList = originQuestionList.filter((item) => Number(item.grade) === Number(e.target.value)) 
    setQuestionList(filterQuestionList || [])
  }

  const onChangeSelectStatus = (e) => {
    if(e.target.value === "All"){
      setQuestionList(originQuestionList);
      return;
    }
    setSelectStatus(e.target.value);
    const filterQuestionList = originQuestionList.filter((item) => item.question_status === e.target.value) 
    setQuestionList(filterQuestionList || [])
  }

  return (
    <div className="questions-list">
      <div className="top-section-CourseNo">
        <div className="top-row">
          <label><h3>Course No.</h3></label>
          <select value={selectedCourse?.id} onChange={onChangeSelectedCourse}>
            {
              courseList.map((courseItem) => {
                return (<option value={courseItem.id} key={courseItem.id}>{courseItem.number}</option>)
              })
            }
          </select>
        </div>
      </div>

      <div className="middle-section-QL">
        <div className="middle-row">
          <div className="left-section-QL">
            <h3>Questions List:</h3>
          </div>
          <div className="right-section-QL">
            <button className="create-question-button" onClick={onClickNewQuestion}>Create a new question</button>
          </div>
        </div>
        <table className="questions-table">
          <thead>
            <tr>
              <th>Edit</th> {/* 新添加的列 */}
              <th>Time</th>
              <th>Question No.</th>
              <th>Status</th>
              <th>Created by</th>
              <th>
                Usage Types
              </th>
              <th>Grade</th>
              <th>Last used</th>
              <th>Comments</th>
            </tr>
            <tr> {/* 新添加的行 */}
              <th></th>
              <th>Date</th>
              <th>Question Name/ID</th>
              <th>
              <div>
                  <select value={selectStatus} onChange={onChangeSelectStatus}>
                    <option value="All">All</option>
                    <option value="Ready">Ready</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </th>
              <th>Author</th>
              <th>
                <div>
                  <select value={selectType} onChange={onChangeSelectType}>
                    <option value="All">All</option>
                    <option value="SingleChoice">SingleChoice</option>
                    <option value="MultiChoice">MultiChoice</option>
                    <option value="True-False">True-False</option>
                  </select>
                </div>
              </th>
              <th>
              <div>
                  <select value={selectGrade} onChange={onChangeSelectGrade}>
                   <option value="All">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </th>
              <th>Archive Date</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {/* 渲染问题列表的每一行 */}
            {questionList.map((question) => (
              <tr key={question.question_id}>
                <td>
                  <button className="edit-Q" onClick={() => onEditBtnClick(question.question_number)}>Edit</button>
                </td>
                <td>{dayjs(question.create_time).format('DD/MMM/YYYY').toLowerCase()}</td>
                <td>{question.question_number}</td>
                <td>{question.question_status}</td>
                <td>{question.author}</td>
                <td>{(question.types || []).join(',')}</td>
                <td>{question.grade}</td>
                <td>{dayjs(question.modified_time).format('DD/MMM/YYYY').toLowerCase()}</td>
                <td>{question.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bottom-section">
        <div className="pagination">
          {/* 在这里添加分页链接 */}
        </div>
      </div>
    </div>
  );
}

export default memo(QuestionsList);
