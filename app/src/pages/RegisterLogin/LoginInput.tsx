import React, { ReactNode } from 'react';
import { Col, Input, Row } from 'antd/es';

interface LoginInputProps {
  id: string;
  title: string;
  type: string;
  suffix?: ReactNode;
}

const LoginInput = ({
  title, id, type, suffix,
} : LoginInputProps) => (
  <Row type="flex" justify="center" className="input-container">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} type={type} suffix={suffix} />
    </Col>
  </Row>
);

export default LoginInput;