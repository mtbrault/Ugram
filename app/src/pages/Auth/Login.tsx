import React, { useState, useEffect } from 'react';
import { History } from 'history';
import {
  Card, Row, Col, Button, message,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginUser, getMyProfile, loginGoogle } from '../../store/actions';
import InputComponennt from '../../components/InputComponent';
import GoogleLogin from 'react-google-login';

interface LoginProps {
  history: History;
}

const Login: React.FC<LoginProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const googleId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(getMyProfile())
        .then(() => history.push('/'))
        .catch(() => Cookies.remove('token'));
    }
  }, [dispatch, history]);

  const submitForm = (): void => {
    if (username === '' || password === '') {
      message.error('You need fill all the field', 3);
      return;
    }
    dispatch(loginUser({ username, password }))
      .then((res) => {
        Cookies.set('token', res.token);
        dispatch(getMyProfile());
        history.push('/');
      })
      .catch((err) => {
        if (err.response)
          message.error(err.response.data.message, 3);
        else
          message.error("Impossible to connect to API", 3);
      });
  };

  const googleFailed = (res: any) => {
    message.error(res.error, 3);
  }

  const googleSucceed = (res: any) => {
    const param = {
      accessToken: res.accessToken,
      tokenId: res.tokenId
    };
    dispatch(loginGoogle(param))
      .then((res) => {
        Cookies.set('token', res.token);
        dispatch(getMyProfile());
        history.push('/');
      })
      .catch((err) => {
        message.error(err.response.data.message, 3);
      })
  }

  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <InputComponennt id="email" title="Email / Username / Phone" type="text" onChange={setUsername} value={username} />
            <InputComponennt
              id="password"
              title="Password"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
              onChange={setPassword}
              value={password}
            />
            <Row type="flex" justify="center">
              <Col span={24} className="btn-center">
                <Button type="primary" onClick={submitForm}>
                  Login
                </Button>
              </Col>
              or
              <Col span={24} className="btn-center">
                <GoogleLogin
                  clientId={googleId}
                  buttonText="Login with Google"
                  onSuccess={googleSucceed}
                  onFailure={googleFailed}
                  cookiePolicy="single_host_origin"
                />
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
