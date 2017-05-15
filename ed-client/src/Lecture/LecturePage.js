/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import './Lecture.css'
import LectureList from './LectureList'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class LecturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={lectures: null, questionList: [], videoUrl: '',classToSend: false};
        //this.lectureClicked = this.lectureClicked.bind(this)
    }
    getChildContext() {
        return {questionList: this.state.questionList, videoUrl: this.state.videoUrl}
    }

    componentDidMount() {
        this.getLectureVideoList();
    }



    handleClick() {
        this.setState({ classToSend: !this.state.classToSend})
    }

    getLectureVideoList() {
        /*
        this.props.params.courseId
        let url = "http://localhost:3000/lecture/userId/"+Auth.getEmail();
        let request = new Request(encodeURI(url), {
            method: 'GET',
            cache: false
        });
        fetch(request)
            .then(res)*/
        this.setState({
            lectures: {
                name: "503 全栈工程师直通车",
                lectureList: [
                    {
                        "title": "第一周 理论课",
                        "videoId": "0",
                        "url": "https://www.youtube.com/embed/Rpc7rd8C2IA"
                    },
                    {
                        "title": " 第一周 实战课",
                        "videoId": "1",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab1",
                        "videoId": "2",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "3",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第一周 实战课",
                        "videoId": "4",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },

                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "5",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

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
            /*videoUrl: this.state.lectures.lectureList[0].url*/


        });
        if(this.state.lectures !== null) {
            this.setState({
                videoUrl: this.state.lectures.lectureList[0].url

            })
        }
    };


    lectureClicked = (key) => {
        //var video_key = e.target.key;
        //console.log(video_key)
        /*
       // both course id and video id in the request url
        //let url = "http://localhost:3000/courseId/"+this.props.params.courseId+"videoId/"+video_key;
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
                if(this.state.questionList !== [] ){
                    this.state.questionList.length = 0;

                    })
                    this.setState({
                    questionList: qList
                }
            });*/
        console.log(key);
        this.setState({
            questionList: [
                {
                    title: "Multiple Nested Routes in react-router-dom v4",
                    author: 'Lisa',
                    date: 3,
                    follow: 10,
                    replies: 4

                },
                {
                    title: "Sitecore:PredicateBuilder or Fast Query for retrieval",
                    author: 'Tony',
                    date: 2,
                    follow: 35,
                    replies: 6

                },
                {
                    title: "Android: Storage Options",
                    author: 'Elva',
                    date: 3,
                    follow: 10,
                    replies: 4

                },
                {
                    title: "Python Sklearn Linear Regression Value Error",
                    author: 'Lily',
                    date: 2,
                    follow: 35,
                    replies: 6

                },
                {
                    title: "Comparing Numerical Precision in SQL",
                    author: 'Steve',
                    date: 3,
                    follow: 10,
                    replies: 4

                },
                {
                    title: "Nested Find in JPA Insert Rethrows the Same Error",
                    author: 'Joe',
                    date: 2,
                    follow: 35,
                    replies: 6

                },
            ],
            videoUrl: this.state.lectures.lectureList[key].url
        })
    }


    renderLectures() {

            let lectures = this.state.lectures.lectureList.map(lecture => {
                return (
                    <li className="list-group-item course-list-item" key={lecture.videoId} onClick={() => this.lectureClicked(lecture.videoId)}>
                        <LectureList lecture={lecture}/>
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
                                <Link to={"/"+this.props.params.courseId+"/lecture_video"} className="colored-tab tab" onClick={this.handleClick}>
                                    Course
                                </Link>
                                <Link to={"/"+this.props.params.courseId+"/question_list"} className="colored-tab tab" onClick={this.handleClick}>
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
    questionList: PropTypes.array,
    videoUrl: PropTypes.string
}

 export default LecturePage
