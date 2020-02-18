import React from 'react';
import { Button, Col, Row } from 'antd/es';

interface FooterPreviewPubs {
}

const FooterPreviewPubs: React.FC<FooterPreviewPubs> = ({}) => (
  <Row type="flex">
    <Col span={12} className="text-center">
      <Button type="ghost" icon="edit">Edit</Button>
    </Col>
    <Col span={12} className="text-center">
      <Button type="danger" icon="delete">Delete</Button>
    </Col>
  </Row>
);

export default FooterPreviewPubs;
