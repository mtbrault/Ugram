import React from 'react';

import { Row, Spin } from 'antd/es';

const Loader = () => (
  <Row type="flex" align="middle" justify="center">
    <Spin size="large" className="text-center spin" />
  </Row>
);
export default Loader;
