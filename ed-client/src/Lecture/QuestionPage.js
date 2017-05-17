/**
 * Created by Amber on 5/16/17.
 */
import React from "react";
import './QuestionPage.css';
import QuestionFirstLevelReply from './QuestionPageFirstLevelReply'
import PropTypes from 'prop-types'

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {questionDetail: {}}
    }

    getChildContext() {
        return {answers: this.state.questionDetail.answers}
    }

    componentWillMount() {
        //this.getSummerNote()
        this.getQuestionDetail();

    }

    getQuestionDetail() {
        /*
        //page and url before redirect: question_list page; http://localhost:3000/CS503/question_list/0 => courseId/question_list/videoId
        //url at questinDetail page: http://localhost:3000/CS503/0/question/0  courseId videoId questionId

        let url = "http://localhost:3000/"+this.props.params.courseId+"/"+this.props.params.videoId+"/"+"question/"+this.props.params.questionId;
        let request = new Request(encodeURI(url), {
            method: "GET",
            cache: false
        });
        fetch(request)
            .then(res => res.json())*/
        this.setState({
            questionDetail:
                {
                id: 0,
                title: "Confused on constructing RectHV for given Node",
                date: "2 months ago",
                author: "J.D. DeVaughn-Brown",
                content: `I'm confused as to how to define the axis-aligned rectangle corresponding to the node. For each node inserted, it forms two rectangles (one above and one below, or one to the right and one to the left).
                        
                        Which rectangle am I suppose to be thinking of when constructing the rectangle corresponding to the node?
                        
                        Any help would be greatly appreciated.`,
                answers: [
                    {
                        username: 'christian cleber masdeval braz',
                        email: '380914555@qq.com',
                        date: '2 months ago',
                        mentor: 1,
                        upvote: 10,
                        content:`The above strategy works.
                                I'm not a huge fan of having to pass 7 variables (the query point, the current node, the orientation, and the 4 points of the rectangle) in to my recursive function so if anyone came up with something cleaner I'd love to hear it.
                                I could create a RectHV object and use that in my recursive function, but since RectHV is an immutable type, I'd have to create a new object every time I wanted to update it. That seems like a waste of memory.
                                Any other strategies I would love to hear about.
                                `,
                        reply: [
                            {
                                username: 'Linsey',
                                date: '1 month ago',
                                upvote: 2,
                                mentor: 1,
                                content: `I agree with your complaint. It is important to know the details of this because I believe I may be doing it wrong since I can't get the nearest neighbor search to work with my choice; even though the print I get for the circle10.txt matches the picture in the checklist. I need help too!`,

                            },
                            {
                                username: 'Albert',
                                date: '23 days ago',
                                upvote: 4,
                                mentor: 0,
                                content: `I am a bit confused as well.`
                            }
                        ]
                    }
                    ,

                    {
                        username: 'Stephen Chan',
                        email: '380914555@qq.com',
                        date: '2 months ago',
                        mentor: 0,
                        upvote: 10,
                        content:`The above strategy works.
                                I'm not a huge fan of having to pass 7 variables (the query point, the current node, the orientation, and the 4 points of the rectangle) in to my recursive function so if anyone came up with something cleaner I'd love to hear it.
                                I could create a RectHV object and use that in my recursive function, but since RectHV is an immutable type, I'd have to create a new object every time I wanted to update it. That seems like a waste of memory.
                                Any other strategies I would love to hear about.
                                `,
                        reply: []
                    }
                ]



            }
        }, function () {
            console.log(this.state.questionDetail)
        })
    }

    renderReply() {
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
    answers: PropTypes.array
}

export default QuestionPage