import React, { useEffect, useState } from 'react';
import {
  Col, List, Modal, Row, Tag, message, Comment, Form, Button,
} from 'antd/es';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { commentType, publicationType, storeTypes } from '../types';
import FooterPreviewPubs from './FooterPreviewPubs';
import {
  deletePost, getMyProfile, getCommentById, addComment,
} from '../store/actions';

interface PreviewPubs {
  previewPubs: publicationType;
  previewVisible: boolean;
  toggle(): void;
  editPubs?: () => void;
  isMe?: boolean;
}

interface EditorProps {
  onChange(e: any): void;
  onSubmit(): void;
  value: string;
}

interface CommentListProps {
  comments: commentType[];
}

const Editor: React.FC<EditorProps> = ({
  onChange, onSubmit, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const formatDate = (createdAtDate: string): string => {
  const newDate = new Date(createdAtDate);
  return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <Comment
        author={comment.author.username}
        content={comment.content}
        datetime={formatDate(comment.createdAt)}
      />
    )}
  />
);

const PreviewPubs: React.FC<PreviewPubs> = ({
  previewPubs, toggle, previewVisible, editPubs, isMe,
}) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector<storeTypes, commentType[]>((store) => store.commentReducers.comments);

  useEffect(() => {
    dispatch(getCommentById(previewPubs.id));
  }, [dispatch, previewPubs]);

  const addNewComment = () => {
    dispatch(addComment(previewPubs.id, newComment));
  };

  const deleteThis = () => {
    dispatch(deletePost(previewPubs.id))
      .then(
        () => {
          message.success('Picture well deleted', 3);
          dispatch(getMyProfile());
          toggle();
        },
        (err) => {
          message.error(err.response.data.message, 3);
        },
      );
  };

  const convertMentions = (): string[] => {
    const mentionArray: string[] = [];
    previewPubs.mentions.forEach((element) => {
      mentionArray.push(element.username);
    });
    return mentionArray;
  };

  const handleChange = (e: any) => setNewComment(e.target.value || '');

  const handleSubmitComment = () => {
    if (newComment.length === 0) return;
    addNewComment();
  };

  return (
    <Modal
      width={
        (previewPubs?.description || previewPubs?.hashtags.length !== 0 || previewPubs?.mentions.length !== 0) ? 520 : 'fit-content'
      }
      visible={previewVisible}
      footer={isMe ? <FooterPreviewPubs updatePic={editPubs} deletePic={deleteThis} /> : null}
      onCancel={toggle}
    >
      <Row type="flex" align="middle">
        <Col xs={24} md={12} className="text-center">
          <img src={previewPubs.imageUrl || ''} width={200} height={200} alt="" />
        </Col>
        {(previewPubs?.description || previewPubs?.hashtags.length !== 0 || previewPubs?.mentions.length !== 0) && (
          <Col xs={24} md={12}>
            {previewPubs?.description && (
              <div>
                <b>Description:</b>
                <p>{previewPubs?.description}</p>
              </div>
            )}
            {previewPubs?.hashtags.length !== 0 && (
              <div>
                <b>Hashtag:</b>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={previewPubs?.hashtags}
                  renderItem={(tag) => (
                    <List.Item>
                      <Tag>{`#${tag}`}</Tag>
                    </List.Item>
                  )}
                />
              </div>
            )}
            {previewPubs?.mentions.length !== 0 && (
              <div>
                <b>Mention:</b>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={convertMentions()}
                  renderItem={(user) => (
                    <List.Item>
                      <Tag>{`@${user}`}</Tag>
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Col>
        )}
        <Col span={24}>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmitComment}
            value={newComment}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default PreviewPubs;
