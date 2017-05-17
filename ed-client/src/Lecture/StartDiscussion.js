/**
 * Created by Amber on 5/16/17.
 */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './StartDiscussion.css';
import Auth from '../Auth/Auth';

class StartDiscussion extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={newDiscussion:{}};
        this.questionEditted = this.questionEditted.bind(this);
        this.postNewDiscussion = this.postNewDiscussion.bind(this);
    }

    questionEditted(event) {
        console.log(event.target.value, event.target.getAttribute('name'))
        var item = event.target.getAttribute('name')
        var val = event.target.value
        var newDiscussion = this.state.newDiscussion;
        newDiscussion[item] = val

        this.setState({
            newDiscussion
        }, function(){
            console.log(this.state.newDiscussion)
        })



    };


    postNewDiscussion() {
        /* remember to go back here and do the validation*/
        if(confirm('Are you sure to start this discussion?')){
            var date = Date.now();
            console.log('date-----:', date)


           /*fetch(`http://localhost:3000/${this.props.params.courseId}/${this.props.params.videoId}/start_discussion`, {
               method: 'POST',
               cache: false,
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                        title: this.state.newDiscussion.title,
                        author: author:Auth.getEmail(),
                        date: date,
                        content: this.state.newDiscussion.content
                })
           }).then(response => {  //back end plz remember to add 'id' before store data into db. id is the number of the question
                if(response.status === 200 ) {
                   response.json().then(function (json) {
                       this.context.router.replace(`/${this.props.params.courseId}/question_list/${this.props.params.videoId}`)
                   })
                }
            })*/
            this.context.router.replace(`/${this.props.params.courseId}/question_list/${this.props.params.videoId}`)

        }
    }

    render() {
        return (
            <div className="container">
                <div className="editor-container">

                    <h3 className="h3-title"><Link to={`/${this.props.params.courseId}/question_list/${this.props.params.video}`} href="#" className="back-btn glyphicon glyphicon-arrow-left"></Link>Start a new discussion</h3>

                    <h4 className="h4-title">Title</h4>

                    <input className="insert-q-title" type="text" placeholder="Write a clear and descriptive title" name="title" required onChange={(event) => this.questionEditted(event)} />

                    <h4>Question detail</h4>
                    <textarea name="content" id="" cols="30" rows="10" onChange={(event) => this.questionEditted(event)}></textarea>
                    <div className="btns">
                        <Link type="button" className="btn btn-default" onClick={()=> this.postNewDiscussion()}>Post</Link>
                        <a type="button" className="btn btn-default">Cancel</a>
                    </div>
                </div>
            </div>

            )

    }

}

StartDiscussion.contextTypes = {
    router: PropTypes.object.isRequired
}

export default StartDiscussion