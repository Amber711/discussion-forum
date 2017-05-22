/**
 * Created by Amber on 5/18/17.
 */
var AnswerModel = require("../models/answerModel");

var getAnswerListForQuestion = function (courseId, videoId, questionId) {
    return new Promise((resolve,reject) => {
        AnswerModel.findOne({courseId: courseId, videoId: videoId, questionId: questionId}, function (err, answers) {
            if (err) {
                reject(err);
            } else {
                console.log('----get answer detail', answers)
                resolve(answers);
            }
        });
    });
};

var addQuestionDetail = function (newQuestionDetail) {
    return new Promise((resolve,reject) => {
        AnswerModel.findOne({ courseId: newQuestionDetail.courseId, videoId: newQuestionDetail.videoId,
                questionId: newQuestionDetail.questionId},
            function (err, discussion) {
                if (discussion) {
                    reject("discussion already exists");
                } else {
                    var mongoQuestionDetail = new AnswerModel(newQuestionDetail);
                    mongoQuestionDetail.save();
                    resolve(newQuestionDetail);
                }
            });
    })
};


var addAnswer = function (newAnswer, courseId, videoId, questionId) {
    return new Promise((resolve, reject) => {
            let answerItem = {
                "username": newAnswer.email,
                "email": newAnswer.email,
                "date": 0,
                "mentor": 0,
                "upvote": 0,
                "content": newAnswer.content,
                "answerId" : newAnswer.answerId,
                "reply":[]
            };
            AnswerModel.update({courseId: courseId, videoId: videoId,
                questionId: questionId}, {$push: {
                answers: answerItem}}, {upsert: true}, function(err){
                if(err) {
                    reject(err)
                } else {
                    resolve(answerItem);
                }
            })
        }
    )};


module.exports = {
    getAnswerListForQuestion: getAnswerListForQuestion,
    addQuestionDetail: addQuestionDetail,
    addAnswer: addAnswer
}