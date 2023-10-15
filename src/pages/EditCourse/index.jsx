// editcourse.jsx

import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {
    getUniversitiesByDivision,
    fetchUniversitiesList,
    searchCourseById,
    divisionListByUniversities,
    searchTeacherByData,
    editCourse,
    searchTeacherByName,
} from '../../api';
import {useLocation, useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function CreateCourse() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('courseId');

    const [currCourseInfo, setCurrCourseInfo] = useState({});
    const [divisionList, setDivisionList] = useState([]);
    const [universitiesList, setUniversitiesList] = useState([]);
    const [currUniversitiesId, setCurrUniversitiesId] = useState(0);
    const [currDivisionId, setCurrDivisionId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const universitiesListData = await fetchUniversitiesList();
            setUniversitiesList(universitiesListData?.data || []);
            const courseInfoQues = await searchCourseById({
                params: {
                    courseId: courseId
                }
            });
            let courseInfo = courseInfoQues?.data || {};
            const teacherInfoData = await searchTeacherByData({
                params: {
                    teacherIds: [courseInfo.tid || 0],
                }
            });
            const teacherInfo = teacherInfoData?.data || [];
            if (teacherInfo.length === 0) {
                alert('not found teacher info');
                return;
            }
            courseInfo["teacher_name"] = teacherInfo[0].first_name +" "+ teacherInfo[0].last_name;
            courseInfo["create_date"] = dayjs(courseInfo.create_date).format('DD/MMM/YYYY').toLowerCase()
            setCurrCourseInfo(courseInfo);
            const divisionId = courseInfo.division_id;
            const res = await getUniversitiesByDivision({
                params: {
                    divisionId: divisionId
                }
            });

            const divisionListData = res.data?.divisionList || [];
            for (let i = 0;i < divisionListData.length;i++) {
                if (divisionListData[i].id === divisionId) {
                    setCurrDivisionId(divisionId);
                    break;
                }
            }
            setCurrUniversitiesId(res.data?.universitiesId || 0);
            setDivisionList(divisionListData);
        };
        fetchData();
    }, []);

    const handleUniversitiesSelect = async (e) => {
        setCurrUniversitiesId(e.target.value);
        setCurrDivisionId(0);
        setDivisionList([]);

        const divisionListData = await divisionListByUniversities({
            params: {
                universitiesId: e.target.value,
            }
        });
        setDivisionList(divisionListData?.data || []);
        if (divisionListData.data.length !== 0) {
            setCurrDivisionId(divisionListData.data[0].id);
        }
    };

    const handleDivisionSelect = (e) => {
        setCurrDivisionId(e.target.value);
    };

    const copyCourseInfo = () => {
        let tmp = {};
        for (let i in currCourseInfo) {
            tmp[i] = currCourseInfo[i];
        }
        return tmp;
    }

    const handleCourseNameChange = (e) => {
        let courseInfoCopy = copyCourseInfo();
        courseInfoCopy.name = e.target.value;
        setCurrCourseInfo(courseInfoCopy);
    };

    const handleCourseNumberChange = (e) => {
        let courseInfoCopy = copyCourseInfo();
        courseInfoCopy.number = e.target.value;
        setCurrCourseInfo(courseInfoCopy);
    }

    const handleCourseCreateByChange = async (e) => {
        // const teacherInfoQues = await searchTeacherByName({
        //     params: {
        //         teacherName: e.target.value
        //     }
        // });
        // console.log(teacherInfoQues.data);
        // const teacherInfo = teacherInfoQues?.data || {};
        let courseInfoCopy = copyCourseInfo();
        courseInfoCopy.teacher_name = e.target.value;
        setCurrCourseInfo(courseInfoCopy);
    };

    const handleCourseCommentsChange = (e) => {
        let courseInfoCopy = copyCourseInfo();
        courseInfoCopy.comments = e.target.value;
        setCurrCourseInfo(courseInfoCopy);
    };

    const handleCourseCreateDateChange = (e) => {
        let courseInfoCopy = copyCourseInfo();
        courseInfoCopy.create_date = e.target.value;
        setCurrCourseInfo(courseInfoCopy);
    };

    const handleEditCourseSaveButton = async () => {
        const teacherName = currCourseInfo.teacher_name;
        const teacherInfoQues = await searchTeacherByName({
            params: {
                teacherName: teacherName
            }
        });
        const teacherInfo = teacherInfoQues?.data || {};
        if (!teacherInfo.id) {
            alert('not found teacher info');
            return;
        }
        const res = await editCourse({
            courseId: currCourseInfo.id,
            divisionId: currDivisionId,
            name: currCourseInfo.name,
            number: currCourseInfo.number,
            tid: teacherInfo.id,
            comments: currCourseInfo.comments,
            createDate: formatDate(currCourseInfo.create_date),
        });
        if (!res.data.isSuccess) {
            alert('edit course failed');
            return;
        }
        navigate('/course/view');
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

    const handleBackButton = () => {
        navigate('/course/view');
    };

  return (
    <div className="edit-course">
      <div className='head-backbutton'>
        <div className='back-button-CL'>
          <button className='back-button-CL' onClick={handleBackButton}>◁</button>
        </div>
        <h2>Edit teachersList course</h2>
      </div>
      <div className="form-group">
        <label>Organisation:</label>
        <select className="custom-select" value={currUniversitiesId} onChange={handleUniversitiesSelect}>
          {universitiesList.map((universitiesInfo) => (
              <option value={universitiesInfo.id}>{universitiesInfo.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Division Name:</label>
        <select className="custom-select" value={currDivisionId} onChange={handleDivisionSelect}>
          {divisionList.map((divisionInfo) => (
              <option value={divisionInfo.id}>{divisionInfo.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Course Name:</label>
        <input type="text" className="custom-input" value={currCourseInfo.name} onChange={handleCourseNameChange} />
      </div>
      <div className="form-group">
        <label>Course No.:</label>
        <input type="text" className="custom-input" value={currCourseInfo.number} onChange={handleCourseNumberChange}/>
      </div>
      <div className="form-group">
        <label>Lecturer:</label>
        <input type="text" className="custom-input" value={currCourseInfo.teacher_name} onChange={handleCourseCreateByChange}/>
      </div>
      <div className="form-group-comments">
        <label>Comments:</label>
        <input type="text" className="custom-input-comments" value={currCourseInfo.comments} onChange={handleCourseCommentsChange} />
      </div>
      <div className="form-group">
        <label>Create By:</label>
        <input type="text" className="custom-input" value={currCourseInfo.teacher_name} onChange={handleCourseCreateByChange} />
      </div>
      <div className="form-group">
        <label>Create Date:</label>
        <input type="text" className="custom-input" value={currCourseInfo.create_date} onChange={handleCourseCreateDateChange} />
      </div>
      <div className="container">
            <div className="center-button-container">
                <button className="center-button" onClick={handleEditCourseSaveButton}>Confirm</button>
            </div>
        </div>

    </div>
  );
}

export default CreateCourse;
