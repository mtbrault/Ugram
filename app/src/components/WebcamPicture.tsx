import React, { useState, useEffect } from 'react';
import { Modal } from 'antd/es';
import Webcam from 'react-webcam';

interface webcamProps {
	setPicture(url: any): void;
	visible: boolean;
	toggleModal(): void;
}

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: "user",
}

const WebcamPicture: React.FC<webcamProps> = ({ setPicture, visible, toggleModal }) => {
	const [webcam, setWebcam] = useState(null);

	const setRef = (value: any) => {
		setWebcam(value);
	}

	useEffect(() => {
		console.log(visible);
	}, [visible])
	const capture = () => {
		if (webcam !== undefined) {
			setPicture(webcam.getScreenshot() as string);
			toggleModal();
		}
	};

	return (
		<Modal
			title="Take picture with webcam"
			okText="Take picture"
			visible={visible}
			onOk={() => capture()}
			onCancel={() => toggleModal()}
		>
			<Webcam
				audio={false}
				height={350}
				ref={setRef}
				screenshotFormat="image/jpeg"
				width={350}
				videoConstraints={videoConstraints}
			/>
		</Modal >
	);
}

export default WebcamPicture;