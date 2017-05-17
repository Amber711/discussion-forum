var express = require("express");
var router = express.Router();
var courseService = require("../services/courseService");
var lectureService = require("../services/lectureService");

// var lectureService = require("../services/lectureService");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/profile/:userId", function (req, res) {
  var userId = req.params.userId;
  courseService.getCourseListForUser(+userId)
    .then(courseList => res.json(courseList.courseList));
});

router.post("/profile", jsonParser, function (req, res) {
  courseService.addUser(req.body)
    .then(function (courseList) {
      res.json(courseList);
    }, function (error) {
      res.status(400).send("user email already exists!");
    });
});

router.get("/lecture/:courseId", function (req, res) {
  var courseId = req.params.courseId;
  lectureService.getLectureListForCourse(courseId)
    .then(lectures => res.json(lectures.lectureList));
});

router.post("/lecture", jsonParser, function (req, res) {
  lectureService.addCourse(req.body)
    .then(function (lectureList) {
      res.json(lectureList);
    }, function (error) {
      res.status(400).send("user email already exists!");
    });
});

// router.post('/build_and_run', jsonParser, function(req, res) {
//   const userCode = req.body.user_code;
//   const lang = req.body.lang;
//   console.log(lang + ': ' + userCode);
//   // Send build and run request to executor.
//   rest_client.methods.build_and_run(
//       {data: { code: userCode, lang: lang },
//        headers: { "Content-Type": "application/json" }
//       }, (data, response) => {
//     console.log('Recieved response from execution server: ');
//     console.log(response);
//     // Generate a human readable response displayed in output textarea.
//     const text =`Build output: ${data['build']}
//     Execute output: ${data['run']}`;
//
//     data['text'] = text;
//     res.json(data);
//   });
// });

module.exports = router;
