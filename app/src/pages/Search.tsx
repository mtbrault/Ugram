import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import {
  Avatar, Button, Card, Col, List, Row, Tag,
} from 'antd/es';
import {
  initialProfile, postList, profileType, publicationType, storeTypes,
} from '../types';
import PreviewPubs from '../components/PreviewPubs';

const Search = () => (
  <Row type="flex" align="middle" justify="center">
    <Col sm={18} xs={24}>
      <List
        header={(
          <h3 className="title-h1">
            List of publications search by hashtag&nbsp;
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

export default Search;
