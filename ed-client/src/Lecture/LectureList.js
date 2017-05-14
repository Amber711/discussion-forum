/**
 * Created by Amber on 5/9/17.
 */


import React from "react";
import "./Lecture.css"

class LectureList extends React.Component {


    render() {
        return (
            <a href="#" className="course-item">{this.props.lecture.title}</a>
        )
    }
}


export default LectureList
