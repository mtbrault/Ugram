import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, Card, Col, Icon, Row, Upload, Spin, List,
} from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { getMyProfile } from '../store/actions';
import Loader from "../components/Loader";

import { storeTypes } from '../types/storeTypes';
import { profileType, publicationType } from '../types/profileTypes';
import ProfilModal from '../components/ProfilModal';
import PreviewPubs from '../components/PreviewPubs';
import UploadModal from '../components/UploadModal';

interface ProfileProps {
  history: History;
  location: {
    state: profileType;
  };
}

const Profile: React.FC<ProfileProps> = ({ history, location }) => {
  const [modalVisible, setVisible] = useState(false);
  const [upload, setUpload] = useState(false);
  const [isMe] = useState(!(location.state && location.state.username));
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPubs, setPreviewPubs] = useState<publicationType>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history]);

  const me = useSelector<storeTypes, profileType>((store) => store.profileReducers.myProfile);
  const data = (location.state && location.state.username) ? location.state : me;
  const toggleModal = () => {
    setVisible(!modalVisible);
  };

  const toggleUpload = () => {
    setUpload(!upload);
  }

  const formatDate = (createdAtDate: string): string => {
    const newDate = new Date(createdAtDate);
    return `${(newDate.getDay()).toString()}/${(newDate.getMonth()).toString()}/${(newDate.getFullYear()).toString()}`;
  };

  const openPreview = (item: publicationType) => {
    setPreviewVisible(!previewVisible);
    setPreviewPubs(item);
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  if (!data.username) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {modalVisible && <ProfilModal toggleModal={toggleModal} visible={modalVisible} data={data} />}
      {upload && <UploadModal toggleModal={toggleUpload} visible={upload} />}
      <Row type="flex" align="middle" justify="center">
        <Col span={16}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col span={14}>
                <Row type="flex" justify="space-between">
                  <Col span={10} className="text-center">
                    <Avatar size={100} icon="user" className="profil-pic" />
                    <h3>{`${data.firstname} ${data.lastname}`}</h3>
                  </Col>
                  <Col span={13}>
                    <p>
                      <Icon type="user" className="p-icon" />
                      {data.username}
                    </p>
                    <p>
                      <Icon type="mail" className="p-icon" />
                      {data.email}
                    </p>
                    <p>
                      <Icon type="phone" className="p-icon" />
                      {data.phoneNumber}
                    </p>
                    <p>
                      <Icon type="calendar" className="p-icon" />
                      {formatDate(data.createdAt)}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col span={10} className="text-center">
                {isMe && <Button type="ghost" icon="setting" onClick={() => setVisible(true)}>Edit account</Button>}
                {isMe && <Button type="ghost" icon="setting" onClick={() => setUpload(true)}>Upload a picture</Button>}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={16}>
          <Col span={24} className="container text-center">
            <h2>
              <Icon type="save" />
              <span className="span-icon">Publications</span>
            </h2>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={data.publications}
              renderItem={(item) => (
                <List.Item>
                  <Card className="card-pubs" onClick={() => openPreview(item)}>
                    <img src={item.url} alt="" />
                  </Card>
                </List.Item>
              )}
            />
            {previewPubs && previewVisible
              && (
                <PreviewPubs
                  previewPubs={previewPubs}
                  previewVisible={previewVisible}
                  onCancel={() => setPreviewVisible(false)}
                  isMe={isMe}
                />
              )}
            {/* {isMe && uploadButton} */}
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
