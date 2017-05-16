/**
 * Created by Amber on 5/16/17.
 */
import React from "react";
import './QuestionPage.css';
//import $ from 'jquery';

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {questionDetail: {}}
    }

    componentDidMount() {
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
            questionDetail: {
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
                                content: `I agree with your complaint. It is important to know the details of this because I believe I may be doing it wrong since I can't get the nearest neighbor search to work with my choice; even though the print I get for the circle10.txt matches the picture in the checklist. I need help too!`,

                            },
                            {
                                username: 'Albert',
                                date: '23 days ago',
                                upvote: 4,
                                content: `I am a bit confused as well.`
                            }
                        ]
                    }
                    ,

                    {
                        username: 'Stephen Chan',
                        email: '380914555@qq.com',
                        date: '2 months ago',
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
        })
    }


    render() {
        return (
            /*question from author*/
            <div className="container q-detail-wrapper">
                <div className="panel panel-default q-desc">
                    <ul className="panel-body row author-q-desc">

                        <li className="col-md-9 text-left">
                            <h3 className="question-title">Nearest Neighbour search</h3>

                            <p>I'm confused as to how to define the axis-aligned rectangle corresponding to the node. For each node inserted, it forms two rectangles (one above and one below, or one to the right and one to the left).

                                Which rectangle am I suppose to be thinking of when constructing the rectangle corresponding to the node?

                                Any help would be greatly appreciated.</p>
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
                    <li className="panel-body row">

                        <div className="col-md-1 reply-like">
                            <div className="agree pull-left text-center">
                                <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                                <p>26</p>

                            </div>
                        </div>


                        <div className="col-md-11">
                            <div className="reply-caption">
                                <span className="reply-name">Amber</span>&nbsp;&nbsp;
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

                        {/* secondary reply*/}
                        <ul className="panel-body row">
                            <li>
                                {/*<div className="col-md-1 reply-like">
                                    <div className="agree pull-left text-center">
                                        <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                                        <p>26</p>
                                    </div>
                                </div>*/}
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
                                {/*<div className="col-md-1 reply-like">
                                 <div className="agree pull-left text-center">
                                 <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                                 <p>26</p>
                                 </div>
                                 </div>*/}
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

                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}


export default QuestionPage