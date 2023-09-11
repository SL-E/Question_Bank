import { Link } from 'react-router-dom'; // 导入 Link 组件
import React, { useState } from 'react';
import './index.css';

function EditTeacherList({onBackToTeachersListClick}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [division, setDivision] = useState('');
  const [numbers, setNumbers] = useState('');

  const [content, setContent] = useState("");
  const handleDivisionClick = (menu) => {
    switch(menu) {
      case "IT":
        setContent("IT");
        break;

      case "Art":
        setContent("Art");
        break;

      default:
        setContent(""); // Reset content
        break;
    }
  };

  const handleDivisionSelect = (division) => {
    // 根据 division 设置可选框的选择状态
    switch (division) {
      case 'IT':
        // 在这里处理 IT 部门的选择状态
        break;
  
      case 'Art':
        // 在这里处理 Art 部门的选择状态
        break;
  
      // 添加其他部门的处理逻辑
  
      default:
        break;
    }


  };

  return (
    <div className="edit-teacher-list">
      <button className="back-button" onClick={onBackToTeachersListClick}>&#9664;</button>

      <div className="upper-section">
        <div className="input-row">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-row">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-row">
          <label>Organisation</label>
          <select value={organisation} onChange={(e) => setOrganisation(e.target.value)}>
            <option value="">Select an organisation</option>
            {/* Add other options */}
          </select>
        </div>
      </div>

      <div className="lower-section">
        <div className="left-section">
          <h3>Division List</h3>
          <div className="overflow-container">
            <table className="division-table">
              <thead>
                <tr>
                  <th>Select</th> {/* 添加可选框列 */}
                  <th>Division ID</th> {/* 添加 Division ID 列 */}
                  <th>Division Name</th> {/* 添加 Division Name 列 */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" onChange={() => handleDivisionSelect('IT')} />
                  </td>
                  <td>1</td>
                  <td onClick={() => handleDivisionClick('IT')}>IT</td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" onChange={() => handleDivisionSelect('Art')} />
                  </td>
                  <td>2</td>
                  <td onClick={() => handleDivisionClick('Art')}>Art</td>
                </tr>
                {/* 添加其他部门 */}
              </tbody>
            </table>
          </div>
        </div>

        <div className="middle-section">
          {/* 添加 << 符号 */}
          <div className="symbol">&#171;</div>
          {/* 添加 >> 符号 */}
          <div className="symbol">&#187;</div>
        </div>

        <div className="right-section">
          <h3>Numbers</h3>
          <input type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} />
        </div>
      
      </div>

      <div className="navigation-buttons">
        {/* Previous and Next buttons */}
      </div>
    </div>
  );
}

export default EditTeacherList;
