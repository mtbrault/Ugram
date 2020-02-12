import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Col, Row, Card, Icon,
} from 'antd/es';
import { getMyProfile } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { storeTypes } from '../types/storeTypes';
import { profileType } from '../types/profileTypes';
import LoaderLottie from '../components/LoaderLottie';
import ProfilModal from '../components/ProfilModal';

interface ProfileProps {
  history: History
}

const Profile: React.FC<ProfileProps> = ({ history }) => {
  const [modalVisible, setVisible] = useState(false);
  const [success, setSuccess] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history])

  const data = useSelector<storeTypes, profileType>((store) => store.profileReducers);

  if (!data.username) {
    return <LoaderLottie />
  }

  const toggleModal = () => {
    setVisible(!modalVisible);
  }

  const editResult = (message: string) => {
    setSuccess(message);
  }

  return (
    <>
      <ProfilModal toggleModal={toggleModal} visible={modalVisible} onSuccess={editResult} data={data} />
      <Row type="flex" align="middle" justify="center">
        <Col span={14}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col span={12} className="text-center">
                <Avatar size={100} icon="user" />
                <span className="span-icon">{data.username}</span>
                <span className="span-icon">{data.email}</span>
                <span className="span-icon">{data.phoneNumber}</span>
                <span className="span-icon">{data.firstname}</span>
                <span className="span-icon">{data.lastname}</span>
                <span className="span-icon">{data.createdAt}</span>
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
