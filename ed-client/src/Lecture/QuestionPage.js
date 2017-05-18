/**
 * Created by Amber on 5/16/17.
 */
import React from "react";
import './QuestionPage.css';
import QuestionFirstLevelReply from './QuestionPageFirstLevelReply'
import PropTypes from 'prop-types'

class QuestionPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {questionDetail: {},questionDesc: {}}
    }

    getChildContext() {
        return {answers: this.state.questionDetail.answers}
    }

    componentWillMount() {

        this.getQuestionDetail();

    }

    getQuestionDetail() {

        console.log('...here I come')
        let url = "http://localhost:4000/api/v1/"+this.props.params.courseId+"/"+this.props.params.videoId+"/question/"+this.props.params.questionId;
        let request = new Request(encodeURI(url), {
            method: "GET",
            cache: false
        });

        fetch(request)
            .then(res => res.json())
            .then(questionDetail => {
                console.log('----------questionDetail including answers and replies', questionDetail)
                this.setState({
                    questionDetail:questionDetail
                }, function () {
                    console.log('-----------',this.state.questionDetail.answers)
                })
            })




    }

    renderReply() {
        if(this.state.questionDetail.answers){
            let firstLevelReplies = this.state.questionDetail.answers.map(answer => {
                return (
                    <li className="panel-body row">
                        <QuestionFirstLevelReply answer={answer} />
                    </li>
                )
            });

            return (
                <div>
                    {firstLevelReplies}
                </div>
            )
        }

    }



    render() {
        if(this.state.questionDetail){
            return (
                /*question from author*/

                <div className="container q-detail-wrapper">
                    <div className="panel panel-default q-desc">
                        <ul className="panel-body row author-q-desc">

                            <li className="col-md-9 text-left">
                                <h3 className="question-title">{this.state.questionDetail.title}</h3>

                                <p>{this.state.questionDetail.content}</p>
                                <span aria-hidden="true" className="author-box"> {this.state.questionDetail.author}&nbsp;&nbsp;Asked&nbsp;&nbsp;{this.state.questionDetail.date}&nbsp;&nbsp;</span>
                            </li>
                            <li className="col-md-2 pull-right text-center">
                                <a href="#" className="click-to-follow">
                                    Follow
                                    <span className="glyphicon glyphicon-star-empty follow-icon" aria-hidden="true"></span>

                                </a>
                                <a href="#" className="click-to-follow">
                                    Answer
                                    <span className="glyphicon glyphicon-edit pull-right answer-icon" aria-hidden="true"></span>

                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* filter bar */}
                    <ul className="nav nav-pills filter-qs" >
                        <li className="filter-items" role="presentation"><a href="#">Top</a></li>
                        <li className="filter-items" role="presentation"><a href="#">Recent</a></li>
                    </ul>


                    {/*reply detail*/}
                    <ul className="panel panel-default reply-list">

                        {this.renderReply()}

                    </ul>
                    <div className="comment-input panel-body row">
                        <span className="profile-area">FM</span>
                        <div className="reply-box">
                                <textarea className="edit-container">
                                </textarea>
                            <div id="summernote"></div>
                            <div className="reply-button-container">
                                <div className="flex-1-reply-button"></div>
                                <button className="reply-button">Reply</button>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

    }
}

QuestionPage.childContextTypes = {
    //questionList: PropTypes.array,
    answers: PropTypes.array
};

export default QuestionPage