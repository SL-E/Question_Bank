import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/AddNewDivision/index.css';

function AddNewDivision() {
  const [divisionName, setDivisionName] = useState('');
  const [organisation, setOrganisation] = useState('');

  const navigate = useNavigate();

  const onBackBtnClick = () => {
    navigate('/Admin/divisionlist');
  };

  const handleConfirmClick = () => {
    // 在这里执行保存信息的逻辑，例如向后端发送请求保存数据
    // ...

    // 保存成功后，导航回到 /admin/divisionslist 页面
    navigate('/admin/divisionlist');
  };

  return (
    <div className="add-division-container">
      <button className="back-button" onClick={onBackBtnClick}>
        &#9664;
      </button>

      <div className="division-form">
        <div className="form-row">
          <label>Division Name:</label>
          <input
            type="text"
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Organisation:</label>
          <select
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          >
            <option value="">Select an organisation</option>
            <option value="UoA">UoA</option>
            <option value="UoW">UoW</option>
            {/* 添加其他选项 */}
          </select>
        </div>
      </div>

      <div className="confirm-button-container">
        <button className="confirm-button" onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AddNewDivision;
