var mongoose = require("mongoose");

var CourseLectureSchema = mongoose.Schema({
  courseId: String,
  name:String,
  lectureList: [{
    title: String,
    vedioId: Number,
    url: String
  }]
});
var courseLectureModel = mongoose.model("courseLectureModel", CourseLectureSchema);

module.exports = courseLectureModel;
