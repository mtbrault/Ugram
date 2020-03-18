import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { History } from 'history';
import {
  Avatar, Button, Card, Col, List, Row, Tag,
} from 'antd/es';
import {
  initialProfile, initialSearch, postList, profileType, publicationType, storeTypes,
} from '../types';
import PreviewPubs from '../components/PreviewPubs';

interface SearchProps {
  history: History;
}

const Search: React.FC<SearchProps> = ({ history }) => {
  const search = useSelector<storeTypes, initialSearch>((store) => store.searchReducers);

  return (
    <Row type="flex" align="middle" justify="center">
      <Col span={24} className="text-center">
        <h1>Search</h1>
      </Col>
      <Col sm={18} xs={24}>
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

export default Search;
