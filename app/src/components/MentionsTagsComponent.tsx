import React, { useState } from 'react';
import { Col, Mentions, Row } from 'antd/es';

interface MentionsTagsComponentProps {
  title: string;
  type: string;
  value?: string;
  setValue(e: string): void;
}

const arrayUserName = ['mehdmhd', 'matthieu_bg'];
const hashtagsExample = ['Université Laval', 'ugram', '2020'];

const MentionsTagsComponent: React.FC<MentionsTagsComponentProps> = ({
  title, type, value, setValue,
}) => {
  const [mentioned, setMentioned] = useState(false);

  const onSelect = (value: string) => {
    setMentioned(true);
    setValue(value);
  };

  return (
    <Row type="flex" justify="center" className="input-container">
      <Col span={20}>
        <b>{title}</b>
        {type === 'mentions' && (
        <Mentions
          placeholder="input @ to mention people"
          defaultValue={value || '@'}
          onSelect={({ value }) => onSelect(value || '')}
        >
          {arrayUserName.map((username, key) => (
            <Mentions.Option key={key} value={username}>{`@${username}`}</Mentions.Option>
          ))}
        </Mentions>
        )}
        {type === 'tags' && (
        <Mentions
          placeholder="input # to write hashtags"
          prefix='#'
          defaultValue={value || '#'}
          onSelect={({ value }) => onSelect(value || '')}
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
