/**
 * Created by Amber on 5/14/17.
 */
import React from "react";
import "./questionList.css"

class QuestionList extends React.Component {


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
                        <li className="q-item">
                            <a href="#">
                                <ul>
                                    <li className="q-follow">yoyo</li>
                                    <li className="q-title">ku</li>
                                    <li className="q-reply">lala</li>
                                </ul>
                            </a>
                        </li>
                    </ul>
                </div>
                
            </div>
        )
    }
}


export default QuestionList
