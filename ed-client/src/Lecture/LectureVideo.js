/**
 * Created by Amber on 5/14/17.
 */
import React from "react";
import PropTypes from 'prop-types';
import './LectureVideo.css'

class LectureVideo extends React.Component {


    render() {
        return (
            <div className="col-sm-9 video-wrapper">
                <div className="embed-responsive embed-responsive-4by3">
                    <iframe width="420" height="315" src={this.context.videoUrl}>
                    </iframe>
                </div>
            </div>


        )
    }
}

LectureVideo.contextTypes = {
    videoUrl: PropTypes.string
}

export default LectureVideo
