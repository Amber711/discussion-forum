/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import "./Courses.css"
import courPic1 from "../../public/fullstack.jpeg"
import { Link } from "react-router"

class Courses extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.courseChosen=this.courseChosen.bind(this);
    };

    courseChosen() {
    this.context.replace('./lecture')
}


    render() {
        return (
            <div className="container mainContainer">
                <div className="one"></div>
                <h1 className="two">Upcoming Live Courses</h1>
                <hr className="three" />
                <div className="row">

                    <div className="col-md-4 col-sm-6 col-xs-12 livecourse-preview-container">
                        <div className="livecourse-preview-content">
                            <div className="text-center">
                                <div onClick={this.courseChosen}>
                                    <div>
                                        <Link to="/lecture" title="LL002【免费】 “人工智能”架构篇公开课">
                                            <img src={courPic1} className="livecourse-img" alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="four">
                                <div>
                                    <a href="/livecourses/Qr9Xzmf6ZvAiKHiE4" title="LL002【免费】 “人工智能”架构篇公开课" className="livecourse-title noOverflow">LL002【免费】 “人工智能”架构篇公开课</a>
                                </div>

                                <div className="livecourse-tag-container">
                                    <br />
                                </div>



                                <div className="livecourse-description twoLineEllipsis">
                                    BitTiger的终身学习免费公开课来了！跟随硅谷趋势，把握大数据架构趋势！
                                </div>
                                <div className="livecourse-date-range">

                                    <a href="/livecourses/Qr9Xzmf6ZvAiKHiE4/subscribeToUpdates">Subscribe to className updates</a><br />


                                    <strong>Course:</strong>

                                </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div>
        )
    }

}export default Courses