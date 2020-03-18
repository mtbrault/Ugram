import React from 'react';
import {
  Col, List, Modal, Row, Tag, message,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import { publicationType } from '../types';
import FooterPreviewPubs from './FooterPreviewPubs';
import { deletePost, getMyProfile } from '../store/actions';

interface PreviewPubs {
  previewPubs: publicationType;
  previewVisible: boolean;
  toggle(): void;
  editPubs?: () => void;
  isMe?: boolean;
}

const PreviewPubs: React.FC<PreviewPubs> = ({
  previewPubs, toggle, previewVisible, editPubs, isMe,
}) => {
  const dispatch = useDispatch();

  const deleteThis = () => {
    dispatch(deletePost(previewPubs.id))
      .then(
        () => {
          message.success('Picture well deleted', 5);
          dispatch(getMyProfile());
          toggle();
        },
        (err) => {
          message.error(err.response.data.message, 5);
        },
      );
  };

  const convertMentions = (): string[] => {
    const mentionArray: string[] = [];
    previewPubs.mentions.forEach((element) => {
      mentionArray.push(element.username);
    });
    return mentionArray;
  };

  return (
    <Modal
      width={
        (previewPubs?.description || previewPubs?.hashtags.length !== 0 || previewPubs?.mentions.length !== 0) ? 520 : 'fit-content'
      }
      visible={previewVisible}
      footer={isMe ? <FooterPreviewPubs updatePic={editPubs} deletePic={deleteThis} /> : null}
      onCancel={toggle}
    >
      <Row type="flex" align="middle">
        <Col xs={24} md={12} className="text-center">
          <img src={previewPubs.imageUrl || ''} width={200} height={200} alt="" />
        </Col>
        {(previewPubs?.description || previewPubs?.hashtags.length !== 0 || previewPubs?.mentions.length !== 0) && (
          <Col xs={24} md={12}>
            {previewPubs?.description && (
              <div>
                <b>Description:</b>
                <p>{previewPubs?.description}</p>
              </div>
            )}
            {previewPubs?.hashtags.length !== 0 && (
              <div>
                <b>Hashtag:</b>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={previewPubs?.hashtags}
                  renderItem={(tag) => (
                    <List.Item>
                      <Tag>{`${tag}`}</Tag>
                    </List.Item>
                  )}
                />
              </div>
            )}
            {previewPubs?.mentions.length !== 0 && (
              <div>
                <b>Mention:</b>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={convertMentions()}
                  renderItem={(user) => (
                    <List.Item>
                      <Tag>{`@${user}`}</Tag>
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default PreviewPubs;
