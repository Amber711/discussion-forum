/**
 * Created by Amber on 5/18/17.
 */
var DiscussionModel = require("../models/discussionModel");

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

        }
        //DiscussionModel.findOne({ courseId: newDiscussion.courseId, videoId: newDiscussion.videoId},
        console.log('adding new question///////////////////////')
        DiscussionModel.update({courseId: newDiscussion.courseId, videoId: newDiscussion.videoId},{$push: {questionList: questionListItem}}, {upsert:true}, function(err){
            if(err) {
                reject(err)
            }else {
                resolve('Successfully added')
            }
        });

        /*
        let questionDetailItem = {

        }*/
           /* function (err, discussion) {
                if (discussion) {
                    reject("discussion already exists");
                } else {
                    var mongoDiscussion = new DiscussionModel(newDiscussion);
                    mongoDiscussion.save();
                    resolve(newDiscussion);
                }*/
            });
    }


module.exports = {
    getQuestionListForLecture: getQuestionListForLecture,
    addDiscussion: addDiscussion
}
