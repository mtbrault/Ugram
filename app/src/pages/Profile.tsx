import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, Card, Col, Icon, Row, Upload, Spin,
} from 'antd/es';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { getMyProfile } from '../store/actions';

import { storeTypes } from '../types/storeTypes';
import { profileType } from '../types/profileTypes';
import ProfilModal from '../components/ProfilModal';

interface ProfileProps {
  history: History;
  location: {
    state: profileType;
  };
}

const Profile: React.FC<ProfileProps> = ({ history, location }) => {
  const [modalVisible, setVisible] = useState(false);
  const [isMe, setMe] = useState(!location.state);
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([{
    uid: '-1',
    name: 'image.png',
    status: undefined,
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    size: 1000,
    type: 'image/jpeg',
  }, {
    uid: '-2',
    name: 'image.png',
    status: undefined,
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    size: 1000,
    type: 'image/jpeg',
  }]);

  const handleChange = (picList: any) => setFileList(picList);

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history]);

  const me = useSelector<storeTypes, profileType>((store) => store.profileReducers.myProfile);
  const data = (isMe) ? me : location.state;

  const toggleModal = () => {
    setVisible(!modalVisible);
  };

  const formatDate = (createdAtDate: string): string => {
    const newDate = new Date(createdAtDate);
    return `${(newDate.getDay()).toString()}/${(newDate.getMonth()).toString()}/${(newDate.getFullYear()).toString()}`;
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  if (!data.username) {
    return (
      <Row type="flex" align="middle" justify="center">
        <Spin size="large" className="text-center spin" />
      </Row>
    );
  }

  return (
    <>
      {modalVisible && <ProfilModal toggleModal={toggleModal} visible={modalVisible} data={data} />}
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
            <Row type="flex">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={() => console.log('preview')}
                onChange={handleChange}
              >
                {uploadButton}
              </Upload>
              {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal> */}
            </Row>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
