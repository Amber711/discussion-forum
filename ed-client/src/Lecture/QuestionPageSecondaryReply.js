/**
 * Created by Amber on 5/17/17.
 */
/**
 * Created by Amber on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types'


class QuestionPageSecondaryReply extends React.Component {





    render() {
        return (
            <div>

                <div className="col-md-11 secondary-reply">
                    <div className="reply-caption">
                        <span className="reply-name">{this.props.reply.username}</span>&nbsp;&nbsp;
                        <span className="reply-profile">{this.props.reply.mentor === 1? "Mentor":""}</span>&nbsp;&nbsp;
                        <span className="reply-date">{this.props.reply.date}</span>
                    </div>
                    <p className="reply-content">
                        {this.props.reply.content}
                    </p>
                    <div className="action-area">
                        <div href="#">
                            <a>
                                <i className="glyphicon glyphicon-thumbs-up"></i>
                                &nbsp;&nbsp;{this.props.reply.upvote}
                                <span>&nbsp;Upvote &nbsp;&nbsp;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

QuestionPageSecondaryReply.contextTypes = {
    answers: PropTypes.array
}

export default QuestionPageSecondaryReply