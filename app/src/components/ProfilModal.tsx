import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Avatar, Col, Row, Modal, message, Upload,
} from 'antd/es';
import { UploadFile } from 'antd/es/upload/interface';
import InputComponent from './InputComponent';
import { updateProfile } from '../store/actions';
import { profileType } from '../types/profileTypes';

interface ModalProps {
	toggleModal(): void;
	visible: boolean;
	onSuccess(e: string): void;
	data: profileType;
}

const ProfilModal: React.FC<ModalProps> = ({ toggleModal, visible, onSuccess, data }) => {

	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState(data.profilePic);
	const [email, setEmail] = useState(data.email);
	const [firstname, setFirstname] = useState(data.firstname);
	const [lastname, setLastname] = useState(data.lastname);
	const [phoneNumber, setPhone] = useState(data.phoneNumber);
	const [error, setError] = useState('');
	const dispatch = useDispatch();

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
		setError('');
		if (firstname === '' || lastname === '' || email === '' || phoneNumber === '')
			setError('Please fill all the fields');
		dispatch(updateProfile({ firstname, lastname, email, phoneNumber, profilePicture: image }))
			.then(() => {
				onSuccess('Profile well updated');
				toggleModal();
			})
			.catch((err) => setError(err.message));
	}
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
			<p style={{ color: 'red' }}>{error}</p>
		</Modal>
	)
};

export default ProfilModal;