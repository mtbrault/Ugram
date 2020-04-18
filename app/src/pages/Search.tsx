import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import {
  Avatar, Button, Card, Col, List, Row, Tag,
} from 'antd/es';
import { initialProfile, initialSearch, profileType, publicationType, storeTypes } from '../types';
import PreviewPubs from '../components/PreviewPubs';
import { getAllUsers, getNotif, getTopHashtag } from '../store/actions';

interface SearchProps {
  history: History;
}

const Search: React.FC<SearchProps> = ({ history }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPubs, setPreviewPubs] = useState<publicationType>();
  const search = useSelector<storeTypes, initialSearch>((store) => store.searchReducers);
  const data = useSelector<storeTypes, initialProfile>((store) => store.profileReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getNotif());
    dispatch(getTopHashtag());
  }, [dispatch]);

  useEffect(() => {
    if (!search.loading) history.push('/');
  }, [search, history]);

  const openPreview = (item: publicationType) => {
    setPreviewVisible(!previewVisible);
    setPreviewPubs(item);
  };

  const getUserByPubs = (post: publicationType, username: boolean): profileType | string => {
    const user = data.users.filter((author) => author.id === post.author.id)[0];
    if (user === undefined)
      return (username) ? data.myProfile.username : data.myProfile;
    else
      return (username) ? user.username : user;
  };

  return (
    <Row type="flex" align="middle" justify="center">
      <Col span={24} className="text-center">
        <h1>Search</h1>
      </Col>
      <Col sm={18} xs={24}>
        <List
          header={(
            <h3 className="title-h1">
              List of publications by hashtags&nbsp;
              <Tag>{search.posts_hashtag.length}</Tag>
            </h3>
          )}
          grid={{
            gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
          }}
          dataSource={search.posts_hashtag}
          renderItem={(post: publicationType) => (
            <List.Item>
              <Card
                bordered
                title={
                  <Button type="link" icon="user" onClick={() => history.push('/profile', getUserByPubs(post, false))}>{getUserByPubs(post, true)}</Button>
                }
                className="card-pubs"
              >
                <img onClick={() => openPreview(post)} src={post.imageUrl} width={200} height={200} alt="" />
              </Card>
            </List.Item>
          )}
        />
        <List
          header={(
            <h3 className="title-h1">
              List of publications by descriptions&nbsp;
              <Tag>{search.posts_desc.length}</Tag>
            </h3>
          )}
          grid={{
            gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
          }}
          dataSource={search.posts_desc}
          renderItem={(post: publicationType) => (
            <List.Item>
              <Card
                bordered
                title={
                  <Button type="link" icon="user" onClick={() => history.push('/profile', getUserByPubs(post, false))}>{getUserByPubs(post, true)}</Button>
                }
                className="card-pubs"
              >
                <img onClick={() => openPreview(post)} src={post.imageUrl} width={200} height={200} alt="" />
              </Card>
            </List.Item>
          )}
        />
        {previewPubs && previewVisible
          && (
            <PreviewPubs
              previewPubs={previewPubs}
              previewVisible={previewVisible}
              toggle={() => setPreviewVisible(!previewVisible)}
              isMe={false}
            />
          )}
        {search.users_list
          && (
            <List
              grid={{
                gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
              }}
              header={(
                <h3 className="title-h1">
                  Result of users&nbsp;
                  <Tag>{search.users_list.length}</Tag>
                </h3>
              )}
              itemLayout="horizontal"
              dataSource={search.users_list}
              renderItem={(user: profileType) => (
                <List.Item onClick={() => history.push('/profile', data.users.filter((author) => author.id === user.id)[0])} className="list-item" >
                  <Card
                    bordered
                    className="card-user"
                  >
                    <List.Item.Meta
                      avatar={<Avatar size={40} src={user.profilePic} icon="user" />}
                      title={(<b>{`${user.firstname} ${user.lastname}`}</b>)}
                      description={user.username}
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
      </Col>
    </Row >
  );
};

export default Search;
