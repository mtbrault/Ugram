import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import {
  List, Avatar, Button, Tag, Card, Col, Row,
} from 'antd/es';
import { getAllUsers, getAllPost } from '../store/actions';
import {
  storeTypes, profileType, initialProfile, postList, publicationType,
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

  const loadMore = (
    <div className="text-center load-more">
      <Button onClick={onLoadMore} icon={loading ? 'loading' : 'plus'}>Loading more</Button>
    </div>
  );

  return (
    <Row type="flex" align="middle" justify="center">
      <Col span={16}>
        <List
          header={(
            <h3 className="title-h1">
              List of publications&nbsp;
              <Tag>{postsList.posts.length}</Tag>
            </h3>
          )}
          grid={{ gutter: 16, column: 4 }}
          dataSource={postsList.posts}
          renderItem={(post: publicationType) => (
            <List.Item>
              <Card
                title={
                  <Button type="link" icon="user" onClick={() => console.log('username')/* history.push('/profile', ) */}>Username</Button>
                }
                className="card-pubs"
                onClick={() => openPreview(post)}
              >
                <img src={post.imageUrl} alt="" />
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
              bordered
              size="small"
              className="users-list"
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
                  <List.Item.Meta
                    avatar={<Avatar className="user-avatar-list" src={user.profilePic || undefined} />}
                    title={(<b>{`${user.firstname} ${user.lastname}`}</b>)}
                    description={user.username}
                  />
                </List.Item>
              )}
            />
          )}
      </Col>
    </Row>
  );
};

export default Home;
