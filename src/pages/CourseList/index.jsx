// CourseList.jsx

import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";
import {divisionListByUniversities, fetchUniversitiesList, deleteCourse, searchCourseByData, searchTeacherByData} from "../../api";
import dayjs from "dayjs";

function CourseList() {
    const navigate = useNavigate();
    const [courseList, setCourseList] = useState([]);
    const [divisionList, setDivisionList] = useState([]);
    const [universitiesList, setUniversitiesList] = useState([]);
    const [sortByQuestionNo, setSortByQuestionNo] = useState('asc');

    const [createByList, setCreateByList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const universitiesListData = await fetchUniversitiesList();
            setUniversitiesList(universitiesListData?.data || []);
            const divisionListData = await divisionListByUniversities({
                params: {
                    universitiesId: universitiesListData?.data?.[0]?.id,
                }
            });
            setDivisionList(divisionListData?.data || []);
            requestSearchCourse(divisionListData?.data?.[0]?.id);
        };
        fetchData();
    }, []);

    const handleSortByQuestionNo = (order) => {
        // 只在不同的排序状态下切换
        if (sortByQuestionNo === order) {
            return;
        }
        setSortByQuestionNo(order);
        let courseListCopy = [...courseList];
        courseListCopy.sort(sortQuesHandle('number', order));
        setCourseList(courseListCopy);
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

    const handleUniversitiesSelectChange = async (e) => {
        const universitieId = e.target.value;
        const divisionListData = await divisionListByUniversities({
            params: {
                universitiesId: universitieId,
            }
        });
        setDivisionList(divisionListData?.data || []);
        requestSearchCourse(divisionListData?.data?.[0]?.id);
    };

    const handleDivisionSelectChange = async (e) => {
        const divisionId = e.target.value;
        requestSearchCourse(divisionId);
    };

    const getSelects = async (courseDatas, isNotChangeSelect) => {
        if (courseDatas.length === 0) {
            setCourseList([]);
            return;
        }
        let createBySet = new Set();
        for (let i = 0;i<courseDatas.length;i++) {
            const courseInfo = courseDatas[i];
            createBySet.add(courseInfo.tid);
        }
        const teacherList = await searchTeacherByData({
            params: {
                teacherIds: Array.from(createBySet),
            },
        });
        let createByArr = [];
        let teacherNameMap = {};
        for (let i=0;i<teacherList.data.length;i++) {
            const teacherName = teacherList.data[i].first_name + teacherList.data[i].last_name;
            createByArr.push({
                id: teacherList.data[i].id,
                name: teacherName
            });
            teacherNameMap[teacherList.data[i].id] = teacherName;
        }
        for (let i = 0;i<courseDatas.length;i++) {
            if (!teacherNameMap[courseDatas[i].tid]) {
                continue;
            }
            courseDatas[i].teacher_name = teacherNameMap[courseDatas[i].tid];
            courseDatas[i]["create_date"] = dayjs(courseDatas[i].create_date).format('DD/MMM/YYYY').toLowerCase();
        }
        if (isNotChangeSelect) {
            setCourseList(courseDatas);
            return;
        }
        setCreateByList(createByArr);
        setCourseList(courseDatas);
    }

    const requestSearchCourse = async (divisionIds, createDates, createBys, isNotChangeSelect) => {
        let divisionId = divisionIds || document.getElementById('course-list-division-select').value;
        let createDate = createDates || document.getElementById('course-list-create-date-select').value;
        let createBy = createBys || document.getElementById('course-list-create-by-select').value;
        const courseListData = await searchCourseByData({
            params: {
                divisionId, createDate, createBy
            }
        });
        getSelects(courseListData?.data || [], isNotChangeSelect);
    };

    const handleCreateDateChange = () => {
        requestSearchCourse('','','', true);
    }
    const handleCreateByChange = () => {
        requestSearchCourse('','','', true);
    };

    const handleCourseEditButton = (courseId) => {
        navigate('/course/edit?courseId='+courseId);
    };

    const handleCourseDeleteButton = async (courseId) => {
        const res = await deleteCourse({
            courseId
        });

        if (!res.data.isSuccess) {
            alert('delete course failed');
            return;
        }
        let courseListCopy = [...courseList];
        for (let i=0;i<courseListCopy.length;i++) {
            if (courseListCopy[i].id === courseId) {
                courseListCopy.splice(i, 1);
            }
        }
        setCourseList(courseListCopy);
    };

    const handleCreateNewCourseButton = () => {
        navigate('/course/create');
    };

  return (
    <div className="custom-course-list">
      <h2>Courses List</h2>
      <div className="custom-select-row">
        <div className="custom-select-container">
          <label>Organise:</label>
          <select className="custom-select-CL" onChange={handleUniversitiesSelectChange}>
            {universitiesList.map((universitiesInfo) => (
                <option value={universitiesInfo.id}>{universitiesInfo.name}</option>
            ))}
          </select>
        </div>
        <div className="custom-select-container">
          <label>Division No.:</label>
          <select id="course-list-division-select" className="custom-select-CL" onChange={handleDivisionSelectChange}>
            {divisionList.map((divisionInfo) => (
                <option value={divisionInfo.id}>{divisionInfo.name}</option>
            ))}
          </select>
          <button className="custom-create-button" onClick={handleCreateNewCourseButton}>Create a new course</button>
        </div>
      </div>
      
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Course No.</th>
              <th>Created date</th>
              <th>Created by</th>
              <th>Lecturer</th>
              <th>Comments</th>
            </tr>
            <tr className="filter-rows-C">
                <td></td>
                <td>
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
                </td>
                <td>
                    <input id="course-list-create-date-select" type="date" onChange={handleCreateDateChange} />
                </td>
                <td>
                <select id="course-list-create-by-select" className="custom-select-C" onChange={handleCreateByChange}>
                    <option value="All">All</option>
                    {createByList.map((createByInfo) => (
                        <option value={createByInfo.id}>{createByInfo.name}</option>
                    ))}
                </select>
                </td>
                <td>
                <select id="course-list-lecturer-select" className="custom-select-C" onChange={handleCreateByChange}>
                    <option value="All">All</option>
                    {createByList.map((createByInfo) => (
                        <option value={createByInfo.id}>{createByInfo.name}</option>
                    ))}
                </select>
                </td>
                <td></td>
            </tr>
          </thead>
          <tbody id="course-list-body">
            {/* 数据行 */}
            {courseList.map((courseInfo) => (
                <tr id={courseInfo.id+"-course-list-singe"}>
                    <td>
                        <button className="custom-edit-button" onClick={() => handleCourseEditButton(courseInfo.id)}>Edit</button>
                        <button className="custom-delete-button" onClick={() => handleCourseDeleteButton(courseInfo.id)}>Delete</button>
                    </td>
                    <td>{courseInfo.number}</td>
                    <td>{courseInfo.create_date}</td>
                    <td>{courseInfo.teacher_name}</td>
                    <td>{courseInfo.teacher_name}</td>
                    <td>{courseInfo.comments}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseList;
