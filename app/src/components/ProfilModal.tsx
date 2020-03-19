import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar, Col, Row, Modal, message, Upload,
} from 'antd/es';
import { UploadFile } from 'antd/es/upload/interface';
import InputComponent from './InputComponent';
import { updateProfile, getMyProfile } from '../store/actions';
import { profileType } from '../types/profileTypes';


/* const S3 = require('react-aws-s3');

export const AWS_PUBLIC_KEY = 'AKIAJQA27VI6RCZTG2NQ';
export const AWS_SECRET_KEY = '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';
export const S3_BUCKET_NAME = 'ugram-assets';
export const S3_BUCKET_URL = 'https://ugram-asset.s3.us-east-2.amazonaws.com/';
export const AWS_REGION = 'us-east-2';

export const configS3 = () => ({
  bucketName: S3_BUCKET_NAME,
  region: AWS_REGION,
  accessKeyId: AWS_PUBLIC_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  s3Url: S3_BUCKET_URL,
}); */

interface ModalProps {
  toggleModal(): void;
  visible: boolean;
  data: profileType;
}

const ProfilModal: React.FC<ModalProps> = ({
  toggleModal, visible, data,
}) => {
  const [image, setImage] = useState(data.profilePic);
  const [email, setEmail] = useState(data.email);
  const [firstname, setFirstname] = useState(data.firstname);
  const [lastname, setLastname] = useState(data.lastname);
  const [phoneNumber, setPhone] = useState(data.phoneNumber);
  const dispatch = useDispatch();

  const beforeUpload = (file: UploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!', 5);
    }
    const isLt2M = (file.size / 1024 / 1024) < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 50KO!', 5);
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleChange = async (info: any) => {
    if (!beforeUpload(info.file)) return;
    const b64 = await getBase64(info.file.originFileObj);

    if (!b64) {
      message.error('Problem while uploading image', 5);
      return;
    }
    info.file.preview = b64;
    setImage(info.file.preview);
  };

  const updateProfil = () => {
    if (firstname === '' || lastname === '' || email === '' || phoneNumber === '') {
      message.error('Please fill all the fields', 5);
    } else {
      dispatch(updateProfile({
        firstname, lastname, email, phoneNumber, profilePic: image,
      }))
        .then(() => {
          message.success('Profile well updated', 5);
          dispatch(getMyProfile());
          toggleModal();
        })
        .catch((err) => message.error(err.message, 5));
    }
  };

  return (
    <Modal
      title="Edit your account"
      okText="Update"
      visible={visible}
      onOk={updateProfil}
      onCancel={() => toggleModal()}
    >
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="text-center">
          <Upload
            id="avatar"
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
            style={{ width: 0 }}
          >
            {image ? <Avatar src={image} size={100} /> : <Avatar size={100} icon="user" />}
          </Upload>
        </Col>
      </Row>
      <InputComponent id="email" title="EMail" type="text" value={email} onChange={setEmail} />
      <InputComponent id="firstname" title="Firstname" type="text" value={firstname} onChange={setFirstname} />
      <InputComponent id="lastname" title="Lastname" type="text" value={lastname} onChange={setLastname} />
      <InputComponent id="phone" title="Phone number" type="tel" value={phoneNumber} onChange={setPhone} />
    </Modal>
  );
};

export default ProfilModal;
