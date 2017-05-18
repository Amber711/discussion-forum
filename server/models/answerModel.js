/**
 * Created by Amber on 5/18/17.
 */
var mongoose = require("mongoose");

var AnswerSchema = mongoose.Schema({
    courseId: String,
    videoId: Number,
    questionId: Number,
    title: String,
    date: String,
    author: String,
    content: String,
    answers: [
        {
            username: String,
            email: String,
            date: String,
            mentor: Number,
            upvote: Number,
            content: String,
            reply:[{
                username: String,
                date: String,
                mentor: Number,
                upvote: Number,
                content: String
            }]
        }
    ]
});
var answerModel = mongoose.model("answerModel", AnswerSchema);

module.exports = answerModel;