/**
 * Created by Amber on 5/14/17.
 */
import React from "react";
import "./QuestionList.css"
import QuestionListItem from "./QuestionListItem";
import PropTypes from 'prop-types'

class QuestionList extends React.Component {
    /*constructor(props) {
        super(props); //当父组建是用 this.props.children来代表所有子组建时，子组建无法用props获得父组建的state/props数据，需要通过context.
        this.state = {
            questionList: props.questionList
        }

    }*/
    renderQuestions() {
        //var questionList= {this.props.questionList}
        //console.log(this.context.questionList);
        if(this.context.questionList) {
            var question_list = this.context.questionList.map(question => {
                return (
                    <a href="#">
                        <QuestionListItem question={question}/>
                    </a>
                )
            });

            return (
                <li className="q-item">{question_list}</li>
            )
        }

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

                    <button className="btn btn-primary" id="start-q">Start a discussion</button>
                </div>

                <ul className="nav nav-pills filter-q" >
                    <li className="filter-item" role="presentation"><a href="#">Top</a></li>
                    <li className="filter-item" role="presentation"><a href="#">Recent</a></li>
                </ul>
                <div className="col-sm-12 q-wrapper">
                    <ul className="q-list" >
                        {this.renderQuestions()}

                        {/*<li className="q-item">
                            <a href="#">
                                <ul>
                                    <li className="q-follow">
                                        <i className="iconfont icon-wujiaoxingman"></i>
                                        <p>Follow 25</p>
                                    </li>
                                    <li className="q-title">
                                        <span>How To Excel In A Technical Job Interview</span>
                                        <p>Lisa . 2 days age</p>
                                    </li>
                                    <li className="q-reply">
                                        <i className="iconfont icon-pinglun"></i>
                                        <span>15</span>
                                    </li>
                                </ul>
                            </a>
                        </li>*/}

                        {/*<li className="q-item">
                            <a href="#">
                                <ul>
                                    <li className="q-follow">
                                        <i className="iconfont icon-wujiaoxingkong"></i>
                                        <p>Follow 25</p>
                                    </li>
                                    <li className="q-title">
                                        <span>How To Excel In A Technical Job Interview</span>
                                        <p>Lisa . 2 days age</p>
                                    </li>
                                    <li className="q-reply">
                                        <i className="iconfont icon-pinglun"></i>
                                        <span>15</span>
                                    </li>
                                </ul>
                            </a>
                        </li>*/}

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
    questionList: PropTypes.array
}

export default QuestionList
