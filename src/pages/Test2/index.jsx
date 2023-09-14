import React, { useState } from 'react';
import './index.css'; // 导入你的样式文件

function YourComponent() {
  const [selectedDivisions, setSelectedDivisions] = useState([]); // 用于存储选中的学生名字
  const [inputValue, setInputValue] = useState(''); // 用于存储右侧部分的输入框内容

  // 学生数据示例
  const DivisionsData = [
    { id: 1, name: 'Division 1' },
    { id: 2, name: 'Division 2' },
    { id: 3, name: 'Division 3' },
    { id: 4, name: 'Division 4' },
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
    <div className="your-container">
      <div className="left-section">
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
  );
}

export default YourComponent;
