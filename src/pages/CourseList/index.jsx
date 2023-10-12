// CourseList.jsx

import React from 'react';
import './index.css';

function CourseList() {
  return (
    <div className="custom-course-list">
      <h2>Courses List</h2>
      <div className="custom-select-row">
        <div className="custom-select-container">
          <label>Organise:</label>
          <select className="custom-select-CL">
            {/* 添加选项 */}
          </select>
        </div>
        <div className="custom-select-container">
          <label>Division No.:</label>
          <select className="custom-select-CL">
            {/* 添加选项 */}
          </select>
          <button className="custom-create-button">Create a new course</button>
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
                <td>Sort
                    <span className="arrow">▲</span>
                    <span className="arrow">▼</span>
                </td>
                <td>
                <select className="custom-select-C">
                    {/* 添加选项 */}
                </select>
                </td>
                <td>
                <select className="custom-select-C">
                    {/* 添加选项 */}
                </select>
                </td>
                <td>
                <select className="custom-select-C">
                    {/* 添加选项 */}
                </select>
                </td>
                <td></td>
            </tr>
          </thead>
          <tbody>
            {/* 数据行 */}
            <tr>
              <td>
                <button className="custom-edit-button">Edit</button>
                <button className="custom-delete-button">Delete</button>
              </td>
              <td>Course 101</td>
              <td>2023-09-15</td>
              <td>John Doe</td>
              <td>Dr. Smith</td>
              <td>Some comments</td>
            </tr>
            {/* 添加更多数据行 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseList;
