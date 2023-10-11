import { useLocation, useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { fetchCourseList, fetchQuestionList, editQuestion, deleteQuestion, createQuestion, uploadImage } from '../../api';
import userStore from '../../store/user';
import './index.css';

function EditQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseNumber = searchParams.get('courseNumber');
  const courseId = searchParams.get('courseId');
  const questionNumber = searchParams.get('questionNumber');
  const tagListRef = useRef();
  const [inputTag, setInputTag] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [courseList, setCourseList] = useState([]); 
  const [questionList, setQuestionList] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState([]); 
  const [selectedImageName, setSelectedImageName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseListData = await fetchCourseList();
        setCourseList(courseListData?.data || []);
        setSelectedCourse((courseListData?.data || []).find((item) => item.number === courseNumber));

        if(questionNumber){
          const questionListData = await fetchQuestionList({
            params: {
              courseId: courseListData?.data?.[0]?.id
            }
          });
          setQuestionList(questionListData?.data || []);
          const _selectedQuestion = (questionListData?.data || []).find((item) => item.question_number === questionNumber);
          _selectedQuestion.tags = JSON.parse(_selectedQuestion.tags || []);
          const originalDate = dayjs(_selectedQuestion.modified_time);
          const formattedDate = originalDate.format('DD/MMM/YYYY').toLowerCase();
          _selectedQuestion.modified_time = formattedDate;
          setSelectedQuestion(_selectedQuestion);
        }else {
          setSelectedQuestion({
            "courses_id": courseId,
            "question_name": "",
            "question_number": "",
            "question_status": "Ready",
            "create_time": Date.now(),
            "modified_time": dayjs(Date.now()).format('DD/MMM/YYYY').toLowerCase(),
            "author": "John Doe",
            "modified_author": "John Doe",
            "grade": 1,
            "comment": "No comments",
            "tags": [

            ],
            "time_estimate": 10,
            "picture": "",
            "questions": [
                {
                    "questionText": "Question Title",
                    "questionType": "SingleChoice",
                    "optionList": [
                        {
                            "order": "A",
                            "text": "Option A"
                        },
                        {
                            "order": "B",
                            "text": "Option B"
                        },
                        {
                          "order": "C",
                          "text": "Option C"
                        },
                        {
                          "order": "D",
                          "text": "Option D"
                        },
                    ]
                }
            ],
            "types": [
                "SingleChoice"
            ]
        });
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseNumber, questionNumber]);

  const handleConfirmClick = async () => {
    if(questionNumber) {
      const res = await editQuestion({
        ...selectedQuestion,
        modified_time: new Date(),
        modified_author: `${userStore?.userInfo?.first_name}${userStore?.userInfo?.last_name}`
      });
      if(res.data.isSuccess){
        navigate('/question/view');
      }
    }else {
      if(!selectedQuestion.question_name || !selectedQuestion.question_number){
        alert('question name or number is empty, can not create question!')
        return;
      }
      const res = await createQuestion({
        ...selectedQuestion,
        modified_time: new Date(),
        modified_author: `${userStore?.userInfo?.first_name}${userStore?.userInfo?.last_name}`,
        author: `${userStore?.userInfo?.first_name}${userStore?.userInfo?.last_name}`,
      });
      if(res.data.isSuccess){
        navigate('/question/view');
      }
    }

  };

  const handleDelete = async () => {
    const res = await deleteQuestion(selectedQuestion);
    if(res.data.isSuccess){
      navigate('/question/view');
    }
  };

  const handleAddTag = () => {
    if(inputTag){
      setSelectedQuestion({
        ...selectedQuestion,
        tags: selectedQuestion.tags.concat(inputTag)
      })
      setInputTag('')
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const idx = selectedQuestion.tags.findIndex((item) => item === tagToRemove)
    if(idx > -1){
      const newTags = [...selectedQuestion.tags];
      newTags.splice(idx, 1);
      setSelectedQuestion({
        ...selectedQuestion,
        tags: newTags
      })
    }
  };

  const onTagTipClick = (e) => {
    const tagValue = e.target.innerHTML;
    if(e.target !== tagListRef.current && tagValue && !selectedQuestion.tags.includes(tagValue)) {
      setSelectedQuestion({
        ...selectedQuestion,
        tags: selectedQuestion.tags.concat(tagValue)
      })
    }
    changeTagTipsVisible(false)
  }

  const changeTagTipsVisible = (isVisible) => {
    setIsDropdownVisible(isVisible);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(!file){
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    const res = await uploadImage(formData);
    setSelectedImageName(file.name);
    setSelectedQuestion({
      ...selectedQuestion,
      picture: res.data.url
    })
  };

  const onChangeSelectTypes = (e, questionIdx) => {
    let optionList = [...(selectedQuestion?.questions[questionIdx]?.optionList || [])];
    if(e.target.value === 'True-False') {
      optionList = optionList.slice(0, 2);
    }
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item, qIdx) => {
        if(qIdx !== questionIdx){
          return {
            ...item
          }
        }else {
          return {
            ...item,
            questionType: e.target.value,
            optionList
          }
        }
      })
    })
  }
  
  const onChangeTimeEstimate = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      time_estimate: Number(e.target.value)
    })
  }

  const onChangeQuestionText = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item) => {
        return {
          ...item,
          questionText: e.target.value
        }
      })
    })
  }

  const onChangeOptionOrder = (e, questionIdx, optionIdx) => {
    const optionList = [...(selectedQuestion?.questions[questionIdx]?.optionList || [])];
    optionList[optionIdx].order = e.target.value;
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item, qIdx) => {
        if(qIdx !== questionIdx){
          return {
            ...item
          }
        }else {
          return {
            ...item,
            optionList
          }
        }
      })
    })
  }

  const onChangeOptionText = (e, questionIdx, optionIdx) => {
    const optionList = [...(selectedQuestion?.questions[questionIdx]?.optionList || [])];
    optionList[optionIdx].text = e.target.value;
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item, qIdx) => {
        if(qIdx !== questionIdx){
          return {
            ...item
          }
        }else {
          return {
            ...item,
            optionList
          }
        }
      })
    })
  }
  

  const handleRemoveOption = (questionIdx, optionIdx) => {
    const optionList = [...(selectedQuestion?.questions[questionIdx]?.optionList || [])];
    optionList.splice(optionIdx, 1);
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item, qIdx) => {
        if(qIdx !== questionIdx){
          return {
            ...item
          }
        }else {
          return {
            ...item,
            optionList
          }
        }
      })
    })
  }


  const addOption = (questionIdx) => {
    const optionList = [...(selectedQuestion?.questions[questionIdx]?.optionList || [])];
    optionList.push({
       order: '',
       text: ''
    })
    setSelectedQuestion({
      ...selectedQuestion,
      questions: (selectedQuestion.questions || []).map((item, qIdx) => {
        if(qIdx !== questionIdx){
          return {
            ...item
          }
        }else {
          return {
            ...item,
            optionList
          }
        }
      })
    })
  }

  const onChangeQuestionStatus = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      question_status: e.target.value
    })
  }
 
  const onChangeQuestionName = (e, questionIdx) => {
    setSelectedQuestion({
      ...selectedQuestion,
      question_name: e.target.value
    })
  }

  const onChangeQuestionNumber = (e, questionIdx) => {
    setSelectedQuestion({
      ...selectedQuestion,
      question_number: e.target.value
    })
  }

  const onChangeGrade = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      grade: e.target.value
    })
  }

  const onChangeQuestionComment = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      comment: e.target.value
    })
  }

  const handleQuestionNoChange = (e) => {
    let tmp = {};
    for (let i in selectedQuestion) {
      tmp[i] = selectedQuestion[i];
    }
    tmp["question_id"] = e.target.value;
    setSelectedQuestion(tmp);
  }

  return (
    <div className="edit-question">
      {/* Top Section */}
      <div className="top-section-EQ">
        <div className="top-row">
          <label><h3>Course No.</h3></label>
          <select value={selectedCourse}>
            {
                courseList.map((courseItem) => {
                  return (<option value={courseItem.id} key={courseItem.id}>{courseItem.number}</option>)
                })
            }
          </select>
        </div>
       { questionNumber ? (
         <div className="top-row">
         <label><h3>Question No.</h3></label>
         <select value={selectedQuestion.question_id} onChange={handleQuestionNoChange}>
         {
             questionList.map((questiuonItem) => {
               return (<option value={questiuonItem.question_id} key={questiuonItem.question_id}>{questiuonItem.question_number}</option>)
             })
         }
         </select>
         <button onClick={handleDelete} className="delete-button">Delete this question</button>
       </div>
       ) : (
        <div className="top-row">
            <div>
              <span>Question Name: </span>
              <input value={selectedQuestion.question_name} onChange={onChangeQuestionName}></input>
            </div>

            <div>
              <span>Question Number: </span>
              <input value={selectedQuestion.question_number} onChange={onChangeQuestionNumber}></input>
            </div>

            <div>
              <span>Question Status: </span>
              <select className='select-types' value={selectedQuestion.question_status} onChange={(e) => onChangeQuestionStatus(e)}>
                <option value="Ready">Ready</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <span>Question Comment: </span>
              <input value={selectedQuestion.comment} onChange={onChangeQuestionComment}></input>
            </div>
        </div>
       ) }

      </div>


      {/* Middle Section */}
        <div className="middle-section-EQ">
          <div className="left-section-EQ">
            <div className="section-title">Details</div>
            <div className="section-item">
              <span>Grades:</span>
              <select className='select-grades' value={selectedQuestion.grade} onChange={onChangeGrade}>
                {
                  [1,2,3,4,5].map((item) => {
                    return <option value={item} key={item}>{item}</option>
                  })
                }
              </select>
            </div>
            <div className="section-item">
              <span>General tags:</span>
              <div className="tag-input-container">
                <div className="tag-container">
                  {(selectedQuestion?.tags || []).map((tag) => (
                    <div key={tag} className="tag">
                      {tag}
                      <button
                        className="remove-tag"
                        onClick={() => handleRemoveTag(tag)}
                      >×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="add-tag-container">
                  <div>
                    <input
                      type="text"
                      className="input"
                      placeholder="custom tag"
                      value={inputTag}
                      onChange={(e) => setInputTag(e.target.value)}
                      onFocus={() => changeTagTipsVisible(true)}
                    />
                    <button className="add-tag" onClick={handleAddTag}>
                      +
                    </button>
                  </div>
                  {isDropdownVisible && (
                    <div className="dropdown">
                        <div className="tag-list" onClick={onTagTipClick} ref={tagListRef}>
                          <div>HTML</div>
                          <div>CSS</div>
                          <div>JS</div>
                          <div>Others</div>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="section-item">
              <span>Time estimate:</span>
              <select className='select-minutes' value={selectedQuestion.time_estimate} onChange={onChangeTimeEstimate}>
              {
                [1,2,3,4,5,6,7,8,9,10].map((item) => {
                  return <option value={item} key={item}>{item}</option>
                })
              }
              </select>
              <div className='question-minutes'>Minutes</div>
            </div>
            <div className="section-item">
              <span>Picture:</span>
              <div className='question-image-container'>
              <label htmlFor="image-upload" className='image-upload-label'>
                {selectedQuestion.picture ? 'click to change a image' : 'please click to select image'}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedQuestion.picture && <img src={selectedQuestion.picture} className='question-image'/>}
              <div>{selectedImageName}</div>
              </div>
            </div>
            {

                (selectedQuestion.questions || []).map((question, questionIdx) => {
                  return (
                    <div key={question.groupId}>
                        <div className="section-item">
                          <span>Question text:</span>
                          <input type="text" className="input-box question-text-input" value={question.questionText} onChange={onChangeQuestionText}/>
                        </div>
                        <div className="section-item">
                          <span>Usage:</span>
                          <div className='question-type-container'>
                            <div>
                              <select className='select-types' value={question.questionType} onChange={(e) => onChangeSelectTypes(e, questionIdx)}>
                                <option value="SingleChoice">SingleChoice</option>
                                <option value="MultiChoice">MultiChoice</option>
                                <option value="True-False">True-False</option>
                              </select>
                              <button className="add-tag" onClick={() => addOption(questionIdx)}>
                                +
                              </button>
                            </div>
                            <div className='option-list'>
                              {
                                (question.optionList || []).map((option, optionIdx) => {
                                  return (
                                    <div key={option.order + optionIdx}>
                                      <label>
                                        <input type={question.questionType === 'MultiChoice' ? 'checkbox' : 'radio'} name="gender" value="male"/> 
                                        <div><input value={option.order} className='option-input-order' onChange={(e) => onChangeOptionOrder(e, questionIdx, optionIdx)}/></div>
                                        <div><input value={option.text} className='option-input-text' onChange={(e) => onChangeOptionText(e, questionIdx, optionIdx)}/></div>
                                        <button
                                          className="remove-option"
                                          onClick={() => handleRemoveOption(questionIdx, optionIdx)}
                                        >×
                                        </button>
                                      </label>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                    </div>
                  )
                })
            }
            <div className="section-item">
              <span>Modified by:</span>
              <input value={selectedQuestion.modified_author} disabled></input>
            </div>
            <div className="section-item">
              <span>Modified Date:</span>
              <input value={selectedQuestion.modified_time} disabled></input>
            </div>
          </div>
          <div className="right-section-EQ">
            <div className="section-title">Preview</div>
            <div>
              {
                  (selectedQuestion.questions || []).map((question) => {
                    return(
                      <div key={question.groupId}>
                        <div>{question.questionText}</div>
                        <img src={selectedQuestion.picture} className='question-preview-image'/>
                        <div className='option-list option-list-preview'>
                              {
                                (question.optionList || []).map((option, idx) => {
                                  return (
                                    <div key={option.order + idx}>
                                      <label>
                                        <input type={question.questionType === 'MultiChoice' ? 'checkbox' : 'radio'} name="gender" value="male"/> 
                                        <div>{option.order}</div>
                                        <div>{option.text}</div>
                                      </label>
                                    </div>
                                  )
                                })
                              }
                            </div>
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>

      <div className="navigation-buttons">
        
        <button className="confirm-button" onClick={handleConfirmClick}>{questionNumber ? 'Confirm Changes' : 'Create Question'}</button>
        
      </div>
    </div>
  );
}

export default EditQuestion;
