/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import "./Courses.css"
import { Link } from "react-router"

import courPic1 from "../../public/fullstack.jpeg"

class Courses extends React.Component {
    /*constructor(props, context) {
        super(props, context);
        //this.courseChosen=this.courseChosen.bind(this);
    };*/

   /* courseChosen() {
    this.context.replace('./lecture')
}*/


    render() {
        return (


                        <div className="livecourse-preview-content">
                            <div className="text-center">
                                <div>
                                    <div>
                                        <Link to={`/lecture/${this.props.course.courseId}/0`} title="LL002【免费】 “人工智能”架构篇公开课">
                                            <img src={courPic1} className="livecourse-img" alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="four">
                                <div>
                                    <a href="/livecourses/Qr9Xzmf6ZvAiKHiE4" title="LL002【免费】 “人工智能”架构篇公开课" className="livecourse-title noOverflow">{this.props.course.title}</a>
                                </div>

                                <div className="livecourse-tag-container">
                                    <br />
                                </div>



                                <div className="livecourse-description twoLineEllipsis">
                                    {this.props.course.desc}
                                </div>
                                <div className="livecourse-date-range">

                                    <a href="/livecourses/Qr9Xzmf6ZvAiKHiE4/subscribeToUpdates">Subscribe to className updates</a><br />


                                    <strong>Course:</strong>

                                </div>

                            </div>
                        </div>





        )
    }

}
export default Courses