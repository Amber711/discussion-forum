/**
 * Created by Amber on 5/15/17.
 */
import React from 'react';
import './QuestionList.css';
import { Link } from 'react-router';
//import ReactDOM from 'react-dom'
//import PropTypes from 'prop-types';

class QuestionListItem extends React.Component {


    constructor(props) {
        super(props); //当父组建是用 this.props.children来代表所有子组建时，子组建无法用props获得父组建的state/props数据，需要通过context.
        this.state = {
            condition: false,
            star: "iconfont icon-star-hollow",
            follow: this.props.question.follow
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
                    star: "iconfont icon-star-filled",
                    follow: this.state.follow + 1
                });
            } else {
                this.setState({
                    star: "iconfont icon-star-hollow",
                    follow: this.state.follow - 1
                })

            }
        });



    }




    render() {
        return (

                    <div>
                        <div className="q-follow">
                            <i className={this.state.star} onClick={() => this.followQuestion()}></i>
                            <p>Follow {this.state.follow}</p>
                        </div>
                        <Link to={`/${this.props.courseId}/${this.props.videoId}/question/${this.props.question.id}`} className="q-clicked">
                            <div className="q-title">
                                <span>{this.props.question.title}</span>
                                <p>{this.props.question.author} . {this.props.question.date} days ago</p>
                            </div>
                            <div className="q-reply">
                                <i className="iconfont icon-pinglun"></i>
                                <span>&nbsp;&nbsp;{this.props.question.replies}</span>
                            </div>
                        </Link>

                    </div>

        )
    }
}

/*QuestionListItem.contextTypes = {
    questionList: PropTypes.Array
}*/

export default QuestionListItem