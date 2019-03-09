import React, { Component } from 'react';
import Webcam from 'react-webcam';
import '../style/video.css';
import { Button } from './';

class Video extends Component {
	state = {
		webcamEnabled: false,
		handleImage: undefined,
		interval: undefined
	};

	componentDidMount() {
		const { interval, handleImage } = this.props;
		console.log(interval);
		const { webcamEnabled } = this.state;
		if (webcamEnabled) {
			window.setInterval(() => this.capture(handleImage), interval);
		}
		this.setState({
			handleImage,
			interval
		});
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

	enableWebcam = e => {
		const { handleImage, interval } = this.state;
		this.setState({ webcamEnabled: true });
		window.setInterval(() => this.capture(handleImage), interval);
	};

	render() {
		const videoConstraints = {
			facingMode: 'user'
		};
		const { webcamEnabled } = this.state;
		const { backgroundColor } = this.props;
		const { enableWebcam, setRef } = this;
		return (
			<React.Fragment>
				{webcamEnabled ? (
					<Webcam
						className='video'
						audio={false}
						ref={setRef}
						screenshotFormat='image/jpeg'
						videoConstraints={videoConstraints}
						screenshotQuality={0.8}
					/>
				) : (
					<div className='video'>
						<Button
							backgroundColor={backgroundColor}
							toggleFunction={enableWebcam}
						/>
					</div>
				)}
			</React.Fragment>
		);
	}
}
export default Video;
