import React, { ReactNode, useState } from 'react';

import {
  Card, Row, Col, Input, Button,
} from 'antd/es';


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

const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <LoginInput id="username" title="Nom d'utilisateur" type="text" />
            <LoginInput
              id="password"
              title="Mot de passe"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
            />
            <Row type="flex" justify="center">
              <Col span={20} className="btn-center">
                <Button type="primary" onClick={() => console.log('Connexion')}>
                  Connexion
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center" className="container">
        <Col lg={7} md={10} sm={16} xs={24} className="text-center">
          <Card bordered>
            <Row type="flex" align="middle" justify="start">
              <Col span={12}>Vous n’avez pas de compte  ?</Col>
              <Col span={12}>
                <Button type="link" href="/register">Inscrivez-vous</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
