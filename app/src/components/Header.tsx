import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Input, Row } from 'antd/es';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import { History } from 'history';

interface HeaderProps {
	history: History;
}

const Header: React.FC<HeaderProps> = ({ history }) => {

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) history.push('/login');
	}, [history]);

	const logout = () => {
		Cookies.remove('token');
		history.push('/login');
	}

	return (
		<Row type="flex" align="middle" justify="center" className="header-container">
			<Col span={6} onClick={() => history.push('/home')}>
				<h1 className="title-h1 title-header">UGram</h1>
			</Col>
			<Col span={12}>
				<Input.Search
					placeholder="Search by username or hashtag here"
					onSearch={(value) => console.log(value)}
				/>
			</Col>
			<Col span={3}>
				<Button type="ghost" icon="user" onClick={() => history.push('/profile')}>
					Profil
     			</Button>
			</Col>
			<Col span={3}>
				<Button type="danger" icon="logout" onClick={logout}>
					Logout
      			</Button>
			</Col>
		</Row>
	)
};

export default withRouter(Header);
