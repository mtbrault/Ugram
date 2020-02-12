import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Col, Row, Card, Icon, Modal, message, Upload,
} from 'antd/es';
import { updateProfile, getMyProfile } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { UploadFile } from 'antd/es/upload/interface';
import { storeTypes } from '../types/storeTypes';
import { profileType } from '../types/profileTypes';
import LoaderLottie from '../components/LoaderLottie';
import { History } from 'history';

import InputComponent from '../components/InputComponent';

interface ProfileProps {
  history: History
}

const Profile: React.FC<ProfileProps> = ({ history }) => {
  const [editModal, setEditModal] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState('');
  const [modalError, setModalError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile())
      .catch(() => history.goBack());
  }, [dispatch, history])

  const data = useSelector<storeTypes, profileType>((store) => store.profileReducers);

  useEffect(() => {
    setEmail(data.email);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhone(data.phoneNumber);
    setImage(data.profilePic);
  }, [data])

  if (!data.username) {
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
    setModalError('');
    if (firstname === '' || lastname === '' || email === '' || phoneNumber === '')
      setModalError('Please fill all the fields');
    dispatch(updateProfile({ firstname, lastname, email, phoneNumber, profilePicture: image }))
      .then(() => {
        setSuccess('Profile well updated');
        setEditModal(false)
      })
      .catch((err) => console.log(err));
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
      <InputComponent id="firstname" title="Firstname" type="text" value={firstname} onChange={setFirstname} />
      <InputComponent id="lastname" title="Lastname" type="text" value={lastname} onChange={setLastname} />
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
                <span className="span-icon">{data.firstname}</span>
                <span className="span-icon">{data.lastname}</span>
                <span className="span-icon">{data.createdAt}</span>
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
