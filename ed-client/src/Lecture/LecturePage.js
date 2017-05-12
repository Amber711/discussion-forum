/**
 * Created by Amber on 5/9/17.
 */
// import React from 'react';
// import Auth from 'Auth';
// import LectureList from './LectureList'
//
// class LecturePage extends React.Component {
//     constructor() {
//         super();
//         this.state ={lectureList: null}
//     };
//
//     componentDidMount() {
//         this.getLectureVideoList();
//     }
//
//
//     getLectureVideoList() {
//         /*let url = "http://localhost:3000/lecture/userId/"+Auth.getEmail();
//         let request = new Request(encodeURI(url), {
//             method: 'GET',
//             cache: false
//         });
//         fetch(request)
//             .then(res)*/
//         this.setState({
//             lectureList: [
//                 {
//                     "title": "第一周理论课",
//                     "videoId": "1",
//                     "url": "https://www.youtube.com/embed/Rpc7rd8C2IA"
//                 },
//                 {
//                     "title": " 第一周实战课",
//                     "videoId": "2",
//                      "url": "https://www.youtube.com/embed/5EE0hoPaXsA"
//
//                 },
//                 {
//                     "title": " 第一周实战课",
//                     "videoId": "2",
//                     "url": "https://www.youtube.com/embed/5EE0hoPaXsA"
//
//                 },
//                 {
//                     "title": " 第一周实战课",
//                     "videoId": "2",
//                     "url": "https://www.youtube.com/embed/5EE0hoPaXsA"
//
//                 }
//
//             ]
//         })
//     }
//     renderLectures() {
//         let lectures = this.state.lectureList.map(function(lecture) {
//             return (
//                 <a href="#">
//                     <LectureList lecture={lecture}/>
//                 </a>
//             )
//         })
//     }
//
//     render() {}
//
//
// }
//
// export default LecturePage