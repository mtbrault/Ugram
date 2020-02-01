import React, { ReactNode } from 'react';

import {
  Card, Row, Col, Input, Button,
} from 'antd/es';


interface RegisterInputProps {
  title: string;
  id: string;
  type: string;
  suffix?: ReactNode;
}

const RegisterInput = ({
  title, id, type, suffix,
} : RegisterInputProps) => (
  <Row type="flex" justify="center">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} type={type} suffix={suffix} />
    </Col>
  </Row>
);

const Register = () => (
  <Row type="flex" justify="center">
    <Col span={10}>
      <Card bordered>
        <RegisterInput id="username" title="Nom d'utilisateur" type="text" />
        <RegisterInput id="name" title="Nom complet" type="text" />
        <RegisterInput
          id="password"
          title="Mot de passe"
          type="password"
          suffix={<Button type="link" icon="eye" />}
        />
        <Row type="flex" justify="center">
          <Col span={20}>
            <Button type="primary" onClick={() => console.log('Connexion')}>
              S'inscrire
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
);

export default Register;
