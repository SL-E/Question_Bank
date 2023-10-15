// editcourse.jsx

import React, {useEffect, useState} from 'react';
import './index.css';
import {useLocation, useNavigate} from "react-router-dom";
import {
    divisionListByUniversities,
    fetchUniversitiesList,
    createCourse,
    searchCourseById,
    searchTeacherByData, searchTeacherByName
} from "../../api";
import User from "../../store/user";
import dayjs from "dayjs";

function CreateCourse() {

    const navigate = useNavigate();

    const [divisionList, setDivisionList] = useState([]);
    const [universitiesList, setUniversitiesList] = useState([]);
    const [createTime, setCreateTime] = useState('');

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
            const currDate = dayjs(new Date());
            const formattedDate = currDate.format('DD/MMM/YYYY').toLowerCase();
            setCreateTime(formattedDate);
        };
        fetchData();
    }, []);

    const handleUniversitiesSelectChange = async (e) => {
        const universitieId = e.target.value;
        const divisionListData = await divisionListByUniversities({
            params: {
                universitiesId: universitieId,
            }
        });
        setDivisionList(divisionListData?.data || []);
    };

    const handleSaveButton = async () => {
        let divisionId = document.getElementById('create-course-division').value;
        let courseName = document.getElementById('create-course-name').value;
        let courseNumber = document.getElementById('create-course-number').value;
        let courseComments = document.getElementById('create-course-comments').value;

        console.log({
            name: courseName,
            number: courseNumber,
            division_id: divisionId,
            tid: User.userInfo.id,
            comments: courseComments,
            create_date: createTime,
        });

        const res = await createCourse({
            name: courseName,
            number: courseNumber,
            division_id: divisionId,
            tid: User.userInfo.id,
            comments: courseComments,
            create_date: createTime,
        });
        if (!res.data.isSuccess) {
            alert('create course failed');
            return;
        }
        navigate('/course/view');
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
        <h2>Create a new course</h2>
      </div>
      <div className="form-group">
        <label>Organisation:</label>
        <select id="create-course-universities" className="custom-select" onChange={handleUniversitiesSelectChange}>
            {universitiesList.map((universitiesInfo) => (
                <option value={universitiesInfo.id}>{universitiesInfo.name}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Division Name:</label>
        <select id="create-course-division" className="custom-select">
            {divisionList.map((divisionInfo) => (
                <option value={divisionInfo.id}>{divisionInfo.name}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Course Name:</label>
        <input id="create-course-name" type="text" className="custom-input" />
      </div>
      <div className="form-group">
        <label>Course No.:</label>
        <input id="create-course-number" type="text" className="custom-input" />
      </div>
      <div className="form-group">
        <label>Lecturer:</label>
        <input id="create-course-lecturer" type="text" className="custom-input" value={User.userInfo.first_name + " " + User.userInfo.last_name} />
      </div>
      <div className="form-group-comments">
        <label>Comments:</label>
        <input id="create-course-comments" type="text" className="custom-input-comments" />
      </div>
      <div className="form-group">
        <label>Create By:</label>
        <input id="create-course-create-by" type="text" className="custom-input" value={User.userInfo.first_name + " " + User.userInfo.last_name} />
      </div>
      <div className="form-group">
        <label>Create Date:</label>
        <input id="create-course-create-date" type="text" className="custom-input" value={createTime} />
      </div>
      <div className="container">
            <div className="center-button-container">
                <button className="center-button" onClick={handleSaveButton}>Confirm</button>
            </div>
        </div>

    </div>
  );
}

export default CreateCourse;
