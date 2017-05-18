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
        /*
        *new Discussion = {'title': '', 'content'}
        * */
        this.setState({
            newDiscussion
        }, function(){
            console.log(this.state.newDiscussion)
        })



    };


    postNewDiscussion() {
            var courseId = this.props.params.courseId;
            var videoId = this.props.params.videoId;
        /* remember to go back here and do the validation*/
        if(confirm('Are you sure to start this discussion?')){
            //var date = Date.now(); deal with it later on


           fetch(`http://localhost:4000/api/v1/${this.props.params.courseId}/${this.props.params.videoId}/new_discussion`, {
               method: 'POST',
               cache: false,
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               //console.log('at start discussion questionList from lecture page', this.context.questionList)
               body: JSON.stringify({
                        courseId: courseId,
                        videoId: videoId,
                        title: this.state.newDiscussion.title,
                        author: Auth.getEmail(),
                        date: 0,
                        id: this.context.questionList.length + 1,
                        content: this.state.newDiscussion.content
                })
           }).then(response => {  //back end plz remember to add 'id' before store data into db. id is the number of the question
                if(response.status === 200 ) {

                    var url = "/"+courseId+'/discussion/'+videoId;
                    console.log(url, typeof url);
                    this.context.router.replace(url);

                }
            });


        }
    }

    render() {
        return (
            <div className="container">
                <div className="editor-container">

                    <h3 className="h3-title"><Link to={`/${this.props.params.courseId}/discussion/${this.props.params.video}`} href="#" className="back-btn glyphicon glyphicon-arrow-left"></Link>Start a new discussion</h3>

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
    router: PropTypes.object.isRequired,
    questionList: PropTypes.array

}


export default StartDiscussion