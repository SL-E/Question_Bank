import { useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useState } from 'react';
import './index.css';

function AddNewTeacher() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [division, setDivision] = useState('');
  const [numbers, setNumbers] = useState('');
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const onBackBtnClick = () => {
    navigate('/Admin/teacherslist')
  }

  const handleConfirmClick = () => {
    // 在这里执行保存信息的逻辑，例如向后端发送请求保存数据
    // ...

    // 保存成功后，导航回到 /admin/teacherlist 页面
    navigate('/admin/teacherslist');
  };

  const [selectedDivisions, setSelectedDivisions] = useState([]); // 用于存储选中的学生名字
  const [inputValue, setInputValue] = useState(''); // 用于存储右侧部分的输入框内容

  // 学生数据示例
  const DivisionsData = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Art' },
    { id: 3, name: 'Education' },
    // 添加更多学生数据
  ];

  // 处理点击 ">>" 按钮的函数
  const handleMoveRightClick = () => {
    // 在这里获取选中的学生名字并更新到 selectedDivisions 状态
    // 假设你已经实现了获取选中的学生名字的逻辑
    // 以下是一个示例：

    // 获取所有复选框元素
    const checkboxes = document.querySelectorAll('.Division-checkbox');

    // 用于存储选中的学生名字的数组
    const selectedNames = [];

    // 遍历复选框元素，如果选中则将对应学生名字添加到数组中
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const DivisionName = checkbox.getAttribute('data-Division-name');
        selectedNames.push(DivisionName);
      }
    });

    // 更新选中的学生名字状态
    setSelectedDivisions(selectedNames);

    // 在这里将选中的学生名字更新到右侧部分的输入框
    setInputValue(selectedNames.join(', ')); // 将学生名字用逗号分隔显示
  };

  // 处理点击 "<<" 按钮的函数
  const handleMoveLeftClick = () => {
    // 清空右侧部分的输入框内容
    setInputValue('');
    // 清空选中的学生名字
    setSelectedDivisions([]);
  };


  return (
    <div className="edit-teacher-list">
      <button className="back-button" onClick={onBackBtnClick}>&#9664;</button>

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
            <option value="option1">UoA</option>
            <option value="option2">UoW</option>

            {/* Add other options */}
          </select>
        </div>
      </div>

      <div className="lower-section">
        <div className="left-section">
          <h3>Division List</h3>
          <div className="overflow-container">
            <table className="Division-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Division ID</th>
                  <th>Division Name</th>
                </tr>
              </thead>
              <tbody>
                {DivisionsData.map((Division) => (
                  <tr key={Division.id}>
                    <td>
                      {/* 
                        渲染复选框
                        使用 data-Division-name 属性存储学生名字
                      */}
                      <input
                        type="checkbox"
                        className="Division-checkbox"
                        data-Division-name={Division.name}
                      />
                    </td>
                    <td>{Division.id}</td>
                    <td>{Division.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="middle-section">
          <div
            className="symbol"
            onClick={handleMoveRightClick}
          >
            &#187;
          </div>
          <div
            className="symbol"
            onClick={handleMoveLeftClick}
          >
            &#171;
          </div>
        </div>

        <div className="right-section">
          <h3>Selected Divisions</h3>
          <input
          type="text"
          value={inputValue}
          readOnly
          />
        </div>
      
      </div>

      <div className="navigation-buttons">
        <button className="confirm-button" onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AddNewTeacher;
