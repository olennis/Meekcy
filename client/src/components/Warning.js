import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #262626;
`;

const IconWrap = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 500px;
	height: 500px;
	background: transparent;
	border: 3px solid #3c3c3c;
	border-radius: 50%;
	text-align: center;
	line-height: 350px;
	font-family: sans-serif;
	font-size: 40px;
	color: #900c3f;
	letter-spacing: 4px;
	text-transform: uppercase;
	text-shadow: 0 0 10px #900c3f;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Message = styled.div`
	position: absolute;
	top: 63%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	height: 300px;
	border: 0px solid #3c3c3c;
	border-radius: 50%;
	text-align: center;
	font-size: 20px;
	color: white;
	letter-spacing: 4px;
	text-transform: uppercase;
	line-height: 1.5;
`;

const Warning = () => {
	return (
		<Container>
			<IconWrap>Warning</IconWrap>
			<Message>
				2개 이상의 브라우저나 탭에서 Meekcy를 이용하고 계십니다. 필요없는 브라우저나 탭을 닫으신 후
				페이지를 다시 로드해 주세요.
			</Message>
		</Container>
	);
};

export default Warning;
