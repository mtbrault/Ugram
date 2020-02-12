import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Col, Row, Card, Icon,
} from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { getMyProfile } from '../store/actions';

import { storeTypes } from '../types/storeTypes';
import { profileType } from '../types/profileTypes';
import LoaderLottie from '../components/LoaderLottie';
import ProfilModal from '../components/ProfilModal';

interface ProfileProps {
  history: History;
  location: {
    state: profileType;
  };
}

const Profile: React.FC<ProfileProps> = ({ history, location }) => {
  const [modalVisible, setVisible] = useState(false);
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history]);

  const me = useSelector<storeTypes, profileType>((store) => store.profileReducers.myProfile);
  const data = (location.state) ? location.state : me;


  const toggleModal = () => {
    setVisible(!modalVisible);
  };

  const editResult = (message: string) => {
    setSuccess(message);
  };

  if (!data.username) {
    return <LoaderLottie />;
  }

  return (
    <>
      <ProfilModal toggleModal={toggleModal} visible={modalVisible} onSuccess={editResult} data={data} />
      <Row type="flex" align="middle" justify="center">
        <Col span={16}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col span={12}>
                <Row type="flex" align="middle">
                  <Col span={12} className="text-center">
                    <Avatar size={100} icon="user" className="profil-pic" />
                    <h3>{`${data.firstname} ${data.lastname}`}</h3>
                  </Col>
                  <Col span={12}>
                    <Row type="flex" align="middle">
                      <p>{data.username}</p>
                      <p>{data.email}</p>
                      <p>{data.phoneNumber}</p>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={12} className="text-center">
                <Button type="ghost" icon="setting" onClick={() => setVisible(true)}>
                  Edit account
                </Button>
              </Col>
              <p style={{ color: 'green' }}>{success}</p>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={14}>
          <Col span={24} className="container text-center">
            <h2>
              <Icon type="save" />
              <span className="span-icon">Publications</span>
            </h2>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
