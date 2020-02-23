import React, { useState } from 'react';
import {
  Modal, Row, Col, Upload, message,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import { uploadPost, getMyProfile } from '../store/actions';
import InputComponent from './InputComponent';
import MentionsTagsComponent from './MentionsTagsComponent';

interface uploadProps {
  toggleModal(): void;
  visible: boolean;
}

const UploadModal: React.FC<uploadProps> = ({ visible, toggleModal }) => {
  const [description, setDescription] = useState('');
  const [usersMentioned, setUsersMentioned] = useState('');
  const [hashtag, setHashtag] = useState('');
  const dispatch = useDispatch();

  const uploadPicture = () => {
    const mentions: Array<string> = (usersMentioned !== '') ? usersMentioned.split(' ') : [];
    const hashtags: Array<string> = (hashtag !== '') ? hashtag.split(' ') : [];
    const data = {
      imageUrl: 'https://avatars2.githubusercontent.com/u/29895484?s=460&v=4', description, hashtags, mentions,
    };

    for (const hash in hashtags) {
      if (hashtags[hash].substring(0, 1) !== '#') {
        message.error('Hashtag must start with #', 5);
        return;
      }
    }
    for (const mention in mentions) {
      if (mentions[mention].substring(0, 1) !== '@') {
        message.error('Mention must start with @', 5);
        return;
      }
    }
    dispatch(uploadPost(data))
      .then(() => {
        message.success('Picture well uploaded', 5);
        dispatch(getMyProfile());
        toggleModal();
      })
      .catch((error) => {
        message.error(error.response.data.message, 5);
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
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="text-center">
          <Upload />
        </Col>
      </Row>
      <InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
      <MentionsTagsComponent type="mentions" title="Mention a user" setValue={setUsersMentioned} />
      <MentionsTagsComponent type="tags" title="Hashtags" setValue={setHashtag} />
    </Modal>
  );
};

export default UploadModal;
