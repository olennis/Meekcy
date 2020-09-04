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
	/* float: right; */
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
	/* background-color: green; */
	width: 25%;
	padding: 20px 0px;
`;

const Description = styled.div`
	color: white;
	font-size: 13px;
	line-height: 1.8;
`;
// const BGIMG = styled.div`
// 	padding: 20px;
// 	width: 100%;
// 	height: 100%;
// 	background-color: rgba(0, 0, 0, 0.8);
// `;
// const ModalContent = styled.div`
// 	background-image: url(${(props) => props.bgUrl});
// 	float: left;
// 	background-size: cover;
// 	border-radius: 4px;
// 	background-position: center center;
// 	transition: opacity 0.1s linear;
// 	position: relative;
// 	margin: 10% auto; /* 15% from the top and centered */
// 	width: 100%;
// 	height: 60vh;
// 	min-height: 450px;
// `;

const Detail = ({ changeModalFalse }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	console.log('detail:', storeState);
	return (
		<Container>
			<ModalHeader>
				<Title>{storeState.title}</Title>
				<Close onClick={() => changeModalFalse()}>X</Close>
			</ModalHeader>
			{/* <Image bgUrl={`https://image.tmdb.org/t/p/w300${storeState.poster}`}></Image> */}
			<DescriptionWrap>
				<Description>{storeState.description}</Description>
			</DescriptionWrap>
		</Container>
	);
};
export default Detail;
