/**
 * Created by Amber on 5/18/17.
 */

var mongoose = require("mongoose");

var DiscussionSchema = mongoose.Schema({
    courseId: String,
    videoId: Number,
    questionList: [{
        title: String,
        author: String,
        date: Number,
        follow: Number,
        replies: Number,
        id: Number
    }]
});
var discussionModel = mongoose.model("discussionModel", DiscussionSchema);

module.exports = discussionModel;
