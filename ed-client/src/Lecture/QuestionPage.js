/**
 * Created by Amber on 5/16/17.
 */
import React from "react";
import './QuestionPage.css';
import QuestionFirstLevelReply from './QuestionPageFirstLevelReply';
import Auth from '../Auth/Auth';
import PropTypes from 'prop-types';
import {Link} from 'react-router'

class QuestionPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            questionDetail: {},
            questionDesc: {},
            condition: false,
            star: "iconfont icon-star-hollow follow-in-desc",
            // follow: this.props.question.follow
            answerContent: '',
            replyContent: ''
        };

        this.followQuestion = this.followQuestion.bind(this);
        this.getAnswerText = this.getAnswerText.bind(this);
        this.addNewAnswer = this.addNewAnswer.bind(this);
        //this.getReply = this.getReply.bind(this)
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

    followQuestion() {
        //console.log('~~~',event.target.className);
        console.log('-----enter follow question func')
        this.setState({
            condition: !this.state.condition
        }, function(){
            if(this.state.condition) {
                this.setState({
                    star: "iconfont icon-star-filled follow-in-desc",
                    //follow: this.state.follow + 1
                });
            } else {
                this.setState({
                    star: "iconfont icon-star-hollow",
                    //follow: this.state.follow - 1
                })

            }
        });



    }

    getAnswerText(event) {
        var val = event.target.value;
        this.setState({
            answerContent:val
        }, function() {
            console.log(this.state.answerContent)
        })

    }

    /*getReply(event) {
        var val = event.target.value;
        this.setState({
            replyContent: val
        })
    }*/

    addNewAnswer() {
        console.log('**** adding new answer');
        var courseId = this.props.params.courseId;
        var videoId = this.props.params.videoId;
        var questionId = this.props.params.questionId;
        var email =Auth.getEmail();
        var url = "http://localhost:4000/api/v1/"+courseId+"/"+videoId+"/question/"+questionId+"/new_answer";
        if(this.state.answerContent !== '') {
            var qD = this.state.questionDetail;
            fetch(url,{
                method: 'POST',
                cache: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: this.state.answerContent,
                    email: email,
                    answerId: qD.answers.length + 1
                })
            }).then(response => {
                if(response.status === 200) {

                    qD.answers.push({
                        username: email,
                        email: email,
                        date: '0 day ago',
                        mentor: 0,
                        upvote : 0,
                        content: this.state.answerContent,
                        //answerId: qD.answers.length + 1
                    });

                    this.setState({
                        questionDetail: qD
                    })
                }
            })

        }


    };

    /*addNewReply() {
        var courseId = this.props.params.courseId;
        var videoId = this.props.params.videoId;
        var questionId = this.props.params.questionId;
        var email =Auth.getEmail();
        var url = "http://localhost:4000/api/v1/"+courseId+"/"+videoId+"/"+questionId+"/new_reply";
        if(this.state.replyContent !== '') {
            fetch(url,{
                method: 'POST',
                cache: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: this.state.replyContent,
                    email: email
                })
            }).then(response => {
                if(response.status === 200) {
                    var qD = this.state.questionDetail;
                    qD.answers.push({
                        username: email,
                        email: email,
                        date: '0 day ago',
                        mentor: 0,
                        upvote : 0,
                        content: this.state.replyContent
                    });

                    this.setState({
                        questionDetail: qD
                    });
                   // var url = '/' + this.props.params.courseId +"/"+this.props.params.videoId+ "/"+"question/"+questionId;
                    //this.context.router.replace(url)
                }
            })

        }
    }*/

    renderReply() {
        if(this.state.questionDetail.answers){
            console.log('!!!!!!!!!!!',this.state.questionDetail);
            console.log('!!!!!!!!!!!!!',this.state.questionDetail.answers);
            let firstLevelReplies = this.state.questionDetail.answers.map(answer => {
                return (
                    <li className="panel-body row" key={answer.answerId}>
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
                    <div className="panel panel-default q-desc b-grey">
                        <ul className="panel-body row author-q-desc">

                            <li className="col-md-9 text-left">
                                <h3 className="question-title">{this.state.questionDetail.title}</h3>

                                <p>{this.state.questionDetail.content}</p>
                                <span aria-hidden="true" className="author-box"> {this.state.questionDetail.author}&nbsp;&nbsp;Asked&nbsp;&nbsp;{this.state.questionDetail.date}&nbsp;&nbsp;</span>
                            </li>
                            <li className="col-md-2 pull-right text-center">
                                <a href="#" className="click-to-follow">
                                    Follow
                                    <span className={this.state.star} onClick={() => this.followQuestion()}></span>

                                </a>
                                <a href="#answer" className="click-to-follow">
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
                    <ul className="panel panel-default reply-list b-grey">

                        {this.renderReply()}

                    </ul>
                    <div className="comment-input panel-body row">
                        <span className="profile-area">FM</span>
                        <div className="reply-box">
                                <textarea className="edit-container"  id="answer" onChange={(event) => this.getAnswerText(event)}>
                                </textarea>
                            <div className="reply-button-container">
                                <Link className="reply-button" onClick={() => this.addNewAnswer()}>Reply</Link>
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
    //router: PropTypes.object.isRequired,
    answers: PropTypes.array
};

export default QuestionPage