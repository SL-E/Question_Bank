// editcourse.jsx

import React from 'react';
import './index.css';

function CreateCourse() {
  return (
    <div className="edit-course">
      <div className='head-backbutton'>
        <div className='back-button-CL'>
          <button className='back-button-CL'>◁</button>
        </div>
        <h2>Edit teachersList course</h2>
      </div>
      <div className="form-group">
        <label>Organisation:</label>
        <select className="custom-select">
          {/* 添加选项 */}
        </select>
      </div>
      <div className="form-group">
        <label>Division Name:</label>
        <select className="custom-select">
          {/* 添加选项 */}
        </select>
      </div>
      <div className="form-group">
        <label>Course Name:</label>
        <input type="text" className="custom-input" />
      </div>
      <div className="form-group">
        <label>Course No.:</label>
        <input type="text" className="custom-input" />
      </div>
      <div className="form-group">
        <label>Lecturer:</label>
        <input type="text" className="custom-input" />
      </div>
      <div className="form-group-comments">
        <label>Comments:</label>
        <input type="text" className="custom-input-comments" />
      </div>
      <div className="form-group">
        <label>Create By:</label>
        <input type="text" className="custom-input" />
      </div>
      <div className="form-group">
        <label>Create Date:</label>
        <input type="text" className="custom-input" />
      </div>
      <div className="container">
            <div className="center-button-container">
                <button className="center-button">Confirm</button>
            </div>
        </div>

    </div>
  );
}

export default CreateCourse;
