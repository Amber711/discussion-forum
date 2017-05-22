/**
 * Created by Amber on 5/18/17.
 */
var DiscussionModel = require("../models/discussionModel");
var AnswerModel = require("../models/answerModel");


var getQuestionListForLecture = function (courseId, videoId) {
    return new Promise((resolve,reject) => {
        DiscussionModel.findOne({courseId: courseId, videoId: videoId}, function (err, discussion) {
            if (err) {
                reject(err);
            } else {
                resolve(discussion);
            }
        });
    });
}

var addDiscussion = function (newDiscussion) {
    return new Promise((resolve,reject) => {

        let questionListItem = {
            "title" : newDiscussion.title,
            "author": newDiscussion.author,
            "date" : 0,
            "follow": 0,
            "replies": 0,
            "id": newDiscussion.id

        };

        //DiscussionModel.findOne({ courseId: newDiscussion.courseId, videoId: newDiscussion.videoId},
        console.log('adding new question///////////////////////')
        DiscussionModel.update({courseId: newDiscussion.courseId, videoId: newDiscussion.videoId},{$push: {questionList: questionListItem}}, {upsert:true}, function(err){
            if(err) {


                reject(err)
            }else {

                let answerItem = {
                    "courseId": newDiscussion.courseId,
                    "videoId": newDiscussion.videoId,
                    "questionId": newDiscussion.id,
                    "title": newDiscussion.title,
                    "date" : " 0 day ago",
                    "author": newDiscussion.author,
                    "content": newDiscussion.content,
                    "answers": []

                };
                var newAnswer = new AnswerModel(answerItem);
                newAnswer.save();
                resolve('Successfully added');


            }
        });

            });
    }


module.exports = {
    getQuestionListForLecture: getQuestionListForLecture,
    addDiscussion: addDiscussion
}
