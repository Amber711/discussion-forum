/**
 * Created by Amber on 5/15/17.
 */
import React from 'react';
import './QuestionList.css';
//import PropTypes from 'prop-types';

class QuestionListItem extends React.Component {





    render() {
        return (

                    <ul>
                        <li className="q-follow">
                            <i className="iconfont icon-wujiaoxingkong"></i>
                            <p>Follow {this.props.question.follow}</p>
                        </li>
                        <li className="q-title">
                            <span>{this.props.question.title}</span>
                            <p>{this.props.question.author} . {this.props.question.date} days ago</p>
                        </li>
                        <li className="q-reply">
                            <i className="iconfont icon-pinglun"></i>
                            <span>{this.props.question.replies}</span>
                        </li>
                    </ul>

        )
    }
}

/*QuestionListItem.contextTypes = {
    questionList: PropTypes.Array
}*/

export default QuestionListItem