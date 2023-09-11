import { Link } from 'react-router-dom'; // 导入 Link 组件
import React, { useState } from 'react';
import EditTeacherList from '../../components/EditTeacherList';

import './index.css';

function TeachersList({ onAddNewTeacherClick }) {
    const [sortBy, setSortBy] = useState(''); // 状态来存储排序方式
    const [teachersData, setTeachersData] = useState([
    { id: 1, email: 'teacher1@example.com', userName: 'Teacher 1', organisation: 'UoW', division: 'IT' },
    { id: 2, email: 'teacher2@example.com', userName: 'Teacher 2', organisation: 'UoA', division: 'IT' },
    { id: 3, email: 'teacher3@example.com', userName: 'Teacher 3', organisation: 'UoW', division: 'Art' },
    { id: 4, email: 'teacher4@example.com', userName: 'Teacher 4', organisation: 'UoA', division: 'Biology' },
    { id: 5, email: 'teacher5@example.com', userName: 'Teacher 5', organisation: 'UoW', division: 'Physics' },
    { id: 6, email: 'teacher6@example.com', userName: 'Teacher 6', organisation: 'UoA', division: 'Mathematics' },
    { id: 7, email: 'teacher7@example.com', userName: 'Teacher 7', organisation: 'UoW', division: 'History' },
    { id: 8, email: 'teacher8@example.com', userName: 'Teacher 8', organisation: 'UoA', division: 'Chemistry' },
    { id: 9, email: 'teacher9@example.com', userName: 'Teacher 9', organisation: 'UoW', division: 'Literature' },
    { id: 10, email: 'teacher10@example.com', userName: 'Teacher 10', organisation: 'UoA', division: 'Computer Science' },
    { id: 11, email: 'teacher11@example.com', userName: 'Teacher 11', organisation: 'UoW', division: 'Economics' },
    { id: 12, email: 'teacher12@example.com', userName: 'Teacher 12', organisation: 'UoA', division: 'Psychology' },
    { id: 13, email: 'teacher13@example.com', userName: 'Teacher 13', organisation: 'UoW', division: 'Sociology' },
    { id: 14, email: 'teacher14@example.com', userName: 'Teacher 14', organisation: 'UoA', division: 'Geology' },
    { id: 15, email: 'teacher15@example.com', userName: 'Teacher 15', organisation: 'UoW', division: 'Art History' },
    { id: 16, email: 'teacher16@example.com', userName: 'Teacher 16', organisation: 'UoA', division: 'Music' },
    { id: 17, email: 'teacher17@example.com', userName: 'Teacher 17', organisation: 'UoW', division: 'Drama' },
    { id: 18, email: 'teacher18@example.com', userName: 'Teacher 18', organisation: 'UoA', division: 'Political Science' },
    { id: 19, email: 'teacher19@example.com', userName: 'Teacher 19', organisation: 'UoW', division: 'Environmental Science' },
    { id: 20, email: 'teacher20@example.com', userName: 'Teacher 20', organisation: 'UoA', division: 'Philosophy' },
    { id: 21, email: 'teacher21@example.com', userName: 'Teacher 21', organisation: 'UoW', division: 'Engineering' },
    { id: 22, email: 'teacher22@example.com', userName: 'Teacher 22', organisation: 'UoA', division: 'Medicine' },
    { id: 23, email: 'teacher23@example.com', userName: 'Teacher 23', organisation: 'UoW', division: 'Architecture' },

    // ...
  ]);

  const handleSortChange = (event) => {
    const selectedDivision = event.target.value;
    setSortBy(selectedDivision);
    sortTeachers(selectedDivision);
  };

  const sortTeachers = (selectedDivision) => {
    let sortedTeachers = [...teachersData];

    if (selectedDivision === 'Division') {
      setTeachersData(sortedTeachers); // 不进行排序
    } else {
      sortedTeachers.sort((a, b) => a.division.localeCompare(b.division));
      setTeachersData(sortedTeachers);
    }
  };
  

  return (
    <div className="teachers-content">
      <div className="header-container">
            <h2>List of Teachers</h2>
            <button className="add-button" onClick={onAddNewTeacherClick}>Add a new teacher</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>UserName</th>
              <th>Organisation</th>
              <th>
                <div className="division-header">
                    <span>Division</span>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="">Sort by Division</option>
                        <option value="Division">--</option>
                        <option value="IT">IT</option>
                        <option value="Art">Art</option>
                        {/* 添加其他选项 从数据库调取 */}
                    </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {teachersData.map((teacher, index) => (
              <tr key={teacher.id} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                <td><Link to={`/edit/${teacher.id}`}>Edit</Link></td>   
                {/* 将 /edit/${teacher.id} 替换为实际的编辑路径 */}
                <td>{teacher.email}</td>
                <td>{teacher.userName}</td>
                <td>{teacher.organisation}</td>
                <td>{teacher.division}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeachersList;
