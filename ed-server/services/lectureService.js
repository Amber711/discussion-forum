var CourseLectureModel = require("../models/courseLectureModel");

var getLectureListForCourse = function (courseId) {
  return new Promise((resolve,reject) => {
  //  resolve(lectures.find(lecture => lecture.courseId = courseId));
    CourseLectureModel.findOne({courseId: courseId}, function (err, lectureList) {
      if (err) {
        reject(err);
      } else {
        resolve(lectureList);
      }
    });
  });
}

var addCourse = function (newCourse) {
  return new Promise((resolve,reject) => {
    CourseLectureModel.findOne({ courseId: newCourse.courseId }, function (err, course) {
      if (course) {
        reject("course already exists");
      } else {
          var mongoCourse = new CourseLectureModel(newCourse);
          mongoCourse.save();
          resolve(newCourse);
      }
    });
  })
}

module.exports = {
  getLectureListForCourse: getLectureListForCourse,
  addCourse: addCourse
}
