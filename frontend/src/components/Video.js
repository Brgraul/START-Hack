import React, { Component } from 'react';
import Webcam from 'react-webcam';
import '../style/video.css';

class Video extends Component {
	render() {
		return (
			<Webcam
				className='video'
			/>
		);
	}
}
export default Video;
