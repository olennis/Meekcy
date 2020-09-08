import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div``;

const ModalHeader = styled.div`
	display: flex;
`;

const Title = styled.div`
	width: 97%;
	font-size: 50px;
	padding-bottom: 10px;
	color: white;
`;

const Close = styled.div`
	color: #aaa;
	margin: 0;
	font-size: 28px;
	font-weight: bold;
	&:hover {
		color: #900c3f;
		text-decoration: none;
		cursor: pointer;
	}
`;

const DescriptionWrap = styled.div`
	width: 25%;
	padding: 20px 0px;
`;

const Description = styled.div`
	color: white;
	font-size: 13px;
	line-height: 1.8;
`;
const Video = styled.video`
	width: 25%;
	height: 15%;
	float: right;
`;
const Detail = ({ changeModalFalse }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	console.log('detail:', storeState);
	return (
		<Container>
			<ModalHeader>
				<Title>{storeState.title}</Title>
				<Close onClick={() => changeModalFalse()}>X</Close>
			</ModalHeader>
			<DescriptionWrap>
				<Description>{storeState.description}</Description>
			</DescriptionWrap>
			<Video src={storeState.video} autoPlay controls="controls" muted></Video>
		</Container>
	);
};
export default Detail;
