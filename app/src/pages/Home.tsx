import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import {
  Avatar, Button, Card, Col, List, Row, Tag,
} from 'antd/es';
import { getAllPost, getAllUsers } from '../store/actions';
import {
  initialProfile, postList, profileType, publicationType, storeTypes,
} from '../types';
import PreviewPubs from '../components/PreviewPubs';

interface HomeProps {
  history: History;
}

const Home: React.FC<HomeProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPubs, setPreviewPubs] = useState<publicationType>();
  const dispatch = useDispatch();
  const data = useSelector<storeTypes, initialProfile>((store) => store.profileReducers);
  const postsList = useSelector<storeTypes, postList>((store) => store.postReducers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const openPreview = (item: publicationType) => {
    setPreviewVisible(!previewVisible);
    setPreviewPubs(item);
  };

  const onLoadMore = () => {
    if (!data.next) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(getAllUsers());
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    }, 3000);
  };

  const getUserByPubs = (post: publicationType, username?: boolean): profileType | string => {
    const user = data.users.filter((author) => author.id === post.author)[0];
    if (user !== undefined) return user.username;
    if (username) return data.myProfile.username;
    return user;
  };

  const loadMore = (
    <div className="text-center load-more">
      <Button onClick={onLoadMore} icon={loading ? 'loading' : 'plus'}>Loading more</Button>
    </div>
  );

  return (
    <Row type="flex" align="middle" justify="center">
      <Col sm={18} xs={24}>
        <List
          header={(
            <h3 className="title-h1">
              List of publications&nbsp;
              <Tag>{postsList.posts.length}</Tag>
            </h3>
          )}
          grid={{
            gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
          }}
          dataSource={postsList.posts}
          renderItem={(post: publicationType) => (
            <List.Item>
              <Card
                bordered
                title={
                  <Button type="link" icon="user" onClick={() => history.push('/profile', getUserByPubs(post))}>{getUserByPubs(post, true)}</Button>
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
        {data.users.length !== 0
        && (
          <List
            grid={{
              gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
            }}
            header={(
              <h3 className="title-h1">
                List of users&nbsp;
                <Tag>{data.users.length}</Tag>
              </h3>
            )}
            itemLayout="horizontal"
            dataSource={data.users}
            loadMore={(data.next) ? loadMore : ''}
            renderItem={(user: profileType) => (
              <List.Item onClick={() => history.push('/profile', user)} className="list-item">
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
    </Row>
  );
};

export default Home;
