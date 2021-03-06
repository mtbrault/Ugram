import React, { useState } from 'react';
import {
  Modal, Row, Col, Upload, message, Avatar, Button,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import { UploadFile } from 'antd/es/upload/interface';
import { uploadPost, getMyProfile } from '../store/actions';
import InputComponent from './InputComponent';
import MentionsTagsComponent from './MentionsTagsComponent';
import WebcamPicture from './WebcamPicture';

interface uploadProps {
  toggleModal(): void;
  visible: boolean;
}


const UploadModal: React.FC<uploadProps> = ({ visible, toggleModal }) => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const [usersMentioned, setUsersMentioned] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [webcamVisible, setWebcamVisible] = useState(false);
  const dispatch = useDispatch();

  const beforeUpload = (file: UploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!', 3);
    }
    const isLt2M = (file.size / 1024 / 1024) < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 50KO!', 3);
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleChange = async (info: any) => {
    if (!beforeUpload(info.file)) return;
    const b64 = await getBase64(info.file.originFileObj);

    if (!b64) {
      message.error('Problem while uploading image', 3);
      return;
    }
    info.file.preview = b64;
    setImage(info.file.preview);
  };

  const toggleWebcam = () => {
    setWebcamVisible(!webcamVisible);
  };

  const uploadPicture = () => {
    const mentions: Array<string> = (usersMentioned !== '') ? usersMentioned.split(' ') : [];
    const hashtags: Array<string> = (hashtag !== '')
      ? (hashtag.replace(new RegExp('#', 'g'), '')).split(' ') : [];

    if (image === '')
      return message.error('You must choose a picture', 3);
    for (const hash in hashtags) {
      if (hashtags[hash].substring(0, 1) !== '#'
        && hashtags[hash].length < 3) {
        message.error('Hashtag must start with #', 3);
        return;
      }
    }
    const data = {
      imageUrl: image, description, hashtags, mentions,
    };

    dispatch(uploadPost(data))
      .then(() => {
        message.success('Picture well uploaded', 3);
        dispatch(getMyProfile());
        toggleModal();
      })
      .catch((error) => {
        message.error(error.response.data.message, 3);
      });
  };

  return (
    <Modal
      title="Upload a picture"
      okText="Upload "
      visible={visible}
      onOk={uploadPicture}
      onCancel={() => toggleModal()}
    >
      {webcamVisible && <WebcamPicture setPicture={setImage} visible={webcamVisible} toggleModal={toggleWebcam} />}
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="text-center">
          <Row type="flex" align="middle" justify="center">
            <Col span={24} className="text-center">
              <Upload
                id="avatar"
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={handleChange}
                style={{ width: 0 }}
              >
                {image ? <Avatar src={image} size={100} /> : <Avatar size={100} icon="user" />}
              </Upload>
            </Col>
            <Col span={24} className="text-center">
              <p>or</p>
              <Button onClick={() => toggleWebcam()}>Take with webcam</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
      <MentionsTagsComponent type="mentions" value={usersMentioned} title="Mention a user" setValue={setUsersMentioned} />
      <MentionsTagsComponent type="tags" value={hashtag} title="Hashtags" setValue={setHashtag} />
    </Modal>
  );
};

export default UploadModal;
