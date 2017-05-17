var CourseLectureModel = require("../models/courseLectureModel");
lectures = [
  {
    courseId: "CS503",
    name: "503 全栈工程师直通车",
    lectureList: [
        {
            "title": "第一周 理论课",
            "videoId": "0",
            "url": "https://www.youtube.com/embed/0v1SGPpdJy8"
        },
        {
            "title": " 第一周 实战课",
            "videoId": "1",
            "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

        },
        {
            "title": " 第二周 CodeLab1",
            "videoId": "2",
            "url": "https://www.youtube.com/embed/0ZJWdca8j6g"

        },
        {
            "title": " 第二周 CodeLab2",
            "videoId": "3",
            "url": "https://www.youtube.com/embed/WK5lxpjQjSM"

        },
        {
            "title": " 第一周 实战课",
            "videoId": "4",
            "url": "https://www.youtube.com/embed/_j0L0uxXPIs"

        },

        {
            "title": " 第二周 CodeLab2",
            "videoId": "5",
            "url": "https://www.youtube.com/embed/Y9HK-6MimlU"

        },
        {
            "title": " 第二周 CodeLab2",
            "videoId": "6",
            "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

        },
        {
            "title": " 第一周 实战课",
            "videoId": "7",
            "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

        },
        {
            "title": " 第二周 CodeLab1",
            "videoId": "8",
            "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

        },
        {
            "title": " 第二周 CodeLab2",
            "videoId": "10",
            "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

        }
    ]}];

var getLectureListForCourse = function (courseId) {
  return new Promise((resolve,reject) => {
   resolve(lectures.find(lecture => lecture.courseId = courseId));
    // courseLectureModel.findOne({courseId: courseId}, function (err, lectureList) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(lectureList);
    //   }
    // });
  });
}

// var addUser = function (newUser) {
//   return new Promise((resolve,reject) => {
//     courseLectureModel.findOne({ email: newUser.email }, function (err, courseList) {
//       if (courseList) {
//         reject("user already exists");
//       } else {
//         courseLectureModel.count({}, function (err, num) {
//           newUser.userId = num + 1
//           var mongoUser = new ProfileCoursesModel(newUser);
//           mongoUser.save();
//           resolve(newUser);
//         });
//       }
//     });
//   })
// }

module.exports = {
  getLectureListForCourse: getLectureListForCourse,
  // addLecture: addLecture
}
