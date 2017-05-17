var mongoose = require("mongoose");

var ProfileCoursesSchema = mongoose.Schema({
  userId: Number,
  email: String,
  courseList: [{
    courseId: String,
    title: String,
    desc: String,
    free_lec: String,
    duration: String
  }]
});
var profileCoursesModel = mongoose.model("profileCoursesModel", ProfileCoursesSchema);

module.exports = profileCoursesModel;
