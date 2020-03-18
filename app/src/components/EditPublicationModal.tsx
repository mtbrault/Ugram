import React, { useState } from 'react';
import { Modal, message } from 'antd/es';
import { useDispatch } from 'react-redux';
import { getMyProfile, updatePost } from '../store/actions';
import InputComponent from './InputComponent';
import MentionsTagsComponent from './MentionsTagsComponent';
import { publicationType } from '../types';

interface EditPublicationModal {
  pubs: publicationType;
  toggleModal(): void;
  visible: boolean;
}

const EditPublicationModal: React.FC<EditPublicationModal> = ({ visible, toggleModal, pubs }) => {
  const [description, setDescription] = useState(pubs.description);
  const [mentions] = useState(pubs.mentions);
  const [hashtags] = useState(pubs.hashtags);
  const [newMentions, setNewMentions] = useState('');
  const [newHashtags, setNewHashtags] = useState('');
  const dispatch = useDispatch();

  const updateThis = () => {
    const updatedMentions: Array<string> = (newMentions !== '') ? newMentions.split(' ') : [];
    const updatedHashtags: Array<string> = (newHashtags !== '') ? newHashtags.split(' ') : [];
    const data = {
      imageUrl: pubs.imageUrl,
      description,
      hashtags: updatedHashtags,
      mentions: updatedMentions,
    };

    for (const hashtag in updatedHashtags) {
      if (updatedHashtags[hashtag].substring(0, 1) !== '#'
        && updatedHashtags[hashtag].length < 3) {
        message.error(`Hashtag must start with # or longer than [${updatedHashtags[hashtag]}]`, 5);
        return;
      }
    }
    dispatch(updatePost(pubs.id, data))
      .then(() => {
        message.success('Picture well updated', 5);
        dispatch(getMyProfile());
        toggleModal();
      },
      (err) => {
        message.error(err.response.data.message, 5);
      });
  };

  return (
    <Modal
      title="Edit picture"
      okText="Edit"
      visible={visible}
      onOk={updateThis}
      onCancel={() => toggleModal()}
    >
      <InputComponent id="description" title="Description" type="text" value={description} onChange={setDescription} />
      <MentionsTagsComponent type="mentions" title="Mention a user" value={mentions.join(' ')} setValue={setNewMentions} />
      <MentionsTagsComponent type="tags" title="Hashtags" value={hashtags.join(' ')} setValue={setNewHashtags} />
    </Modal>
  );
};

export default EditPublicationModal;
