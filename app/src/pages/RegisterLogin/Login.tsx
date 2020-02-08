import React, { useState, useEffect } from 'react';
import { History } from 'history';
import {
  Card, Row, Col, Button,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginUser, tokenInfo } from '../../store/actions';

import LoginInput from './LoginInput';

interface LoginProps {
  history: History
}

const Login: React.FC<LoginProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(tokenInfo(token))
        .then(() => history.push('/'))
        .catch(() => Cookies.remove('token'));
    }
  }, [])

  const submitForm = (): void => {
    const regMail = new RegExp('([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$');
    setError('');
    if (email === '' || password === '') {
      setError('You need fill all the field');
      return;
    }
    if (!regMail.test(email)) {
      setError('Bad email format');
      return;
    }
    dispatch(loginUser({ email, password }))
      .then((res) => {
        Cookies.set('token', res.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError('Connexion failed');
      });
  }

  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <LoginInput id="email" title="Email" type="text" onChange={setEmail} />
            <LoginInput
              id="password"
              title="Password"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
              onChange={setPassword}
            />
            <Row type="flex" justify="center">
              <Col span={20} className="btn-center">
                <Button type="primary" onClick={submitForm}>
                  Login
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
              <Col span={12}>Yout don't have an account ?</Col>
              <Col span={12}>
                <Button type="link" onClick={() => history.push('/register')}>Register yourself</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
