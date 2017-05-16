/**
 * Created by Amber on 5/16/17.
 */
import React from "react";
import './QuestionPage.css';
//import $ from 'jquery';

class QuestionPage extends React.Component {

    componentDidMount() {
        //this.getSummerNote()
        this.getQuestion();

    }

    getQuestion() {
        /*
        let url = "http://localhost:3000/"+this.props.params.courseId+"/"+this.props.params.videoId+"/"+"question/"+this.props.params.questionId;
        let request = new Request(encodeURI(url), {
            method: "GET",
            cache: false
        });
        fetch(request)
            .then(res => res.json())*/
        this.setState({})
    }


    render() {
        return (
            <div className="container q-detail-wrapper">
                <div className="panel panel-default q-desc">
                    <ul className="panel-body row author-q-desc">

                        <li className="col-md-9 text-left">
                            <p>What is a minimum viable product?</p>
                            <span aria-hidden="true"> Lily Asked 3 hours ago</span>
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

                <ul className="nav nav-pills filter-qs" >
                    <li className="filter-items" role="presentation"><a href="#">Top</a></li>
                    <li className="filter-items" role="presentation"><a href="#">Recent</a></li>
                </ul>

                <ul className="panel panel-default reply-list">
                    <li className="panel-body row">
                        <div className="col-md-1">
                            <div className="agree pull-left text-center">
                                <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                                <p>26</p>

                            </div>
                        </div>
                        <div className="col-md-11">
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
                                    <a href="#" >Reply</a>
                                </div>

                            </div>
                        </div>
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
                    </li>

                </ul>
            </div>
        )
    }
}


export default QuestionPage