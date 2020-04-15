import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Col, Input, Row, message, Badge, Icon, Dropdown, Menu, Tag, AutoComplete,
} from 'antd/es';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import {
  tokenInfo, searchPostByDesc, searchPostByHashtag, searchUserByUsername, getAllPost, getAllUsers,
  getNotif, readNotif, getTopHashtag,
} from '../store/actions';
import { keywordType, notificationType, storeTypes } from '../types';

interface HeaderProps {
  history: History;
}

const Header: React.FC<HeaderProps> = ({ history }) => {
  const dispatch = useDispatch();
  const notifs = useSelector<storeTypes, notificationType[]>((store) => store.notificationReducers.notifications);
  const keywords = useSelector<storeTypes, keywordType[]>((store) => store.notificationReducers.keywords);

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

  const search = (val: string, type: boolean) => {
    if (val.substring(0, 1) === '#') {
      val = val.substring(1);
    }
    if (val.length !== 0) {
      dispatch(searchPostByDesc(val, type));
      dispatch(searchPostByHashtag(val, type));
      dispatch(searchUserByUsername(val, type));
      history.push('/search');
    } else message.info('Please enter a string for search');
  };

  const openNotif = () => {
    dispatch(readNotif());
  };

  const notificationList = notifs.map((notif, key) => (
    <Menu.Item key={key}>
      {!notif.isRead
        ? (
          <Badge status="success">
            <a href="#" onClick={openNotif}>{notif.text}</a>
          </Badge>
        ) : <a href="#" onClick={openNotif}>{notif.text}</a>}
    </Menu.Item>
  ));

  const keywordList = keywords.map((keyword, key) => (
    <Menu.Item key={key}>
      <a href="#" onClick={() => search(keyword.word, false)}>
        {keyword.word} appeared <Tag>{keyword.number}</Tag>
      </a>
    </Menu.Item>
  ));

  const notifsLength = (): number => {
    if (notifs.length > 0) return notifs.filter((notif) => notif.isRead === false).length;
    return 0;
  };

  return (
    <Row type="flex" align="middle" justify="space-between" className="header-container">
      <Col xs={0} md={3} lg={5} onClick={() => history.push('/home')}>
        <h1 className="title-h1 cursor-pointer">Ugram</h1>
      </Col>
      <Col xs={2} md={0} onClick={() => history.push('/home')}>
        <h1 className="title-h1 cursor-pointer">U</h1>
      </Col>
      <Col xs={11} md={10}>
        <AutoComplete
          placeholder="Search by username or hashtag here"
          onSearch={(value) => search(value, false)}
          dataSource={keywords.map((word) => word.word)}
        />
      </Col>
      <Col md={3} lg={2}>
        <Badge count={notifsLength()}>
          <Dropdown overlay={notifsLength() > 0 ? <Menu>{notificationList}</Menu>
            : (
              <Menu>
                <Menu.Item>
                  No notification
                </Menu.Item>
              </Menu>
            )}
          >
            <Button>
              <Icon type="notification" />
            </Button>
          </Dropdown>
        </Badge>
      </Col>
      <Col md={3} lg={2}>
        <Badge count={keywords.length}>
          <Dropdown overlay={<Menu>{keywordList}</Menu>}>
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
