import React, { useState } from 'react';
import { History } from 'history';
import {
  Card, Row, Col, Button,
} from 'antd/es';

import LoginInput from './LoginInput';

interface LoginProps {
  history: History
}

const Login = ({ history }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const submitForm = (): void => {
    console.log("lol")
    console.log('test' + username);
    console.log(password);
  }

  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <LoginInput id="username" title="Nom d'utilisateur" type="text" onChange={setUsername} />
            <LoginInput
              id="password"
              title="Mot de passe"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
              onChange={setPassword}
            />
            <Row type="flex" justify="center">
              <Col span={20} className="btn-center">
                <Button type="primary" onClick={submitForm}>
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
                <Button type="link" onClick={() => history.push('/register')}>Inscrivez-vous</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
