import React, { ReactNode, useState } from 'react';
import { History } from 'history';
import {
  Card, Row, Col, Input, Button,
} from 'antd/es';


interface RegisterInputProps {
  title: string;
  id: string;
  type: string;
  suffix?: ReactNode;
  onChange(e: string): void;
}

interface RegisterProps {
  history: History
}

const RegisterInput: React.SFC<RegisterInputProps> = ({ title, id, type, suffix, onChange }) => (
  <Row type="flex" justify="center" className="input-container">
    <Col span={20}>
      <b>{title}</b>
      <Input id={id} type={type} suffix={suffix} onChange={(e) => onChange(e.target.value)} />
    </Col>
  </Row>
);

const Register: React.FC<RegisterProps> = ({ history }) => {

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const regMail = new RegExp('([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$');
    const regTel = new RegExp('^([0-9]{10})');

    if (username === '' || email === '' || password === '' || phone === '' || name === '')
      setError('You need to fill each field');
    if (!regMail.test(email))
      setError('Bad email format');
    if (!regTel.test(phone))
      setError('Bad phone number format');
    console.log(email);
  }

  return (
    <>
      <Row type="flex" justify="center">
        <Col lg={7} md={10} sm={16} xs={24}>
          <Card bordered>
            <h1 className="text-center">Ugram</h1>
            <RegisterInput id="email" title="EMail" type="text" onChange={setEmail} />
            <RegisterInput id="username" title="Username" type="text" onChange={setUsername} />
            <RegisterInput id="name" title="Fullname" type="text" onChange={setName} />
            <RegisterInput id="phone" title="Phone number" type="tel" onChange={setPhone} />
            <RegisterInput
              id="password"
              title="Password"
              type={show ? 'text' : 'password'}
              suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
              onChange={setPassword}
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
