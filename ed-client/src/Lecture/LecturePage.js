/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import './Lecture.css'
import LectureList from './LectureList'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth'

class LecturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={lectures: null, questionList: [], classToSend: false,videoUrl: '', videoKey: 0};

        this.getQuestionListFromChild = this.getQuestionListFromChild.bind(this)
    }
    getChildContext() {
        return {videoUrl: this.state.videoUrl, videoKey: this.state.videoKey, getQuestionListFromChild: this.getQuestionListFromChild}
    }

    componentDidMount() {
        this.getLectureVideoList();
        //this.getInitialDiscussionList();

    }

    getQuestionListFromChild(questionList) {

        this.setState({questionList}, function () {

            console.log('........lecture page received quesitonList via QuestionList component:', this.state.questionList)
        })
    }

    //初始化video0的quesitonList当用户第一次进入lecturePage 页面时
    getLectureVideoList() {

        let courseId = this.props.params.courseId;
        let url = "http://localhost:4000/api/v1/lecture/"+courseId+"/0";
        let request = new Request(encodeURI(url), {
            method: 'GET',
            cache: false
        });


        fetch(request)
            .then(res => res.json())
            .then( lectures => {
                    console.log('lecture page lecture list~~~~~:', lectures);
                    console.log('lecture page----', lectures.lectureList);
                this.setState({
                    lectures: lectures,
                    videoUrl: lectures.lectureList[0].url
                })

            });


        /*  this.setState({
         lectures: {
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

         ]
         },

         questionList: [
         {
         title: "Multiple Nested Routes in react-router-dom v4",
         author: 'Nana',
         date: 3,
         follow: 10,
         replies: 4,
         id: 0

         },
         {
         title: "Sitecore:PredicateBuilder or Fast Query for retrieval",
         author: 'Tony',
         date: 2,
         follow: 35,
         replies: 6,
         id: 1

         },
         {
         title: "Android: Storage Options",
         author: 'Nana',
         date: 3,
         follow: 10,
         replies: 4,
         id: 2

         },
         {
         title: "Python Sklearn Linear Regression Value Error",
         author: 'Nana',
         date: 2,
         follow: 35,
         replies: 6,
         id: 3

         },
         {
         title: "Comparing Numerical Precision in SQL",
         author: 'Steve',
         date: 3,
         follow: 10,
         replies: 4,
         id: 4

         },
         {
         title: "Nested Find in JPA Insert Rethrows the Same Error",
         author: 'Joe',
         date: 2,
         follow: 35,
         replies: 6,
         id: 5

         },
         ],

         }, function(){   //-------------坑！！！-----------------------
         console.log(this.state.lectures == null);
         this.setState({
         videoUrl: this.state.lectures.lectureList[0].url

         });
         console.log(this.state.videoUrl);// 取不到值，setState() does not immediately mutate this.state but creates a pending state transition.
         //Accessing this.state after calling this method can potentially return the existing value.


         });*/



    };




    lectureClicked = (key) => {
        this.setState({
            videoKey: key

        },function(){
            this.setState({
                videoUrl: this.state.lectures.lectureList[this.state.videoKey].url
            })
            }/*, function() {
            let courseId = this.props.params.courseId;
            let url = "http://localhost:4000/api/v1/lecture/"+courseId+"/"+this.state.videoKey;
            let request = new Request(encodeURI(url), {
                method: 'GET',
                cache: false
            });


            fetch(request)
                .then(res => res.json())
                .then( lectures => {
                    console.log('lecture page lecture list~~~~~:', lectures);
                    console.log('lecture page----', lectures.lectureList);
                    this.setState({
                        lectures: lectures,
                        videoUrl: lectures.lectureList[].url
                    })

                });
        }*/
        );


       // both course id and video id in the request url
         //http://localhost:3000/courseId/:courseId/videoId/:videoId
/*
        let url = "http://localhost:4000/api/v1/"+this.props.params.courseId+"/question_list/"+video_key;
        console.log(this.props.params.courseId);
        console.log(video_key);

        let request = new Request(encodeURI(url), {
            method: "GET",
            cache: false
        });

        fetch(request)
            .then( res => res.json())
            .then(qList => {
                // clear the previous question list !!!!!!!!
                    console.log('....qList', qList);
                    console.log(this.state.lectures.lectureList[key].url);
                    this.setState({
                    questionList: qList,
                    videoUrl: this.state.lectures.lectureList[key].url

                    })
            })

*/


       /* this.setState({
            questionList: [
                {
                    title: "Multiple Nested Routes in react-router-dom v4",
                    author: 'Lisa',
                    date: 3,
                    follow: 10,
                    replies: 4,
                    id: 0

                },
                {
                    title: "Sitecore:PredicateBuilder or Fast Query for retrieval",
                    author: 'Tony',
                    date: 2,
                    follow: 35,
                    replies: 6,
                    id: 1

                },
                {
                    title: "Android: Storage Options",
                    author: 'Elva',
                    date: 3,
                    follow: 10,
                    replies: 4,
                    id: 2

                },
                {
                    title: "Python Sklearn Linear Regression Value Error",
                    author: 'Lily',
                    date: 2,
                    follow: 35,
                    replies: 6,
                    id: 3

                },
                {
                    title: "Comparing Numerical Precision in SQL",
                    author: 'Steve',
                    date: 3,
                    follow: 10,
                    replies: 4,
                    id: 4

                },
                {
                    title: "Nested Find in JPA Insert Rethrows the Same Error",
                    author: 'Joe',
                    date: 2,
                    follow: 35,
                    replies: 6,
                    id: 5

                },
            ],
            videoUrl: this.state.lectures.lectureList[key].url
        })*/
    }


    renderLectures() {

            let lectures = this.state.lectures.lectureList.map(lecture => {
                return (
                    <li className="list-group-item course-list-item" key={lecture.videoId} onClick={() => this.lectureClicked(lecture.videoId)}>
                        <LectureList lecture={lecture} videoId={lecture.videoId} courseId={this.props.params.courseId}/>
                    </li>
                )
            });
            return (
                <ul className="list-group">
                    {lectures}
                </ul>
            )


    }


    render() {
        if(this.state.lectures) {
            return (
                <div className="lecturePage">
                    <div className="row">
                        <div className="col-sm-3 course-summary-list">

                            <div className="list-group">
                                <div className="list-group-item course-list-item search-wrapper" id="book-search-input" role="search">
                                    <input type="text" placeholder="Type to search" className="search-course"/>
                                </div>
                                <li className="list-group-item course-list-item course-title">
                                    {this.state.lectures.name}
                                </li>
                                <li href="#" className="list-group-item course-list-item summary-text">
                                    Course Summary
                                </li>
                                {this.renderLectures()}
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <ul className="tabs tabs-divider horizontal-box">
                                <Link to={`/lecture/${this.props.params.courseId}/${this.props.params.videoId}`} className="colored-tab tab">
                                    Lecture
                                </Link>
                                <Link to={`/${this.props.params.courseId}/discussion/${this.props.params.videoId}`} className="colored-tab tab">
                                    Discussion
                                </Link>

                            </ul>

                                {this.props.children}


                        </div>
                    </div>

                </div>

            )
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }
    }




}

LecturePage.childContextTypes = {
    //questionList: PropTypes.array,
    videoUrl: PropTypes.string,
    videoKey: PropTypes.number,
    getQuestionListFromChild: PropTypes.func
    //lectures: PropTypes.object
}

 export default LecturePage
