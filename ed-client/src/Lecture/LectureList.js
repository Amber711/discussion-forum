/**
 * Created by Amber on 5/9/17.
 */


import React from "react";
import "./Lecture.css";
import { Link } from "react-router";

class LectureList extends React.Component {


    render() {
        return (
            <Link to={`/lecture/${this.props.courseId}/${this.props.videoId}`} className="course-item">{this.props.lecture.title}</Link>
        )
    }
}


export default LectureList
