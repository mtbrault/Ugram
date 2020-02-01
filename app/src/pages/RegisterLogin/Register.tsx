import React, { ReactNode, useState } from 'react';

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
  <Row type="flex" justify="center" className="input-container">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} type={type} suffix={suffix} />
    </Col>
  </Row>
);

const Register = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <RegisterInput id="username" title="Nom d'utilisateur" type="text" />
            <RegisterInput id="name" title="Nom complet" type="text" />
            <RegisterInput
              id="password"
              title="Mot de passe"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
            />
            <Row type="flex" justify="center">
              <Col span={20} className="btn-center">
                <Button type="primary" onClick={() => console.log('S\'inscrire')}>
                  S'inscrire
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
              <Col span={12}>Vous avez un compte ?</Col>
              <Col span={12}>
                <Button type="link" href="/login">Connectez-vous</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Register;
