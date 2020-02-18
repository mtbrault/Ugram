import React, { useState, useEffect } from 'react';
import { History } from 'history';
import {
  Card, Row, Col, Button, message,
} from 'antd/es';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { registerUser, getMyProfile } from '../../store/actions';
import InputComponent from '../../components/InputComponent';

interface RegisterProps {
  history: History
}

const Register: React.FC<RegisterProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(getMyProfile())
        .then(() => history.push('/'))
        .catch(() => Cookies.remove('token'));
    }
  }, [dispatch, history]);

  const submitForm = (): void => {
    const regMail = new RegExp('([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$');
    const regTel = new RegExp('(^[0-9]*)$');

    if (username === '' || email === '' || password === '' || phoneNumber === '' || firstname === '' || lastname === '')
      message.error('You need to fill each field', 5);
    else if (!regMail.test(email))
      message.error('Bad email format', 5);
    else if (!regTel.test(phoneNumber))
      message.error('Bad phone number format', 5);
    else {
      dispatch(registerUser({
        email, username, firstname, lastname, phoneNumber, password,
      }))
        .then((res) => {
          Cookies.set('token', res.token);
          dispatch(getMyProfile());
          history.push('/');
        })
        .catch((err) => {
          message.error(err.response.data.message, 5);
        });
    }
  };

  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <InputComponent id="email" title="EMail" type="text" onChange={setEmail} value={email} />
            <InputComponent id="username" title="Username" type="text" onChange={setUsername} value={username} />
            <InputComponent id="firstname" title="Firstname" type="text" onChange={setFirstname} value={firstname} />
            <InputComponent id="lastname" title="Lastname" type="text" onChange={setLastname} value={lastname} />
            <InputComponent id="phone" title="Phone number" type="tel" onChange={setPhone} value={phoneNumber} />
            <InputComponent
              id="password"
              title="Password"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
              onChange={setPassword}
              value={password}
            />
            <Row type="flex" justify="center">
              <Col span={20} className="btn-center">
                <Button type="primary" onClick={submitForm}>
                  Register
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
              <Col span={12}>You already have an account ?</Col>
              <Col span={12}>
                <Button type="link" onClick={() => history.push('/login')}>Login yourself</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Register;
