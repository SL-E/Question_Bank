import { useParams, useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useState } from 'react';
import './index.css';

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleConfirmClick = () => {
    // 在这里执行保存信息的逻辑，例如向后端发送请求保存数据
    // ...

    // 保存成功后，导航回到 /admin/teacherlist 页面
    navigate('/question/view');
  };

  const handleDelete = () => {
    // 在此处执行删除逻辑，可以向后端发送请求删除问题等

    // 删除成功后，导航回到问题列表页面
    navigate('/question/view');
  };

  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const [isTagDropdownVisible, setIsTagDropdownVisible] = useState(false);

  const handleDropdownChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleTagClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };


  return (
    <div className="edit-question">
      {/* Top Section */}
      <div className="top-section-EQ">
        <div className="top-row">
          <label><h3>Course No.</h3></label>
          <select>
            <option value="CSMAX596">CSMAX596</option>
            <option value="CSMAX570">CSMAX570</option>
          </select>
        </div>
        <div className="top-row">
          
          <label><h3>Question No.</h3></label>
          <select>
            <option value="596S001">Single001</option>
            <option value="596J001">Judgement001</option>
          </select>
          <button onClick={handleDelete} className="delete-button">Delete this question</button>
        </div>
        
      </div>


      {/* Middle Section */}
        <div className="middle-section-EQ">
          <div className="left-section-EQ">
            <div className="section-title">Details</div>
            <div className="section-item">
              <span>Grades:</span>
              <select className='select-grades'>
                <option value="G1">1</option>
                <option value="G2">2</option>
                <option value="G3">3</option>
                <option value="G4">4</option>
                <option value="G5">5</option>
              </select>
            </div>
            <div className="section-item">
              <span onClick={() => setIsTagDropdownVisible(!isTagDropdownVisible)}>General Tags:</span>
              <div className={`tag-input-container ${isTagDropdownVisible ? 'active' : ''}`}>
                <div className="tag-container">
                  {tags.map((tag) => (
                    <div key={tag} className="tag">
                      {tag}
                      <button className="remove-tag" onClick={() => handleRemoveTag(tag)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="add-tag-container">
                  <input
                    type="text"
                    className="input"
                    placeholder="tag"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    onClick={handleTagClick}
                  />
                  <button className="add-tag" onClick={handleAddTag}>+</button>
                  {isTagDropdownVisible && (
                    <div className="dropdown">
                      <select onChange={handleDropdownChange}>
                        <option value="Web">Web</option>
                        <option value="CSS">CSS</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="section-item">
              <span>Time estimate:</span>
              <select className='select-minutes'>
                <option value="1M">1</option>
                <option value="3M">3</option>
                <option value="5M">5</option>
                <option value="7M">7</option>
                <option value="10M">10</option>
              </select>
              <span>Minutes</span>
            </div>
            <div className="section-item">
              <span>Picture:</span>
              <input type="text" className="input-box question-picture" />
            </div>
            <div className="section-item">
              <span>Question text:</span>
              <input type="text" className="input-box question-text-input" />
            </div>
            <div className="section-item">
              <span>Usage:</span>
              <select className='select-types'>
                <option value="U1">SingleChoice</option>
                <option value="U2">MultiChoice</option>
                <option value="U3">True-False</option>
                <option value="...">...</option>

              </select>
              <input type="text" className="input-box question-option" />
            </div>
            <div className="section-item">
              <span>Modified by:</span>
              <select className='select-types'>
                <option value="T1">Alvin</option>
                <option value="T2">Cameron</option>
                <option value="T3">Edward</option>
                <option value="....">...</option>

              </select>
            </div>
            <div className="section-item">
              <span>Date:</span>
              <input type="date" className="custom-date-input" />
            </div>
          </div>
          <div className="right-section-EQ">
            <div className="section-title">Preview:</div>
            {/* Add content for the Preview section here */}
          </div>
        </div>

      <div className="navigation-buttons">
        
        <button className="confirm-button" onClick={handleConfirmClick}>Confirm changes</button>
        
      </div>
    </div>
  );
}

export default EditQuestion;
