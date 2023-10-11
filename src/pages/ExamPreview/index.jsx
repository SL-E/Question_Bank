import React, {useState, useEffect} from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import './index.css';
import {useLocation, useNavigate} from "react-router-dom";
import {getExam, examAllNo, examByNo, getExamChangeRecord, getExamChangeRecordById, updateOriginExam, getQuestionByNo} from "../../api";

function ExamPreview() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let examId = searchParams.get('examId');
  const [examNos, setExamNos] = useState([]);
  const [examCurrNo, setExamCurrNo] = useState("");
  const [versionList, setVersionList] = useState([]);
  const [versionInfo, setVersionInfo] = useState({});
  const [compareInfo, setCompareInfo] = useState({});
  const [imgRef1, setImgRef1] = useState();
  const [imgRef2, setImgRef2] = useState();
  const [versionQuesList, setVersionQuesList] = useState([]);
  const [compareQuesList, setCompareQuesList] = useState([]);
  const [versionCount, setVersionCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examAllNoData = await examAllNo();
        setExamNos(examAllNoData?.data || []);
        if (!examId) {
          setExamCurrNo(examAllNoData.data[0] ? examAllNoData.data[0] : '');
          const examInfo = await examByNo({
            params: {
              examNo: examAllNoData.data[0] ? examAllNoData.data[0] : "",
            }
          });
          examId = examInfo?.data?.id;
        } else {
          const currExamInfo = await getExam({
            params: {
              examId: examId,
            }
          });
          setExamCurrNo(currExamInfo?.data?.exam_no);
        }
        const currExamChangeRecord = await getExamChangeRecord({
          params: {
            examId: examId,
          }
        });
        let versionArr = [];
        for (let i = 0;i<currExamChangeRecord.data.length;i++) {
          if (i === 0) {
            setVersionCount(currExamChangeRecord.data[i].id - 1);
          }
          versionArr.push(currExamChangeRecord.data[i].id);
        }
        setVersionList(versionArr);
        setImgRef1(React.createRef());
        setImgRef2(React.createRef());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExamNoChange = async (event) => {
    setExamCurrNo(event.target.value);
    const currNo = event.target.value;
    const examInfo = await examByNo({
      params: {
        examNo: currNo,
      }
    });
    examId = examInfo?.data?.id;
    const currExamChangeRecord = await getExamChangeRecord({
      params: {
        examId: examId,
      }
    });
    let versionArr = [];
    for (let i = 0;i<currExamChangeRecord.data.length;i++) {
      setVersionCount(currExamChangeRecord.data[i].id - 1);
      versionArr.push(currExamChangeRecord.data[i].id);
    }
    setVersionList(versionArr);
    setVersionQuesList([]);
    setCompareQuesList([]);
  };

  const handleCompareChange = async (event) => {
    const version = event.target.value;
    const recordInfo = await getExamChangeRecordById({
      params: {
        recordId: version
      }
    });
    setCompareInfo(recordInfo.data || {});
    if (!recordInfo.data) {
      setCompareQuesList([]);
      return;
    }
    const examRecord = JSON.parse(recordInfo.data.update_record);
    const questionList = JSON.parse(examRecord.questions);
    let compareTmpList = [];
    for (let i=0;i<questionList.length;i++) {
      const quesNo = questionList[i].questionNo;
      const questionInfoReq = await getQuestionByNo({
        params: {
          quesNo: quesNo
        }
      });
      const questionInfo = questionInfoReq.data;
      if (questionInfo.length === 0) {
        continue;
      }
      compareTmpList.push(questionInfo[0]);
    }
    setCompareQuesList(compareTmpList);
  };

  const handleVersionChange = async (event) => {
    const version = event.target.value;
    const recordInfo = await getExamChangeRecordById({
      params: {
        recordId: version
      }
    });
    setVersionInfo(recordInfo.data || {});
    if (!recordInfo.data) {
      setVersionQuesList([]);
      return;
    }
    const examRecord = JSON.parse(recordInfo.data.update_record);
    const questionList = JSON.parse(examRecord.questions);
    let versionTmpList = [];
    for (let i=0;i<questionList.length;i++) {
      const quesNo = questionList[i].questionNo;
      const questionInfoReq = await getQuestionByNo({
        params: {
          quesNo: quesNo
        }
      });
      const questionInfo = questionInfoReq.data;
      if (questionInfo.length === 0) {
        continue;
      }
      versionTmpList.push(questionInfo[0]);
    }
    setVersionQuesList(versionTmpList);
  };

  const handleSaveToRightButton = async () => {
    await updateOriginExam({
      record: compareInfo,
    });
  };

  const handleSaveToLeftButton = async () => {
    await updateOriginExam({
      record: versionInfo,
    });
  };

  const handleLeftEditButton = async () => {
    navigate("/exam/edit?examId="+examId+"&updateRecordId="+versionInfo.id);
  };

  const handleRightEditButton = async () => {
    navigate("/exam/edit?examId="+examId+"&updateRecordId="+compareInfo.id);
  };

  const handleLeftExportButton = async () => {
    const quesNum = versionQuesList.length;
    const pdf = new jsPDF('p', 'mm', 'a4');
    html2canvas(imgRef1.current,{
      useCORS: true,
      x: 0,
      y: 0,
    }).then((canvas) => {
      const imgData1 = canvas.toDataURL();

      pdf.addImage(imgData1, 'png', 10, 0, 200, quesNum * 100);
      const pdfFileName = 'exam-'+Date.now()+'.pdf'
      pdf.save(pdfFileName);
    });
  };

  const handleRightExportButton = async () => {
    const quesNum = compareQuesList.length;
    const pdf = new jsPDF('p', 'mm', 'a4');
    html2canvas(imgRef1.current,{
      useCORS: true,
      x: 0,
      y: 0,
    }).then((canvas) => {
      const imgData1 = canvas.toDataURL();

      pdf.addImage(imgData1, 'png', 10, 0, 200, quesNum * 100);
      const pdfFileName = 'exam-'+Date.now()+'.pdf'
      pdf.save(pdfFileName);
    });
  };

  return (
    <div className="exam-preview">
      <h1>Exams Preview</h1>
      <div className="exam-select">
        <div className="exam-detail">          
          <label>Exam No. :</label>
          <select id="preview-exam-no-select" className="wide-select" value={examCurrNo} onChange={handleExamNoChange}>
            {examNos.map((examNo) => (
                <option value={examNo}>{examNo}</option>
            ))}
          </select>
        </div>
        <div className='exam-compare'>
          <div className="exam-detail">          
            <label>Version No. :</label>
            <select id="preview-version" className="wide-select" onChange={handleVersionChange}>
              <option value=""></option>
              {versionList.map((version) => (
                  <option value={version}>v{version - versionCount}</option>
              ))}
            </select>
          </div>
          <div className="exam-detail">
            <label>Compare with:</label>
            <select id="preview-compare" className="wide-select" onChange={handleCompareChange}>
              <option value=""></option>
              {versionList.map((version) => (
                  <option value={version}>v{version - versionCount}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="exam-content">
        <div className="e-left-container"> {/* 左侧容器 */}
          <div className="e-left-content" ref={imgRef1}>
            {versionQuesList.map((versionQuesInfo) => (
                <div>
                  <img width="100px" height="100px" src={versionQuesInfo.picture} />
                  <div>{versionQuesInfo.questionType}, {versionQuesInfo.questionText}</div>
                  {versionQuesInfo.optionList.map((option) => (
                      <div>
                        <span>{option.order} {option.text}</span>
                      </div>
                  ))}
                </div>
            ))}
          </div>
          <div className="button-container">
            <button className="edit-button" onClick={handleLeftEditButton}>Edit</button>
            <button className="export-button" onClick={handleLeftExportButton}>Export</button>
            <button className="save-to-button" onClick={handleSaveToLeftButton}>Save to the original version</button>
          </div>
          
            
          
        </div>
        <div className="e-right-container"> {/* 右侧容器 */}
          <div className="e-right-content" ref={imgRef2}>
            {compareQuesList.map((versionQuesInfo) => (
                <div>
                  <img width="100px" height="100px" src={versionQuesInfo.picture} />
                  <div>{versionQuesInfo.questionType}, {versionQuesInfo.questionText}</div>
                  {versionQuesInfo.optionList.map((option) => (
                      <div>
                        <span>{option.order} {option.text}</span>
                      </div>
                  ))}
                </div>
            ))}
          </div>
          <div className="button-container">
            <button className="edit-button" onClick={handleRightEditButton}>Edit</button>
            <button className="export-button" onClick={handleRightExportButton}>Export</button>
            <button className="save-to-button" onClick={handleSaveToRightButton}>Save to the original version</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ExamPreview;
