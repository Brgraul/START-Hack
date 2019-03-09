import React, { Component } from 'react';
import Webcam from 'react-webcam';
import '../style/video.css';

class Video extends Component {
	componentDidMount() {
		const { interval, handleImage } = this.props;
		console.log(interval);
		window.setInterval(() => this.capture(handleImage), interval);
		console.log('Mounted...');
	}

	setRef = webcam => {
		this.webcam = webcam;
	};

	capture = handleImage => {
		const image = this.webcam.getScreenshot();
		console.log('Capturing image');
		handleImage(image);
	};

	render() {
		const videoConstraints = {
			facingMode: 'user'
		};
		return (
			<Webcam
				audio={false}
				ref={this.setRef}
				screenshotFormat='image/jpeg'
				videoConstraints={videoConstraints}
				screenshotQuality={0.5}
			/>
		);
	}
}
export default Video;
