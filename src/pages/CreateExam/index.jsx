import React, { useState } from 'react';
import './index.css';

function CreateExam() {

  const [sortByQuestionNo, setSortByQuestionNo] = useState('asc'); // 初始排序为升序
  const [selectedUsage, setSelectedUsage] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  const handleSortByQuestionNo = (order) => {
    // 只在不同的排序状态下切换
    if (sortByQuestionNo !== order) {
      setSortByQuestionNo(order);
      // 在这里实现根据 Question No. 进行排序的逻辑
    }
  };

  const handleUsageChange = (event) => {
    setSelectedUsage(event.target.value);
    // 实现根据Usage进行筛选的逻辑
  };

  const handleTagsChange = (event) => {
    setSelectedTags(event.target.value);
    // 实现根据Tags进行筛选的逻辑
  };


  return (
    <div className="create-exam-container">
      <div className="back-button-container">
        <button className="back-button">&#9665;</button>
      </div>
      <h1>Create a New Exam</h1>
      <div className="create-exam-content">
        <div className="top-section">
          <div className="top-section-item">
            <label>Course No. :</label>
            <select>
              <option value="CSMAX596">CSMAX596</option>
              <option value="CSMAX570">CSMAX570</option>
            </select>
          </div>
          <div className="top-section-item">
            <label>Tags :</label>
            <select>
              <option value="Web">Web</option>
              <option value="CSS">CSS</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="top-section-item">
            <label>Exam No. :</label>
            <input type="text" />
          </div>
          <div className="top-section-item">
            <label>Create by :</label>
            <input type="text" />
          </div>
          <div className="top-section-item">
            <label>Create date :</label>
            <input type="text" />
          </div>
        </div>
        <div className="bottom-section">
          <div className="left-section">
            <h2>Questions list</h2>
            <table>
              <thead>
                <tr>
                  <th>Selected </th>
                  <th>
                    Question No.
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
                  </th>
                  <th>Time estimate</th>
                  <th>
                    Usage
                    <select value={selectedUsage} onChange={handleUsageChange}>
                      <option value="">All</option>
                      <option value="SingleChoice">SingleChoice</option>
                      <option value="MultiChoice">MultiChoice</option>
                      {/* 添加更多选项 */}
                    </select>
                  </th>
                  <th>
                    Tags
                    <select value={selectedTags} onChange={handleTagsChange}>
                      <option value="">All</option>
                      <option value="CSS">CSS</option>
                      <option value="Web">Web</option>
                      {/* 添加更多选项 */}
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Add your table rows here */}
                <tr>
                  <td><input type="checkbox" /><button>View</button></td>
                  <td>Q1</td>
                  <td>10 mins</td>
                  <td>SingleChoice</td>
                  <td>CSS</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /><button>View</button></td>
                  <td>Q2</td>
                  <td>15 mins</td>
                  <td>MultiChoice</td>
                  <td>WEB</td>
                </tr>
                {/* Add more table rows as needed */}
              </tbody>
            </table>
          </div>
          <div className=".middle-buttons">
            <button>&gt;&gt;</button>
            <button>&lt;&lt;</button>
          </div>
          <div className="right-section">
            <h2>Exam</h2>
            <table>
              <thead>
                <tr>
                  <th>Selected</th>
                  <th>Order in Exam
                    <select>
                      <option value="10">10 Qs in total</option>
                      <option value="15">15 Qs in total</option>
                      <option value="20">20 Qs in total</option>
                    </select>
                  </th>
                  <th>Question No.</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {/* Add your table rows here */}
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>
                  <td>Q1</td>
                  <td><input type="text" />%</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>
                  <td>Q2</td>
                  <td><input type="text" />%</td>
                </tr>
                {/* Add more table rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bottom-buttons">
        <button className="preview-button">Preview</button>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
}

export default CreateExam;
