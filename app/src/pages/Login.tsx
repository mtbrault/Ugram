import React, { ReactNode } from 'react';

import {
  Card, Row, Col, Input, Button,
} from 'antd/es';


interface LoginInputProps {
  id: string;
  title: string;
  name: string;
  type: string;
  suffix?: ReactNode;
}

const LoginInput = ({
  title, id, name, type, suffix,
} : LoginInputProps) => (
  <Row type="flex" justify="center">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} name={name} type={type} suffix={suffix} />
    </Col>
  </Row>
);

const Login = () => (
  <Row type="flex" justify="center">
    <Col span={10}>
      <Card bordered>
        <LoginInput id="username" name="username" title="Nom d'utilisateur" type="text" />
        <LoginInput
          id="password"
          name="password"
          title="Mot de passe"
          type="password"
          suffix={<Button type="link" icon="eye" />}
        />
        <Row type="flex" justify="center">
          <Col span={20}>
            <Button type="primary" onClick={() => console.log('Connexion')}>
              Connexion
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
);

export default Login;
