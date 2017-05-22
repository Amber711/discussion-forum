var express = require("express");
var router = express.Router();
var courseService = require("../services/courseService");
var lectureService = require("../services/lectureService");
var discussionService = require("../services/discussionService");
var answerService = require("../services/answerService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();



// var lectureService = require("../services/lectureService");




router.get("/profile/:userId", function (req, res) {
  console.log( '.....------here ');
  var userId = req.params.userId;
  courseService.getCourseListForUser(userId)
    .then(courseList => res.json(courseList));
});


router.get("/lecture/:courseId/:videoId", function (req, res) {
    console.log('eeeeeeeeenter lecture/:courseId')
  var courseId = req.params.courseId;
  lectureService.getLectureListForCourse(courseId)
    .then(lecturePageList => res.json(lecturePageList));
});

router.get("/:courseId/question_list/:videoId", function (req, res) {
    console.log('.......')
    var courseId = req.params.courseId;
    var videoId = req.params.videoId;
    discussionService.getQuestionListForLecture(courseId, videoId)
        .then(discussion => res.json(discussion.questionList));
});

router.get("/:courseId/:videoId/question/:questionId", function (req, res) {
    var courseId = req.params.courseId;
    var videoId = req.params.videoId;
    var questionId = req.params.questionId;
    answerService.getAnswerListForQuestion(courseId, videoId, questionId)
        .then(answer => res.json(answer));
})

router.post("/:courseId/:videoId/new_discussion",jsonParser,function(req, res) {

    discussionService.addDiscussion(req.body)
        .then(function(str){
            res.status(200).send("successfully added a new discussion!")
        }, function(err){
            res.status(400).send("ops, failed to add a new discussion, try again!");

        })

});

router.post("/:courseId/:videoId/question/:questionId/new_answer", jsonParser, function (req, res) {
    answerService.addAnswer(req.body, req.params.courseId, req.params.videoId, req.params.questionId)
        .then(function (answer) {
            res.json(answer);
        }, function (error) {
            res.status(400).send("answer already exists!");
        });
});


/*
router.post("/lecture", jsonParser, function (req, res) {
  lectureService.addCourse(req.body)
    .then(function (lectureList) {
      res.json(lectureList);
    }, function (error) {
      res.status(400).send("user email already exists!");
    });
});
*/

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
