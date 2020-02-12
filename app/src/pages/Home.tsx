import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { List, Avatar, Button } from 'antd/es';
import { getAllUsers } from '../store/actions';
import { storeTypes, profileType } from '../types';

interface HomeProps {
  history: History;
}

const Home: React.FC<HomeProps> = ({ history }) => {
  // eslint-disable-next-line max-len
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // eslint-disable-next-line max-len
  const usersList = useSelector<storeTypes, profileType[]>((store) => store.profileReducers.listUser);
  const [data, setData] = useState(usersList);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setData(data.concat(usersList));
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    }, 3000);
  };

  const loadMore = !loading ? (
    <Button onClick={onLoadMore} className="text-list">loading more</Button>
  ) : null;

  return (
    <List
      bordered
      size="small"
      className="users-list"
      header={<h3 className="title-h1">List of users</h3>}
      footer={<h3 className="title-h1">{`Total: ${usersList.length}`}</h3>}
      itemLayout="horizontal"
      dataSource={data}
      loadMore={loadMore}
      renderItem={(user) => (
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
