var express = require('express');
var router = express.Router();
const multer = require('multer');
const { Op } = require("sequelize");

// 设置存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定保存图片的目录
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // 生成保存图片的文件名
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 创建multer实例
const upload = multer({ storage: storage });

// 处理文件上传的路由
router.post('/uploadImage', upload.single('image'), function (req, res, next) {
  // 获取保存图片的路径
  const imagePath = req.file.filename;
  res.send({ 
    url: `http://localhost:3001/uploads/${imagePath}`
  });
});



router.get('/questionList', async function(req, res, next) {
  const courseId = req.query.courseId;
  const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
  try {
    const questionList = await questionModel.findAll({
        where: {
          courses_id: courseId
        }
    });
    const resList = [];
    for (let i = 0; i < questionList.length; i++) {
        const questionsMap = {};
        const questionItem = questionList[i] || {};
        const { question_id } = questionItem || {};
        const options = await questionOptionsModel.findAll(({
            where: {
                question_id
            }
        }))
        const types = Array.from(new Set((options || []).map((item) => item.question_type)))
        for (let i = 0; i < (options || []).length; i++) {
            const { id, group_id, question_text, question_type, options_order, option_text } = (options || [])[i];
            if(!questionsMap[group_id]){
                questionsMap[group_id] = {};
                questionsMap[group_id].groupId = group_id;
                questionsMap[group_id].questionText = question_text;
                questionsMap[group_id].questionType = question_type;
                questionsMap[group_id].optionList = [];
            }
            questionsMap[group_id].optionList.push({
                id,
                order: options_order,
                text: option_text
            })
        }
        resList.push({
            ...(questionItem.dataValues || {}),
            questions: Object.values(questionsMap),
            types,
        })
    }
    res.send(JSON.stringify(resList));
  } catch (error) {
    console.error('Error retrieving questionList:', error);
    throw error;
  }
});

router.get('/searchQuestions', async function(req, res, next) {
    const courseId = req.query.courseId;
    const quesType = req.query.questionType;
    const tags = req.query.tags;
    const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
    try {
        let questionModelWhere = {courses_id: courseId};
        if (tags && tags !== "All") {
            questionModelWhere["tags"] = {
                [Op.like]: '%'+tags+'%'
            }
        }
        const questionList = await questionModel.findAll({
            where: questionModelWhere
        });
        const resList = [];
        for (let i = 0; i < questionList.length; i++) {
            const questionsMap = {};
            const questionItem = questionList[i] || {};
            const { question_id } = questionItem || {};
            const options = await questionOptionsModel.findAll(({
                where: {
                    question_id
                }
            }))
            const types = Array.from(new Set((options || []).map((item) => item.question_type)))
            let isContinue = true;
            if (quesType === "All") {
                isContinue = false;
            } else {
                for (let i = 0;i<types.length;i++) {
                    if (types[i] === quesType) {
                        isContinue = false;
                        break;
                    }
                }
            }
            if (isContinue) {
                continue;
            }
            for (let i = 0; i < (options || []).length; i++) {
                const { id, group_id, question_text, question_type, options_order, option_text } = (options || [])[i];
                if(!questionsMap[group_id]){
                    questionsMap[group_id] = {};
                    questionsMap[group_id].groupId = group_id;
                    questionsMap[group_id].questionText = question_text;
                    questionsMap[group_id].questionType = question_type;
                    questionsMap[group_id].optionList = [];
                }
                questionsMap[group_id].optionList.push({
                    id,
                    order: options_order,
                    text: option_text
                })
            }
            resList.push({
                ...(questionItem.dataValues || {}),
                questions: Object.values(questionsMap),
                types,
            })
        }
        res.send(JSON.stringify(resList));
    } catch (error) {
        console.error('Error retrieving questionList:', error);
        throw error;
    }
});

router.get('/getQuestionByNo', async function(req, res, next) {
    const quesNo = req.query.quesNo;
    const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
    try {
        const question = await questionModel.findOne({
            where: {
                question_number: quesNo,
            }
        });
        const questionsMap = {};
        const question_id = question.question_id;
        const options = await questionOptionsModel.findAll(({
            where: {
                question_id
            }
        }));
        for (let i = 0; i < (options || []).length; i++) {
            const { id, group_id, question_text, question_type, options_order, option_text } = (options || [])[i];
            if(!questionsMap[group_id]){
                questionsMap[group_id] = {};
                questionsMap[group_id].groupId = group_id;
                questionsMap[group_id].questionText = question_text;
                questionsMap[group_id].questionType = question_type;
                questionsMap[group_id].picture = question.picture;
                questionsMap[group_id].optionList = [];
            }
            questionsMap[group_id].optionList.push({
                id,
                order: options_order,
                text: option_text
            })
        }
        res.send(JSON.stringify(Object.values(questionsMap)));
    } catch (error) {
        console.error('Error retrieving questionList:', error);
        throw error;
    }
});


