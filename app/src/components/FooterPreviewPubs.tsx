import React from 'react';
import { Button, Col, Row } from 'antd/es';

interface FooterPreviewPubs {
  updatePic: (() => void)|undefined;
  deletePic(): void;
}

const FooterPreviewPubs: React.FC<FooterPreviewPubs> = ({ updatePic, deletePic }) => (
  <Row type="flex">
    <Col span={12} className="text-center">
      <Button type="ghost" icon="edit" onClick={updatePic}>Edit</Button>
    </Col>
    <Col span={12} className="text-center">
      <Button type="danger" icon="delete" onClick={deletePic}>Delete</Button>
    </Col>
  </Row>
);

export default FooterPreviewPubs;
