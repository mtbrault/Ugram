import React, { useEffect } from 'react';
import { getAllUsers } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { storeTypes, profileType } from '../types'

const Home: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch])

  const usersList = useSelector<storeTypes, profileType[]>((store) => store.profileReducers.listUser);

  return (
    <>
      {usersList.map((user, index) => (
        <div key={index}>
          {user.username}
          {user.firstname}
        </div>
      ))}
    </>
  )
};

export default Home;
