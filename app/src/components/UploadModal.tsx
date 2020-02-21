import React, { useState } from 'react';
import { Modal, Row, Col, Upload, message, Input } from 'antd/es';
import { uploadPost, getMyProfile } from '../store/actions';
import { useDispatch } from 'react-redux';
import InputComponent from './InputComponent';

interface uploadProps {
	toggleModal(): void;
	visible: boolean;
}

const UploadModal: React.FC<uploadProps> = ({ visible, toggleModal }) => {
	const [imageUrl, setUrl] = useState('');
	const [description, setDescription] = useState('');
	const [hashtag, setHashtag] = useState('');
	const [user, setUser] = useState('');
	const dispatch = useDispatch();

	const uploadPicture = () => {
		const hashtags = (hashtag !== '') ? hashtag.split(' ') : [];
		const mentions = (user !== '') ? user.split(' ') : [];
		const data = { imageUrl: 'https://avatars2.githubusercontent.com/u/29895484?s=460&v=4', description, hashtags, mentions };

		for (const hash in hashtags) {
			if (hashtags[hash].substring(0, 1) !== "#") {
				message.error("Hashtag must start with #", 5);
				return;
			}
		}
		dispatch(uploadPost(data))
			.then(() => {
				message.success("Picture well uploaded", 5);
				dispatch(getMyProfile());
				toggleModal();
			})
			.catch((error) => {
				message.error(error.response.data.message, 5);
			})
	}

	return (
		<Modal
			title="Upload a picture"
			okText="Upload"
			visible={visible}
			onOk={uploadPicture}
			onCancel={() => toggleModal()}
		>
			<Row type="flex" align="middle" justify="center">
				<Col span={24} className="text-center">
					<Upload></Upload>
				</Col>
			</Row>
			<InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
			<InputComponent id="hashtag" title="Hashtag" type="text" value={hashtag} onChange={setHashtag} />
			<InputComponent id="users" title="Mention a user" type="text" value={user} onChange={setUser} />
		</Modal>
	);
}

export default UploadModal;