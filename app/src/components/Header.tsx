import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Input, Row } from 'antd/es';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { tokenInfo } from '../store/actions';

interface HeaderProps {
  history: History;
}

const Header: React.FC<HeaderProps> = ({ history }) => {
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove('token');
    history.push('/login');
  };

  useEffect(() => {
    dispatch(tokenInfo())
      .catch(() => {
        Cookies.remove('token');
        history.push('/login');
      });
  }, [dispatch, history]);

  return (
    <Row type="flex" align="middle" justify="space-between" className="header-container">
      <Col xs={0} md={3} lg={5} onClick={() => history.push('/home')}>
        <h1 className="title-h1 title-header">UGram</h1>
      </Col>
      <Col xs={2} md={0} onClick={() => history.push('/home')}>
        <h1 className="title-h1 title-header">U</h1>
      </Col>
      <Col xs={15} md={12}>
        <Input.Search
          placeholder="Search by username or hashtag here"
          onSearch={(value) => console.log(value)}
        />
      </Col>
      <Col xs={0} md={3} lg={2}>
        <Button type="ghost" icon="user" onClick={() => history.push('/profile', { isMe: true })}>
          Profil
        </Button>
      </Col>
      <Col xs={0} md={4} lg={2}>
        <Button type="danger" icon="logout" onClick={logout}>
          Logout
        </Button>
      </Col>
      <Col xs={3} md={0}>
        <Button type="ghost" icon="user" onClick={() => history.push('/profile', { isMe: true })} />
      </Col>
      <Col xs={3} md={0}>
        <Button type="danger" icon="logout" onClick={logout} />
      </Col>
    </Row>
  );
};

export default withRouter(Header);
