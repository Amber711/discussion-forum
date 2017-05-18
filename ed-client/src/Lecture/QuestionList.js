/**
 * Created by Amber on 5/14/17.
 */
import React from "react";
import "./QuestionList.css"
import QuestionListItem from "./QuestionListItem";
import PropTypes from 'prop-types'
import { Link } from "react-router"

class QuestionList extends React.Component {

    constructor(props,context) {
        super(props,context);

        this.state = {
            videoKey: this.context.videoKey,
            questionList: []
        }

        this.getQuestionList = this.getQuestionList.bind(this);
        //this.questionClicked = this.questionClicked.bind(this)
    }

    componentDidMount() {
        this.getQuestionList()
    }


    getQuestionList() {
        let url = "http://localhost:4000/api/v1/"+this.props.params.courseId+"/question_list/"+this.state.videoKey;
        console.log(this.props.params.courseId);
        //console.log(video_key);

        let request = new Request(encodeURI(url), {
            method: "GET",
            cache: false
        });

        fetch(request)
            .then( res => res.json())
            .then(qList => {
                // clear the previous question list !!!!!!!!
                console.log('....qList', qList);
                // console.log(this.state.lectures.lectureList[this.context.videoKey].url);
                this.state.questionList.length = 0;
                console.log('------------------', this.state.questionList.length == 0)
                this.setState({
                    questionList: qList,
                    //videoUrl: this.state.lectures.lectureList[this.context.videoKey].url
                },function () {
                    //sync questionlist to lecture page

                    this.context.getQuestionListFromChild(this.state.questionList)
                })


            })

    }

    /*questionClicked(questionId) {

    }
*/
    renderQuestions() {
        //var questionList= {this.props.questionList}
        //console.log(this.context.questionList);
        console.log('~~~~~~~~~',this.state.questionList)
        //if(this.state.questionList !== []) {
        var question_list = this.state.questionList.map(question => {
            return (
                <Link to={`/${this.props.params.courseId}/${this.props.params.courseId}/question/${question.id}`} key={question.id} className="q-list-item">
                    <QuestionListItem question={question} courseId={this.props.params.courseId} videoId={this.props.params.videoId} />
                </Link>
            )
        });

        return (
            <li className="q-item">{question_list}</li>
        )
        //}

    }

    render() {
        return (
            <div className="q-list-wrapper">
                <div className="flex-1 align-right align-self-center">
                    <div className="rc-LandingPageSearchBox">
                        <div className="search-bar">
                            <div className="input-area">
                                <input className="search-input search-course" id="search-q" placeholder="Search" value="" />
                            </div>
                        </div>
                    </div>

                    <Link to={`/${this.props.params.courseId}/${this.props.params.videoId}/start_discussion`} className="btn btn-default start-q-btn" id="start-q">Start a discussion</Link>
                </div>

                <ul className="nav nav-pills filter-q" >
                    <li className="filter-item" role="presentation"><a href="#">Top</a></li>
                    <li className="filter-item" role="presentation"><a href="#">Recent</a></li>
                </ul>
                <div className="col-sm-12 q-wrapper">
                    <ul className="q-list" >

                        {this.renderQuestions()}

                    </ul>
                    <ul className="q-page">
                        <li className="bian"><a href="#"> <strong>&lt;</strong></a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">...</a></li>
                        <li><a href="#">7</a></li>
                        <li><a href="#">8</a></li>
                        <li><a href="#">9</a></li>
                        <li className="bian"><a href="#"><strong>&gt;</strong></a></li>
                    </ul>
                </div>

            </div>
        )
    }
}

QuestionList.contextTypes = {
    //questionList: PropTypes.array,
    videoKey: PropTypes.number,
    getQuestionListFromChild: PropTypes.func
}

export default QuestionList
