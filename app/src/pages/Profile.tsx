import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, Card, Col, Icon, Row, List,
} from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { getMyProfile } from '../store/actions';
import Loader from '../components/Loader';

import { storeTypes, profileType, publicationType } from '../types';

import ProfilModal from '../components/ProfilModal';
import PreviewPubs from '../components/PreviewPubs';
import UploadModal from '../components/UploadModal';
import EditPublicationModal from "../components/EditPublicationModal";

interface ProfileProps {
  history: History;
  location: {
    state: profileType;
  };
}

const Profile: React.FC<ProfileProps> = ({ history, location }) => {
  const [modalVisible, setVisible] = useState(false);
  const [upload, setUpload] = useState(false);
  const [edit, setEdit] = useState(false)
  const [isMe, setIsMe] = useState((location.state && location.state.isMe) || !location.state);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPubs, setPreviewPubs] = useState<publicationType>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history]);

  useEffect(() => {
    setIsMe((location.state && location.state.isMe) || !location.state);
  }, [location]);

  const me = useSelector<storeTypes, profileType>((store) => store.profileReducers.myProfile);
  const data = (location.state && location.state.username) ? location.state : me;

  const formatDate = (createdAtDate: string): string => {
    const newDate = new Date(createdAtDate);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  const openPreview = (item: publicationType) => {
    setPreviewVisible(!previewVisible);
    setPreviewPubs(item);
  };

  const editPubs = () => {
    setEdit(true);
    setPreviewVisible(!previewVisible);
  };

  if (!data.username) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {modalVisible && <ProfilModal toggleModal={() => setVisible(!modalVisible)} visible={modalVisible} data={data} />}
      {(previewPubs && edit) ? <EditPublicationModal pubs={previewPubs} toggleModal={() => setEdit(!edit)} visible={edit} /> : null}
      {upload && <UploadModal toggleModal={() => setUpload(!upload)} visible={upload} />}
      <Row type="flex" align="middle" justify="center">
        <Col sm={16} xs={24}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col md={14} sm={16} xs={24}>
                <Row type="flex" justify="space-between">
                  <Col span={10} className="text-center">
                    <Avatar size={100} icon="user" className="profil-pic" src={data.profilePic} />
                    <h3>{`${data.firstname} ${data.lastname}`}</h3>
                  </Col>
                  <Col span={10}>
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
              {isMe && (
                <Col md={10} sm={16} xs={24} className="text-center">
                  <Button type="ghost" icon="setting" onClick={() => setVisible(true)}>Edit account</Button>
                  <br />
                  <br />
                  <Button type="ghost" icon="upload" onClick={() => setUpload(true)}>Upload a picture</Button>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col sm={18} xs={24}>
          <Col span={24} className="container text-center">
            <h2>
              <Icon type="save" />
              <span className="span-icon">Publications</span>
            </h2>
            <List
              grid={{
                gutter: 8, column: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4,
              }}
              dataSource={data.publications}
              renderItem={(item) => (
                <List.Item>
                  <Card bordered className="card-pubs" onClick={() => openPreview(item)}>
                    <img src={item.imageUrl} width={200} height={200} alt="" />
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
                  editPubs={() => editPubs()}
                  isMe={isMe}
                />
              )}
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
