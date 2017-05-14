/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import './Lecture.css'
import LectureList from './LectureList'
import { Link } from 'react-router'

class LecturePage extends React.Component {
    constructor() {
        super();
        this.state ={lectures: null, classToSend: false}
    };

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
                        "videoId": "1",
                        "url": "https://www.youtube.com/embed/Rpc7rd8C2IA"
                    },
                    {
                        "title": " 第一周 实战课",
                        "videoId": "2",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab1",
                        "videoId": "3",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "4",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第一周 实战课",
                        "videoId": "2",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab1",
                        "videoId": "3",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "4",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "4",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第一周 实战课",
                        "videoId": "2",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab1",
                        "videoId": "3",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    },
                    {
                        "title": " 第二周 CodeLab2",
                        "videoId": "4",
                        "url": "https://www.youtube.com/embed/5EE0hoPaXsA"

                    }

                ]
            }


        })
    };





    renderLectures() {
        let lectures = this.state.lectures.lectureList.map(function(lecture) {
            return (
                <li className="list-group-item course-list-item">
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
                                <Link to="/lecture_video" className="colored-tab tab" onClick={this.handleClick}>
                                    Course
                                </Link>
                                <Link to="/question_list" className="colored-tab tab" onClick={this.handleClick}>
                                    Discussion
                                </Link>
                                <div className="flex-1 align-right align-self-center">
                                    <div className="rc-LandingPageSearchBox">
                                        <div className="search-bar">
                                            <div className="input-area">
                                                <input className="search-input search-course" placeholder="Search" value="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

 export default LecturePage
