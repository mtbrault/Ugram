import React from 'react';
import {
  Button, Avatar, Col, Row, Card
} from 'antd/es';

const Profile = () => (
  <>
    <Row type="flex" align="middle" justify="center">
      <Col span={14}>
        <Card bordered>
          <Row type="flex" align="middle" justify="center">
            <Col span={12} className="text-center">
              <Avatar size={100} icon="user" />
              <span className="span-icon">username</span>
            </Col>
            <Col span={12} className="text-center">
              <Button type="ghost" icon="setting">
                Edit account
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col lg={7} md={10} sm={16} xs={24}>
      </Col>
    </Row>
  </>
);

export default Profile;
