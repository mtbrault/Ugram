import React, { useState } from 'react';
import { Modal } from 'antd/es';
import Webcam from 'react-webcam';

interface webcamProps {
  setPicture(url: any): void;
  visible: boolean;
  toggleModal(): void;
}

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: 'user',
};

const WebcamPicture: React.FC<webcamProps> = ({ setPicture, visible, toggleModal }) => {
  const [webcam, setWebcam] = useState(null);

  const setRef = (value: any) => {
    setWebcam(value);
  };

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
      className="modal-webcam"
    >
      <Webcam
        audio={false}
        ref={setRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ width: '100%' }}
      />
    </Modal >
  );
};

export default WebcamPicture;