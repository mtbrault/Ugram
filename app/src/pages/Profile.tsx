import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Col, Row, Card, Icon, Modal, message, Upload,
} from 'antd/es';
import { getMyProfile, updateProfile } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { UploadFile } from 'antd/es/upload/interface';
import { storeTypes } from '../types/storeTypes';
import { initialProfile } from '../types/profileTypes';
import LoaderLottie from '../components/LoaderLottie';

import InputComponent from '../components/InputComponent';

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState('');
  const [modalError, setModalError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const data = useSelector<storeTypes, initialProfile>((store) => store.profileReducers);

  useEffect(() => {
    setEmail(data.email);
    setName(data.name);
    setPhone(data.phoneNumber);
    setImage(data.profilePicture);
  }, [data])

  if (!data) {
    return <LoaderLottie />
  }

  const getBase64 = (img: Blob, callback: (imageUrl: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setUploading(false);
        setImage(imageUrl);
      });
    }
  };

  const updateProfil = () => {
    dispatch(updateProfile({ name, email, phoneNumber, profilePicture: image }))
      .then(() => {
        setSuccess('Profile well updated');
        setEditModal(false)
      })
      .catch(() => setModalError('Error during update'));
  }

  const EditProfil: React.FC = () => (
    <Modal
      title="Edit your account"
      okText="Update"
      visible={editModal}
      onOk={updateProfil}
      confirmLoading={false}
      onCancel={() => setEditModal(false)}
    >
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="text-center">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ width: 0 }}
          >
            {image ? <Avatar src={image} size={100} /> : <Avatar size={100} icon={uploading ? 'loading' : 'user'} />}
          </Upload>
        </Col>
      </Row>
      <InputComponent id="email" title="EMail" type="text" value={email} onChange={setEmail} />
      <InputComponent id="name" title="Fullname" type="text" value={name} onChange={setName} />
      <InputComponent id="phone" title="Phone number" type="tel" value={phoneNumber} onChange={setPhone} />
      <p style={{ color: 'red' }}>{modalError}</p>
    </Modal>
  );

  return (
    <>
      {editModal && <EditProfil />}
      <Row type="flex" align="middle" justify="center">
        <Col span={14}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col span={12} className="text-center">
                <Avatar size={100} icon="user" />
                <span className="span-icon">{data.username}</span>
                <span className="span-icon">{data.email}</span>
                <span className="span-icon">{data.phoneNumber}</span>
                <span className="span-icon">{data.name}</span>
                <span className="span-icon">{data.registerDate}</span>
              </Col>
              <Col span={12} className="text-center">
                <Button type="ghost" icon="setting" onClick={() => setEditModal(true)}>
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
