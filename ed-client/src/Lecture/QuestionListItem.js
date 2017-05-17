/**
 * Created by Amber on 5/15/17.
 */
import React from 'react';
import './QuestionList.css';
//import ReactDOM from 'react-dom'
//import PropTypes from 'prop-types';

class QuestionListItem extends React.Component {


    constructor(props) {
        super(props); //当父组建是用 this.props.children来代表所有子组建时，子组建无法用props获得父组建的state/props数据，需要通过context.
        this.state = {
            condition: false
        }

        this.followQuestion = this.followQuestion.bind(this);
    }



    followQuestion(event) {
        console.log(this.state.condition);
        console.log('---',event.target);
        //console.log('~~~',event.target.className);
        this.setState({
            condition: !this.state.condition
        })
            console.log('after click:', this.state.condition);
            if(!this.state.condition) {
                console.log(event.target.className)
                event.target.className = "iconfont icon-star-hollow"
            } else {
                event.target.className = "iconfont icon-star-filled"

            }


    }

    /*followQuestion() {
        this.setState({
            condition: !this.state.condition
        }, function () {
            var node = ReactDOM.findDOMNode(this.refs.el);
            if(!this.state.condition) {
                node.classList.toggle('iconfont icon-icon-star-hollow');
            } else {
                node.classList.toggle('iconfont icon-icon-star-filled');

            }

        })
    }*/

    render() {
        return (

                    <ul>
                        <li className="q-follow">
                            <i className="iconfont icon-star-hollow" onClick={() => this.followQuestion(event)}></i>
                            <p>Follow {this.props.question.follow}</p>
                        </li>
                        <li className="q-title">
                            <span>{this.props.question.title}</span>
                            <p>{this.props.question.author} . {this.props.question.date} days ago</p>
                        </li>
                        <li className="q-reply">
                            <i className="iconfont icon-pinglun"></i>
                            <span>&nbsp;&nbsp;{this.props.question.replies}</span>
                        </li>
                    </ul>

        )
    }
}

/*QuestionListItem.contextTypes = {
    questionList: PropTypes.Array
}*/

export default QuestionListItem