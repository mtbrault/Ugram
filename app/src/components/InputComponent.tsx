import React, { ReactNode } from 'react';
import { Col, Input, Row } from 'antd/es';

interface InputComponent {
  id: string;
  title: string;
  type: string;
  value?: string;
  suffix?: ReactNode;
  onChange(e: string): void;
}

const InputComponent: React.FC<InputComponent> = ({
  title, id, type, suffix, value, onChange,
}) => (
  <Row type="flex" justify="center" className="input-container">
    <Col span={20}>
      <b>{title}</b>
      <Input
        id={id}
        type={type}
        suffix={suffix}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Col>
  </Row>
);

export default InputComponent;
