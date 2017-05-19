/**
 * Created by Amber on 5/17/17.
 */

import React from 'react';
//import PropTypes from 'prop-types';
import QuestionPageSecondaryReply from './QuestionPageSecondaryReply'

class QuestionPageFirstLevelReply extends React.Component {
   constructor(props) {
        super(props);
        this.state={
            answers: this.props.answer,
            condition: false,
            heart: "glyphicon glyphicon-heart-empty",
            //follow: this.props.question.follow
        }

       this.followQuestion = this.followQuestion.bind(this);

   }



    followQuestion() {
        //console.log('~~~',event.target.className);
        this.setState({
            condition: !this.state.condition
        }, function(){
            if(this.state.condition) {
                this.setState({
                    heart: "glyphicon glyphicon-heart",
                    //follow: this.state.follow + 1
                });
            } else {
                this.setState({
                    heart: "glyphicon glyphicon-heart-empty",
                    //follow: this.state.follow - 1
                })

            }
        });



    }


    renderSecondaryReply() {
        console.log('~~~~~~~~',this.props.answer);
        console.log('-------', this.props.answer.reply);
        if(this.props.answer.reply) {
            let secondaryReply = this.props.answer.reply.map(answerItem => {
                return (
                    <li>
                        <QuestionPageSecondaryReply reply={answerItem} />
                    </li>
                )
            });

            return (
                <ul className="panel-body row">
                    {secondaryReply}
                </ul>
            )
        }

    }

    render() {
        if(this.props.answer) {
            return (
                <div>
                    <div className="col-md-1 reply-like">
                        <div className="agree pull-left text-center">
                            <span className={this.state.heart} aria-hidden="true" onClick={() => this.followQuestion()}></span>
                            <p>{this.props.answer.upvote}</p>
                        </div>
                    </div>
                    <div className="col-md-11">
                        <div className="reply-caption">
                            <span className="reply-name">{this.props.answer.username}</span>&nbsp;&nbsp;
                            <span className="reply-profile">{this.props.answer.mentor === 1? "Mentor":"Student"}</span>&nbsp;&nbsp;
                            <span className="reply-date">a month ago</span>
                        </div>
                        <p className="reply-content">
                            {this.props.answer.content}
                        </p>
                        <div className="action-area">
                            <div href="#">
                                <a>
                                    <i className="glyphicon glyphicon-thumbs-up"></i>
                                    &nbsp;&nbsp;{this.props.answer.upvote}
                                    <span>&nbsp;Upvote &nbsp;&nbsp;</span>
                                </a>
                                <a href="#" >Reply</a>
                            </div>
                        </div>
                    </div>
                    {/*reply input box*/}
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
                    {this.renderSecondaryReply()}

                </div>
            )
        }


    }
}



export default QuestionPageFirstLevelReply