import React, { useState } from 'react';
import {
  Button, Avatar, Col, Row, Card, Icon, Modal, message, Upload,
} from 'antd/es';

import InputComponent from '../components/InputComponent';

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [email, setEmail] = useState('mehdi.makhloufi@epitech.eu');
  const [name, setName] = useState('Mehdi Makhloufi');
  const [phoneNumber, setPhone] = useState('+33786579690');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');


  const getBase64 = (img: Blob, callback: (arg0: string | ArrayBuffer | null) => any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
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
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        // setImage(imageUrl);
        setUploading(false);
      });
    }
  };

  const EditProfil : React.FC = () => (
    <Modal
      title="Edit your account"
      okText="Update"
      visible={editModal}
      onOk={() => setEditModal(false)}
      confirmLoading={false}
      onCancel={() => setEditModal(false)}
    >
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="text-center">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ width: 0 }}
          >
            {image ? <Avatar src={image} size={100} /> : <Avatar size={100} icon="user" />}
          </Upload>
        </Col>
      </Row>
      <InputComponent id="email" title="EMail" type="text" value={email} onChange={setEmail} />
      <InputComponent id="name" title="Fullname" type="text" value={name} onChange={setName} />
      <InputComponent id="phone" title="Phone number" type="tel" value={phoneNumber} onChange={setPhone} />
    </Modal>
  );

  return (
    <>
      <EditProfil />
      <Row type="flex" align="middle" justify="center">
        <Col span={14}>
          <Card bordered>
            <Row type="flex" align="middle" justify="center">
              <Col span={12} className="text-center">
                <Avatar size={100} icon="user" />
                <span className="span-icon">username</span>
              </Col>
              <Col span={12} className="text-center">
                <Button type="ghost" icon="setting" onClick={() => setEditModal(true)}>
                  Edit account
                </Button>
              </Col>
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
