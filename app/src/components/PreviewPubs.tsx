import React, { useState } from 'react';
import { Col, List, Modal, Row, Tag, message } from 'antd/es';
import { useDispatch } from 'react-redux';
import { publicationType } from '../types';
import FooterPreviewPubs from './FooterPreviewPubs';
import { deletePost, getMyProfile, updatePost } from '../store/actions';

interface PreviewPubs {
  previewPubs: publicationType;
  previewVisible: boolean;
  toggle(): void;
  onCancel(): void;
  isMe: boolean;
}

const PreviewPubs: React.FC<PreviewPubs> = ({ previewPubs, toggle, previewVisible, onCancel, isMe }) => {

  const [description, setDescription] = useState(previewPubs.description);
  const [hashtag, setHashtag] = useState(previewPubs.hashtags.join(' '));
  const [users, setUsers] = useState(previewPubs.mentions.join(' '));
  const dispatch = useDispatch();

  const deleteThis = () => {
    dispatch(deletePost(previewPubs.id))
      .then(
        () => {
          message.success("Picture well deleted", 5);
          dispatch(getMyProfile());
          toggle();
        },
        (err) => {
          message.error(err.response.data.message, 5);
        })
  }

  const updateThis = () => {
    const hashtags = hashtag.split(' ');
    const mentions = users.split(' ');
    const data = { imageUrl: previewPubs.imageUrl, description, hashtags, mentions };

    for (const hash in hashtags) {
      if (hashtags[hash].substring(0, 1) !== "#") {
        message.error("Hashtag must start with #", 5);
        return;
      }
    }
    dispatch(updatePost(previewPubs.id, data))
      .then(() => {
        message.success("Picture well updated", 5);
        dispatch(getMyProfile());
      },
        (err) => {
          message.error(err.response.data.message, 5);
        })
  }

  return (
    <Modal visible={previewVisible} footer={isMe ? <FooterPreviewPubs update={updateThis} deletePic={deleteThis} /> : null} onCancel={onCancel}>
      <Row type="flex" align="middle">
        <Col span={12}>
          <img src={previewPubs.imageUrl || ''} alt="" />
        </Col>
        <Col span={12}>
          <div>
            <b>Description:</b>
            <p>{previewPubs?.description}</p>
          </div>
          <div>
            <b>Hashtag:</b>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={previewPubs?.hashtags}
              renderItem={(hashtag) => (
                <List.Item>
                  <Tag>{`#${hashtag}`}</Tag>
                </List.Item>
              )}
            />
          </div>
          <div>
            <b>Mention:</b>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={previewPubs?.mentions}
              renderItem={(user) => (
                <List.Item>
                  <Tag>{`@${user}`}</Tag>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
};

export default PreviewPubs;
