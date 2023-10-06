import React from 'react';
import './index.css';

function ExamsList() {
  const examData = [
    {
      examNo: 'Exam 1',
      createdBy: 'User A',
      createdDate: '2023-01-10',
      modifiedDate: '2023-01-15',
      tags:'CSS',
      status: 'Active',
    },
    {
      examNo: 'Exam 2',
      createdBy: 'User B',
      createdDate: '2023-02-05',
      modifiedDate: '2023-02-10',
      tags:'WEB',
      status: 'Inactive',
    },
    // 添加更多数据项
  ];

  return (
    <div className="exams-list">
      <h1>Exams List</h1>
      <div className="filters">
        <div className="filter">
          <label>Division No. :</label>
          <select>
            {/* 添加选项 */}
          </select>
        </div>
        <div className="filter">
          <label>Course No. :</label>
          <select>
            {/* 添加选项 */}
          </select>
        </div>
      </div>
      <table className="exams-table">
        <thead>
          <tr>
            <th>Exam No.</th>
            <th>Created by</th>
            <th>Created date</th>
            <th>Modified date</th>
            <th>Tags</th>
            <th>Status</th>
          </tr>
          <tr className="filter-rows">
            {/* 在表头的第二行添加筛选条件 */}
            <td>
              <select>
                {/* 添加筛选选项 */}
              </select>
            </td>
            <td>
              <select>
                {/* 添加筛选选项 */}
              </select>
            </td>
            <td>
              <input type="date" />
            </td>
            <td>
              <input type="date" />
            </td>
            <td>
              <select>
                {/* 添加筛选选项 */}
              </select>
            </td>
            <td>
              <select>
                {/* 添加筛选选项 */}
              </select>
            </td>
          </tr>
        </thead>
        <tbody>
          {examData.map((exam, index) => (
            <tr key={index}>
              <td>
                {exam.examNo}
                <button className="preview-button">Preview</button>
              </td>
              <td>{exam.createdBy}</td>
              <td>{exam.createdDate}</td>
              <td>{exam.modifiedDate}</td>
              <td>{exam.tags}</td>
              <td>{exam.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamsList;