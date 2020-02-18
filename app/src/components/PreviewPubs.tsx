import React from 'react';
import {Col, List, Modal, Row, Tag} from 'antd/es';
import { publicationType } from '../types';
import FooterPreviewPubs from './FooterPreviewPubs';

interface PreviewPubs {
  previewPubs: publicationType;
  previewVisible: boolean;
  onCancel(): void;
  isMe: boolean;
}

const PreviewPubs: React.FC<PreviewPubs> = ({ previewPubs, previewVisible, onCancel, isMe }) => (
  <Modal visible={previewVisible} footer={isMe ? <FooterPreviewPubs /> : null} onCancel={onCancel}>
    <Row type="flex" align="middle">
      <Col span={12}>
        <img src={previewPubs.url || ''} alt="" />
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
            dataSource={previewPubs?.hashtag}
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
            dataSource={previewPubs?.users}
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
);

export default PreviewPubs;
