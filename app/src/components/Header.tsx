import React, { useEffect, useState } from 'react';
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
import APIManager from '../services/Api';
import { keywordType, notificationType, storeTypes } from '../types';

interface HeaderProps {
  history: History;
}

const Header: React.FC<HeaderProps> = ({ history }) => {
  const [autofill, setAutofill] = useState([]);
  const [searchValue, setSearchValue] = useState('');
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

  const search = (val: string) => {
    if (val[0] === '#') {
      val.replace('#', '');
    }
    if (val.length !== 0) {
      dispatch(searchPostByDesc(val));
      dispatch(searchPostByHashtag(val));
      dispatch(searchUserByUsername(val));
      history.push('/search');
    } else message.info('Please enter a string for search');
  };

  const openNotif = () => {
    dispatch(readNotif());
    dispatch(getNotif());
  };

  const autocomplete = async (value: string) => {
    if (value === '' || value === '#') return;
    const res = await APIManager.autocomplete(value);
    setAutofill(res);
  };

  const notificationList = notifs.map((notif, key) => (
    <Menu.Item key={key}>
      <Badge status={notif.isRead ? 'default' : 'success'} text={notif.text} />
    </Menu.Item>
  ));

  const keywordList = keywords.map((keyword, key) => (
    <Menu.Item key={key}>
      <Button type="link" onClick={() => search(keyword.word)}>
        {`#${keyword.word} appeared `}<Tag className="span-icon">{keyword.number}</Tag>
      </Button>
    </Menu.Item>
  ));

  const notifsLength = (): number => {
    if (notifs.length > 0) return notifs.filter((notif) => notif.isRead === false).length;
    return 0;
  };

  return (
    <Row type="flex" align="middle" justify="space-between" className="header-container">
      <Col xs={0} md={4} lg={3} onClick={() => history.push('/home')}>
        <h1 className="title-h1 cursor-pointer">Ugram</h1>
      </Col>
      <Col xs={2} md={0} onClick={() => history.push('/home')}>
        <h1 className="title-h1 cursor-pointer">U</h1>
      </Col>
      <Col xs={8} md={10} lg={14}>
        <AutoComplete
          placeholder="Search by username or hashtag here"
          onSearch={(value) => autocomplete(value)}
          onChange={(value) => setSearchValue(value.toString())}
          onSelect={() => search(searchValue)}
          dataSource={autofill.map((word) => word)}
          style={{ width: '100%' }}
        />
      </Col>
      <Col xs={3} md={2} lg={1}>
        <Badge count={notifsLength()}>
          <Dropdown
            trigger={['click']}
            overlay={notifs.length > 0 ? <Menu>{notificationList.reverse()}</Menu>
              : (
                <Menu>
                  <Menu.Item>
                    No notification
                  </Menu.Item>
                </Menu>
              )}
          >
            <Button onClick={openNotif}>
              <Icon type="notification" />
            </Button>
          </Dropdown>
        </Badge>
      </Col>
      <Col xs={3} md={2} lg={1}>
        <Badge count={keywords.length}>
          <Dropdown
            trigger={['click']}
            overlay={<Menu>{keywordList}</Menu>}
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
      <Col xs={0} md={3} lg={2}>
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
