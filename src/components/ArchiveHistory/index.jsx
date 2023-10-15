import React, { useState } from 'react';
import '../../components/ArchiveHistory/index.css';

const ArchiveHistory = () => {
  const [historyData, setHistoryData] = useState([
    // Example data
    { courseNo: '101', examNo: '1', versionNo: '1', exportDate: '2023-01-01', tags: 'Midterm' },
    // Add more data as needed
  ]);

  const handleSortAndFilter = (field, value) => {
    // Implement sorting and filtering logic here
  };

  return (
    <div className="archiveHistoryContainer">
      <h2>Export Archive History</h2>
      <table className="archiveHistoryTable">
        <thead>
          <tr>
            <th>
              Course No.
              <select onChange={(e) => handleSortAndFilter('courseNo', e.target.value)}>
                {/* Add options for filtering */}
              </select>
            </th>
            <th onClick={() => handleSortAndFilter('examNo')}>Exam No.</th>
            <th onClick={() => handleSortAndFilter('versionNo')}>Version No.</th>
            <th onClick={() => handleSortAndFilter('exportDate')}>Export date</th>
            <th>
              Tags
              <select onChange={(e) => handleSortAndFilter('tags', e.target.value)}>
                {/* Add options for filtering */}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((data, index) => (
            <tr key={index}>
              <td>{data.courseNo}</td>
              <td>{data.examNo}</td>
              <td>{data.versionNo}</td>
              <td>{data.exportDate}</td>
              <td>{data.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchiveHistory;
