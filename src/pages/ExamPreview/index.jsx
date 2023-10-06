import React from 'react';
import './index.css';

function ExamPreview() {
  return (
    <div className="exam-preview">
      <h1>Exams Preview</h1>
      <div className="exam-select">
        <div className="exam-detail">          
          <label>Exam No. :</label>
          <select className="wide-select">
            {/* 添加选项 */}
          </select>
        </div>
        <div className='exam-compare'>
          <div className="exam-detail">          
            <label>Version No. :</label>
            <select className="wide-select">
              {/* 添加选项 */}
            </select>
          </div>
          <div className="exam-detail">
            <label>Compare with:</label>
            <select className="wide-select">
              {/* 添加选项 */}
            </select>
          </div>
        </div>
      </div>
      <div className="exam-content">
        <div className="e-left-container"> {/* 左侧容器 */}
          <div className="e-left-content"> 
            {/* 左侧内容 */}
          </div>
          <div className="button-container">
            <button className="edit-button">Edit</button>
            <button className="export-button">Export</button>
            <button className="save-to-button">Save to the original version</button>
          </div>
          
            
          
        </div>
        <div className="e-right-container"> {/* 右侧容器 */}
          <div className="e-right-content">
              {/* 右侧内容 */}
          </div>
          <div className="button-container">
            <button className="edit-button">Edit</button>
            <button className="export-button">Export</button>
            <button className="save-to-button">Save to the original version</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ExamPreview;
