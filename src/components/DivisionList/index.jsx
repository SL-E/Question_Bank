import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../components/DivisionList/index.css';

function DivisionList() {
  const [divisionData, setDivisionData] = useState([
    { id: 1, divisionName: 'Division 1', organisation: 'UoW' },
    { id: 2, divisionName: 'Division 2', organisation: 'UoA' },
    // 添加更多的分部数据
  ]);

  const navigate = useNavigate();

  const onAddBtnClick = () => {
    navigate('/Admin/addnewdivision');
  };

  const onEditBtnClick = () => {
    navigate('/Admin/editdivision');
  };

  return (
    <div className="divisions-content">
      <div className="header-container">
        <h2>List of Divisions</h2>
        <button className="add-button" onClick={onAddBtnClick}>
          Add a new division
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Division Name</th>
              <th>Organisation</th>
            </tr>
          </thead>
          <tbody>
            {divisionData.map((division, index) => (
              <tr key={division.id} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                <td>
                  <div>
                    <button className="edit-link" onClick={onEditBtnClick}>
                      Edit
                    </button>
                  </div>
                  <div>
                    <Link to={`/delete/${division.id}`} className="delete-link">
                      Delete
                    </Link>
                  </div>
                </td>
                <td>{division.divisionName}</td>
                <td>{division.organisation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DivisionList;