router.post('/editQuestion', async function(req, res, next) {
    const { question_id, modified_time, modified_author, grade, tags, time_estimate, picture, questions } = req.body;
    const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
    try {
        await questionModel.update({ 
            modified_time,
            modified_author,
            grade,
            tags: JSON.stringify(tags),
            time_estimate,
            picture,
         }, {
            where: {
                question_id
            }
        });
        for (let i = 0; i < questions.length; i++) {
            const { groupId, questionText, questionType, optionList = [] } = questions[i];
            const originQuestionOptions = await questionOptionsModel.findAll({
                where: {
                    group_id: groupId
                }
            })
            for (let j = 0; j < originQuestionOptions.length; j++) {
                const originQuestionOption = originQuestionOptions[j];
                const findIdx = optionList.findIndex((item) => item.id && item.id === originQuestionOption.id);
                if(findIdx === -1){
                    await questionOptionsModel.destroy({
                        where: {
                            group_id: groupId,
                            id: originQuestionOption.id
                        }
                    })
                }
            }
            for (let k = 0; k < optionList.length; k++) {
                const newOption = optionList[k];
                if(newOption.id){
                    await questionOptionsModel.update({
                        question_text: questionText,
                        question_type: questionType,
                        options_order: newOption.order,
                        option_text: newOption.text,
                    }, {
                        where: {
                            id: newOption.id,
                            question_id,
                            group_id: groupId,
                        }
                    })
                }else {
                    await questionOptionsModel.create({
                        question_id,
                        group_id: groupId,
                        question_text: questionText,
                        question_type: questionType,
                        options_order: newOption.order,
                        option_text: newOption.text,
                    }) 
                }
            }
        }
        res.send({ isSuccess: true })
    } catch (error) {
      console.error('Error retrieving questionList:', error);
      res.send({ isSuccess: false })
      throw error;
    }
  });


  router.post('/createQuestion', async function(req, res, next) {
    const { question_name, question_number, question_status, courses_id, create_time, modified_time, author, modified_author, grade, comment, tags, time_estimate, picture, questions } = req.body;
    const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
    try {
        function generateRandomNumber() {
            let randomNumber = '';
            for (let i = 0; i < 8; i++) {
              randomNumber += Math.floor(Math.random() * 10);
            }
            return randomNumber;
          }
          
        const question_id = generateRandomNumber();
        await questionModel.create({
            question_id,
            question_name,
            question_number,
            question_status,
            courses_id,
            create_time,
            modified_time,
            author, 
            modified_author, 
            grade, 
            comment, 
            tags: JSON.stringify(tags), 
            time_estimate, 
            picture
        })
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const groupId = generateRandomNumber();
            const { questionText, questionType, optionList = []} = question;
            for (let j = 0; j < optionList.length; j++) {
                await questionOptionsModel.create({
                    question_id,
                    group_id: groupId,
                    question_text: questionText,
                    options_order: optionList[j].order,
                    option_text: optionList[j].text,
                    question_type: questionType
                })
            }
        }
        res.send({ isSuccess: true })
    } catch (error) {
        console.error('Error create question:', error);
        res.send({ isSuccess: false })
        throw error;
    }
})


router.post('/deleteQuestion', async function(req, res, next) {
    const { question_id, questions } = req.body;
    const { question: questionModel, question_options: questionOptionsModel } = req.options.models;
    try {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const { groupId,  optionList = [] } = question;
            for (let j = 0; j < optionList.length; j++) {
                await questionOptionsModel.destroy({
                    where: {
                        group_id: groupId,
                        id: optionList[j].id
                    }
                })
            }

            await questionModel.destroy({
                where: {
                    question_id
                }
            })
        }
        res.send({ isSuccess: true })
    } catch (error) {
        console.error('Error delete question:', error);
        res.send({ isSuccess: false })
        throw error;
    }
})



module.exports = router;
