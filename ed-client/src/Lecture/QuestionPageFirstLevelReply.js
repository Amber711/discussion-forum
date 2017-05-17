/**
 * Created by Amber on 5/17/17.
 */

import React from 'react';
//import PropTypes from 'prop-types';
import QuestionPageSecondaryReply from './QuestionPageSecondaryReply'

class QuestionPageFirstLevelReply extends React.Component {
   constructor(props) {
        super(props);
        this.state={answers: this.props.answer}
    }
    /*
    componentWillMount() {
        this.setState({
            answers: this.props.answer
        })
    }*/

    renderSecondaryReply() {
        console.log('-------', this.props.answer.reply);
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

    render() {
        if(this.props.answer) {
            return (
                <div>
                    <div className="col-md-1 reply-like">
                        <div className="agree pull-left text-center">
                            <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                            <p>{this.props.answer.upvote}</p>
                        </div>
                    </div>
                    <div className="col-md-11">
                        <div className="reply-caption">
                            <span className="reply-name">{this.props.answer.username}</span>&nbsp;&nbsp;
                            <span className="reply-profile">{this.props.answer.mentor === 1? "Mentor":""}</span>&nbsp;&nbsp;
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
                    {/* secondary reply*/}

                    {/*<ul className="panel-body row">
                     <li>
                     /!*<div className="col-md-1 reply-like">
                     <div className="agree pull-left text-center">
                     <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                     <p>26</p>
                     </div>
                     </div>*!/
                     <div className="col-md-11 secondary-reply">
                     <div className="reply-caption">
                     <span className="reply-name">Christian Cleber</span>&nbsp;&nbsp;
                     <span className="reply-profile">Mentor</span>&nbsp;&nbsp;
                     <span className="reply-date">a month ago</span>
                     </div>
                     <p className="reply-content">
                     A minimum viable product has just those core features sufficient to deploy the product,
                     and no more. Developers typically deploy the product to a subset of possible customersâ€”such
                     as early adopters thought to be more forgiving, more likely to give feedback, and able to
                     grasp a product vision from an early prototype or marketing information. This strategy
                     targets avoiding building products that customers do not want and seeks to maximize
                     information about the customer per dollar spent. `The minimum viable product is that
                     version of a new product a team uses to collect the maximum amount of validated learning
                     about customers with the least effort.
                     </p>
                     <div className="action-area">
                     <div href="#">
                     <a>
                     <i className="glyphicon glyphicon-thumbs-up"></i>
                     &nbsp;&nbsp;1
                     <span>&nbsp;Upvote &nbsp;&nbsp;</span>
                     </a>
                     </div>
                     </div>
                     </div>
                     </li>
                     <li>
                     /!*<div className="col-md-1 reply-like">
                     <div className="agree pull-left text-center">
                     <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                     <p>26</p>
                     </div>
                     </div>*!/
                     <div className="col-md-11 secondary-reply">
                     <div className="reply-caption">
                     <span className="reply-name">Christian Cleber</span>&nbsp;&nbsp;
                     <span className="reply-profile">Mentor</span>&nbsp;&nbsp;
                     <span className="reply-date">a month ago</span>
                     </div>
                     <p className="reply-content">
                     A minimum viable product has just those core features sufficient to deploy the product,
                     and no more. Developers typically deploy the product to a subset of possible customersâ€”such
                     as early adopters thought to be more forgiving, more likely to give feedback, and able to
                     grasp a product vision from an early prototype or marketing information. This strategy
                     targets avoiding building products that customers do not want and seeks to maximize
                     information about the customer per dollar spent. `The minimum viable product is that
                     version of a new product a team uses to collect the maximum amount of validated learning
                     about customers with the least effort.
                     </p>
                     <div className="action-area">
                     <div href="#">
                     <a>
                     <i className="glyphicon glyphicon-thumbs-up"></i>
                     &nbsp;&nbsp;1
                     <span>&nbsp;Upvote &nbsp;&nbsp;</span>
                     </a>
                     </div>
                     </div>
                     </div>
                     </li>
                     </ul>*/}
                </div>
            )
        }


    }
}



export default QuestionPageFirstLevelReply