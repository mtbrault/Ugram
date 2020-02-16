import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import {
  List, Avatar, Button, Tag,
} from 'antd/es';
import { getAllUsers } from '../store/actions';
import { storeTypes, profileType, initialProfile } from '../types';

interface HomeProps {
  history: History;
}

const Home: React.FC<HomeProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector<storeTypes, initialProfile>((store) => store.profileReducers);

  useEffect(() => {
    if (!data.users[0]) dispatch(getAllUsers(data.next));
  }, [dispatch, data]);

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(getAllUsers(data.next));
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
      loadMore={loadMore}
      renderItem={(user: profileType) => (
        <List.Item onClick={() => history.push('/profile', user)} className="list-item">
          <List.Item.Meta
            avatar={<Avatar className="user-avatar-list" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={(<b>{`${user.firstname} ${user.lastname}`}</b>)}
            description={user.username}
          />
        </List.Item>
      )}
    />
  );
};

export default Home;
