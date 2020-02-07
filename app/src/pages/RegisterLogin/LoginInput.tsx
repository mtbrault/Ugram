import React, { ReactNode } from 'react';
import { Col, Input, Row } from 'antd/es';

interface LoginInputProps {
  id: string;
  title: string;
  type: string;
  suffix?: ReactNode;
  onChange(e: string): void;
}

const LoginInput: React.FC<LoginInputProps> = ({ title, id, type, suffix, onChange }) => (
  <Row type="flex" justify="center" className="input-container">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} type={type} suffix={suffix} onChange={(e) => onChange(e.target.value)} />
    </Col>
  </Row>
);

export default LoginInput;