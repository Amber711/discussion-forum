var CourseLectureModel = require("../models/lecturePageLectureListModel");

var getLectureListForCourse = function (courseId) {
  return new Promise((resolve,reject) => {
  //  resolve(lectures.find(lecture => lecture.courseId = courseId));
    CourseLectureModel.findOne({courseId: courseId}, function (err, lectureObj) {
      if (err) {
        reject(err);
      } else {
        var lecturePageList = {name: lectureObj.name, lectureList: lectureObj.lectureList};
        console.log('---------------------------lectureObj', lecturePageList);

        resolve(lecturePageList);
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
