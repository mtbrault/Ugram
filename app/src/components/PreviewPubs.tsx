import React, { useState } from 'react';
import { Col, List, Modal, Row, Tag, message } from 'antd/es';
import { useDispatch } from 'react-redux';
import { publicationType } from '../types';
import FooterPreviewPubs from './FooterPreviewPubs';
import { deletePost, getMyProfile, updatePost } from '../store/actions';

interface PreviewPubs {
  previewPubs: publicationType;
  previewVisible: boolean;
  onCancel(): void;
  isMe: boolean;
}

const PreviewPubs: React.FC<PreviewPubs> = ({ previewPubs, previewVisible, onCancel, isMe }) => {

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
        },
        (err) => {
          message.error(err.response.data.message, 5);
        })
  }

  const updateThis = () => {
    const hashtags = hashtag.split(' ');
    const mentions = users.split(' ');
    const data = { imageUrl: previewPubs.imageUrl, description, hashtags, mentions };

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
    <Modal visible={previewVisible} footer={isMe ? <FooterPreviewPubs /> : null} onCancel={onCancel}>
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
