import React, { useState, useEffect } from 'react';
import './index.css';
import {examList, fetchDivisionList, searchExam, courseListByDivision} from "../../api";
import dayjs from 'dayjs';
import {useNavigate} from "react-router-dom";

function ExamsList() {
  const navigate = useNavigate();
  const [examData, setExamData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [examNos, setExamNos] = useState([]);
  const [examCreateBys, setExamCreateBys] = useState([]);
  const [examTagss, setExamTagss] = useState([]);
  const [examStatuss, setExamStatuss] = useState([]);
  const [examSelectUsage, setExamSelectUsage] = useState("All");
  const [examCreateByUsage, setExamCreateBySelectUsage] = useState("All");
  const [examTagsUsage, setExamTagsSelectUsage] = useState("All");
  const [examStatusUsage, setExamStatusSelectUsage] = useState("All");
  useEffect(() => {
    const fetchData = async () => {
      const divisionListData = await fetchDivisionList();
      setDivisionList(divisionListData?.data || []);
      const courseListData = await courseListByDivision();
      setCourseList(courseListData?.data || []);
      if(!selectedCourse){
        setSelectedCourse(courseListData?.data?.[0]);
      }
      const examL = await examList({
        params: {
          division_no: "All",
          course_no: "All",
        },
      });
      setExamData(examL?.data || []);
      getExamSelects(examL);
    };
    fetchData();
  }, [selectedCourse]);

  const getExamSelects = (examList) => {
    let examNoArr = [];
    let createBys = new Set();
    let tagss = new Set();
    let statuss = new Set();
    if (examList.data.length !== 0) {
      for (let i = 0;i < examList.data.length;i++) {
        const examInfoTmp = examList.data[i];
        examNoArr.push(examInfoTmp.exam_no);
        createBys.add(examInfoTmp.create_by);
        tagss.add(examInfoTmp.tags);
        statuss.add(examInfoTmp.status);
      }
    }
    setExamNos(examNoArr);
    setExamCreateBys(Array.from(createBys));
    setExamTagss(Array.from(tagss));
    setExamStatuss(Array.from(statuss));
  };

  const updateDivisionHandle = async () => {
    const divisionId = document.getElementById('exam-list-division-select').value;
    // let examListCourseSelectBody = document.getElementById('exam-list-course-select');
    // const courseNo = examListCourseSelectBody.value;

    const courseListData = await courseListByDivision({
      params: {
        divisionId: divisionId,
      },
    });
    setCourseList(courseListData?.data || []);
    requestSearchExam(courseListData?.data || []);
    // setExamData(examLi?.data || []);
    // getExamSelects(examLi);
  };

  const updateCourseHandle = async () => {
    requestSearchExam();
    // let examListDivisionSelectBody = document.getElementById('exam-list-division-select');
    // const divisionId = examListDivisionSelectBody.value;
    // let examListCourseSelectBody = document.getElementById('exam-list-course-select');
    // const courseNo = examListCourseSelectBody.value;
    //
    // const examLi = await examList({
    //   params: {
    //     division_no: divisionId,
    //     course_no: courseNo,
    //   },
    // });
    // setExamData(examLi?.data || []);
    // getExamSelects(examLi);
  };

  const handleEditExamButton = (examId) => {
    navigate("/exam/edit?examId="+examId);
  };

  const handlePreviewButton = (examId) => {
    navigate("/exam/preview?examId="+examId);
  };

  const requestSearchExam = async (courseListParam) => {
    // const divisionSelect = document.getElementById('exam-list-division-select').value;
    const courseSelect = document.getElementById('exam-list-course-select').value;
    const examSelect = document.getElementById('exam-list-no-select').value;
    const createBySelect = document.getElementById('exam-list-create-by-select').value;
    const createDateSelect = document.getElementById('exam-list-create-date-select').value;
    const modifiedDateSelect = document.getElementById('exam-list-modified-date-select').value;
    const tagSelect = document.getElementById('exam-list-tags-select').value;
    const statusSelect = document.getElementById('exam-list-status-select').value;

    let courseNoArr = [];
    if (courseSelect === 'All') {
      let cListTmp = courseListParam || courseList;
      for (let i=0;i<cListTmp.length;i++) {
        courseNoArr.push({
          course_no: cListTmp[i].number
        });
      }
    } else {
      courseNoArr.push({
        course_no: courseSelect
      });
    }
    const examSearchList = await searchExam({
      params: {
        // division: divisionSelect,
        courseNo: courseNoArr,
        examNo: examSelect,
        createBy: createBySelect,
        createDate: createDateSelect,
        modifiedDate: modifiedDateSelect,
        tags: tagSelect,
        status: statusSelect,
      }
    });
    console.log(examSearchList.data);
    setExamData(examSearchList?.data || []);
    getExamSelects(examSearchList);
  };

  const handleExamNoSelectChange = (event) => {
    setExamSelectUsage(event.target.value);
    requestSearchExam();
  };

  const handleCreateBySelectChange = (event) => {
    setExamCreateBySelectUsage(event.target.value);
    requestSearchExam();
  };

  const handleTagsSelectChange = (event) => {
    setExamTagsSelectUsage(event.target.value);
    requestSearchExam();
  };

  const handleExamStatusSelectChange = (event) => {
    setExamStatusSelectUsage(event.target.value);
    requestSearchExam();
  };

  const handleCreateDateSelectChange = () => {
    requestSearchExam();
  };

  const handleModifiedDateSelectChange= () => {
    requestSearchExam();
  };

  return (
    <div className="exams-list">
      <h1>Exams List</h1>
      <div className="filters">
        <div className="filter">
          <label>Division Name. :</label>
          <select id="exam-list-division-select" onChange={updateDivisionHandle}>
            <option value="All">All</option>
            {divisionList.map((division) => (
                <option value={division.id}>{division.name}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label>Course No. :</label>
          <select id="exam-list-course-select" onChange={updateCourseHandle}>
            <option value="All">All</option>
            {courseList.map((course) => (
                <option value={course.number}>{course.number}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="exams-table">
        <thead>
          <tr>
            <th>Actions</th> {/* 添加一个新的表头列 */}
            <th>Exam No.</th>
            <th>Created by</th>
            <th>Created date</th>
            <th>Modified date</th>
            <th>Tags</th>
            <th>Status</th>
          </tr>
          <tr className="filter-rows">
            {/* 在表头的第二行添加筛选条件 */}
            <td></td> {/* 空白的表头单元格 */}
            <td>
              <select id="exam-list-no-select" value={examSelectUsage} onChange={handleExamNoSelectChange}>
                <option value="All">All</option>
                {examNos.map((examNo) => (
                    <option value={examNo}>{examNo}</option>
                ))}
              </select>
            </td>
            <td>
              <select id={"exam-list-create-by-select"} value={examCreateByUsage} onChange={handleCreateBySelectChange}>
                <option value="All">All</option>
                {examCreateBys.map((createBy) => (
                    <option value={createBy}>{createBy}</option>
                ))}
              </select>
            </td>
            <td>
              <input id="exam-list-create-date-select" type="date" onChange={handleCreateDateSelectChange} />
            </td>
            <td>
              <input id="exam-list-modified-date-select" type="date" onChange={handleModifiedDateSelectChange} />
            </td>
            <td>
              <select id={"exam-list-tags-select"} value={examTagsUsage} onChange={handleTagsSelectChange}>
                <option value="All">All</option>
                {examTagss.map((tags) => (
                    <option value={tags}>{tags}</option>
                ))}
              </select>
            </td>
            <td>
              <select id={"exam-list-status-select"} value={examStatusUsage} onChange={handleExamStatusSelectChange}>
                <option value="All">All</option>
                {examStatuss.map((status) => (
                    <option value={status}>{status}</option>
                ))}
              </select>
            </td>
          </tr>
        </thead>
        <tbody>
          {examData.map((exam) => (
            <tr>
              <td>
                <button className="preview-button-ExamsList" onClick={() => handleEditExamButton(exam.id)}>Edit</button> {/* 添加Edit按钮 */}
                <button className="preview-button-ExamsList" onClick={() => handlePreviewButton(exam.id)}>Preview</button>
              </td>
              <td>{exam.exam_no}</td>
              <td>{exam.create_by}</td>
              <td>{dayjs(exam.create_date).format('DD/MMM/YYYY').toLowerCase()}</td>
              <td>{dayjs(exam.modified_date).format('DD/MMM/YYYY').toLowerCase()}</td>
              <td>{exam.tags}</td>
              <td>{exam.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamsList;