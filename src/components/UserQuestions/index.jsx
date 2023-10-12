import React, { useState } from 'react';
import '../../components/UserQuestions/index.css';

function UserQuestions() {
  // 此处添加相应的状态和逻辑

  return (
    <div className="user-questions-container">
      <div className="courses-dropdown">
        <label>My Courses:</label>
        <select>
          {/* 添加下拉菜单的选项 */}
          <option value="course1">Course 1</option>
          <option value="course2">Course 2</option>
          {/* 添加更多选项 */}
        </select>
      </div>

      <table className="questions-table">
        <thead>
          <tr>
            <th></th>
            <th>Question No.</th>
            <th>Tags</th>
            <th>Usage</th>
            <th>Create Date</th>
          </tr>
        </thead>
        <tbody>
          {/* 使用数据映射来渲染表格中的每一行 */}
          {/* 在每行的第一个单元格添加 "Delete" 和 "Preview" 按钮 */}
          <tr>
            <td>
              <button className="delete-button-MQ">Delete</button>
              <button className="preview-button-MQ">Preview</button>
            </td>
            <td>1</td>
            <td>Tag 1, Tag 2</td>
            <td>Usage 1</td>
            <td>2023-10-10</td>
          </tr>
          {/* 添加更多行 */}
        </tbody>
      </table>
    </div>
  );
}

export default UserQuestions;
