/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import "./Courses.css"
import Courses from './Courses'

class CourseList extends React.Component {
    constructor() {
        super();
        this.state = {courses:[]}
    }

    componentDidMount() {
        this.loadUserCourses();
    };

    loadUserCourses() {

        /*let userId = Auth.getEmail();
        let url = "http://localhost:3000/profile/"+userId;
        let request = new Request(encodeURI(url), {
            method: 'GET',
           /!* headers: {
                'Authorization': 'bearer ' + Auth.getToken(),
            },*!/
            cache: false
        });

        fetch(request)
            .then(res => res.json())
            .then( courses => {
                // ignore the possibility when user haven't subscribed to or bought any courses.
                this.setState({
                    courses: courses
            })*/
        this.setState({
            courses: [
                {
                    courseId:"CS503",
                    title: "CS503 全栈工程师直通车【第三期】",
                    desc: "提到Full Stack Engineer，你会想到什么？ 薪水高，缺口大，能力强？现在大大小小的公司的都倾向于招聘Full Stack Engineer。并且即使是职位名称未包含Full Stack字样，主流IT公司的软件工程师招聘仍然是希望工程师具有全栈的经历与视野。面对这样的市场形势，对于正在求职路上或者是想要跳槽的程序员来说，我们需要如何准备，如何应战？",
                    free_lec: "Jun 11th, 10:00 am",
                    duration: "6/17/2017 to 8/20/2017"
                },
                {
                    courseId:"LL001",
                    title: "LL002【免费】 “人工智能”架构篇公开课",
                    desc:"BitTiger的终身学习免费公开课来了！跟随硅谷趋势，把握大数据架构趋势！" ,
                    free_lec: "Jun 11th, 10:00 am",
                    duration: "6/17/2017 to 8/20/2017"
                },
                {
                    courseId:"CS504",
                    title: "CS504 后端工程师直通车（第二期）",
                    desc:"BitTiger推出的后端工程师直通车项目旨在帮助学员在三个月的时间内从内而外全面提升能力，快速达到市场上对Back-end Engineer的招聘需求。" ,
                    free_lec: "Jun 11th, 10:00 am",
                    duration: "6/17/2017 to 8/20/2017"
                }

            ]
        })
    }

    renderCourses() {
        var course_list = this.state.courses.map(function(course) {
            return (
                <div className="col-md-4 col-sm-6 col-xs-12 livecourse-preview-container">
                    <Courses course={course} />
                </div>
                )
        });
        return(
            <div className="row">
                {course_list}
            </div>
        )
    }
    render() {
        if(this.state.courses) {
            return (
                <div className="container mainContainer">
                    <div className="one"></div>
                    <h1 className="two">My Live Courses</h1>
                    <hr className="three" />
                    {this.renderCourses()}
                </div>
            )
        }
    }
}
export default CourseList