import React from 'react';
import { Col, Mentions, Row } from 'antd/es';

interface MentionsTagsComponentProps {
  title: string;
  type: string;
  value: string;
  usersList?: string;
  setValue(e: string): void;
}

const MentionsTagsComponent: React.FC<MentionsTagsComponentProps> = ({
  title, type, value, setValue, usersList,
}) => {
  const onSelect = (val: string) => {
    const res = val.trim();
    setValue(res);
  };

  const hashtagsExample = ['ULaval', 'ugram', '2020', 'winter'];

  return (
    <Row type="flex" justify="center" className="input-container">
      <Col span={20}>
        <b>{title}</b>
        {type === 'mentions' && (
          <Mentions
            placeholder="Add space between users"
            onChange={(value) => onSelect(value)}
          />
        )}
        {type === 'tags' && (
          <Mentions
            placeholder="input # to write hashtags"
            prefix="#"
            defaultValue={value || '#'}
            onChange={(value) => onSelect(value)}
          >
            {hashtagsExample.map((hashtag, key) => (
              <Mentions.Option key={key} value={hashtag}>{`#${hashtag}`}</Mentions.Option>
            ))}
          </Mentions>
        )}
      </Col>
    </Row>
  );
};

export default MentionsTagsComponent;
