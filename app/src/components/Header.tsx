import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Col, Input, Row, message, Badge, Icon, Dropdown, Menu,
} from 'antd/es';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import {
  tokenInfo, searchPostByDesc, searchPostByHashtag, searchUserByUsername, getAllPost, getAllUsers,
  getNotif, readNotif, getTopHashtag,
} from '../store/actions';
import { keywordType, notificationType, storeTypes} from '../types';

interface HeaderProps {
  history: History;
}

const Header: React.FC<HeaderProps> = ({ history }) => {
  const dispatch = useDispatch();
  const notifs = useSelector<storeTypes, notificationType[]>((store) => store.notificationReducers.notifications);
  const keywords = useSelector<storeTypes, keywordType[]>((store) => store.notificationReducers.keywords);

  console.log(notifs);
  console.log(keywords);
  const logout = () => {
    Cookies.remove('token');
    history.push('/login');
  };

  useEffect(() => {
    dispatch(tokenInfo())
      .then(() => {
        dispatch(getAllPost());
        dispatch(getAllUsers());
        dispatch(getNotif());
        dispatch(getTopHashtag());
      })
      .catch(() => {
        Cookies.remove('token');
        history.push('/login');
      });
  }, [dispatch, history]);

  const search = (val: string) => {
    if (val.substring(0, 1) === '#') {
      val = val.substring(1);
    }
    if (val.length !== 0) {
      dispatch(searchPostByDesc(val, false));
      dispatch(searchPostByHashtag(val, false));
      dispatch(searchUserByUsername(val, false));
      history.push('/search');
    } else message.info('Please enter a string for search');
  };

  const openNotif = () => {
    dispatch(readNotif());
  };

  const notificationList = notifs.map((notif) => (
    <Menu.Item>
      <a href="#" onClick={openNotif}>{notif.text}</a>
    </Menu.Item>
  ));

  const keywordList = keywords.map((keyword) => (
    <Menu.Item>
      <a href="#" onClick={openNotif}>{keyword}</a>
    </Menu.Item>
  ));

  return (
    <Row type="flex" align="middle" justify="space-between" className="header-container">
      <Col xs={0} md={3} lg={5} onClick={() => history.push('/home')}>
        <h1 className="title-h1 title-header">Ugram</h1>
      </Col>
      <Col xs={2} md={0} onClick={() => history.push('/home')}>
        <h1 className="title-h1 title-header">U</h1>
      </Col>
      <Col xs={11} md={10}>
        <Input.Search
          placeholder="Search by username or hashtag here"
          onSearch={(value) => search(value)}
        />
      </Col>
      <Col md={3} lg={2}>
        <Badge count={5}>
          <Dropdown overlay={<Menu>{notificationList}</Menu>}>
            <Button>
              <Icon type="notification" />
            </Button>
          </Dropdown>
        </Badge>
      </Col>
      <Col md={3} lg={2}>
        <Badge count={5}>
          <Dropdown overlay={(
            <Menu>
              <Menu.Item><a>Mots populaire</a></Menu.Item>
            </Menu>
          )}
          >
            <Button>
              <Icon type="star" />
            </Button>
          </Dropdown>
        </Badge>
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
      <Col xs={2} md={0}>
        <Button type="ghost" icon="user" onClick={() => history.push('/profile', { isMe: true })} />
      </Col>
      <Col xs={2} md={0}>
        <Button type="danger" icon="logout" onClick={logout} />
      </Col>
    </Row>
  );
};

export default withRouter(Header);
