import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
	position: relative;
`;

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
	width: 60vw;
	height: 45vh;
	max-width: 700px;
	position: absolute;
	top: 70px;
	right: 60px;
`;
const Detail = ({ changeModalFalse }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	const [size, setSize] = useState([]);

	const useWindowSize = () => {
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	};

	const [width] = useWindowSize();

	return (
		<Container>
			<ModalHeader>
				<Title>{storeState.title}</Title>
				<Close onClick={() => changeModalFalse()}>X</Close>
			</ModalHeader>
			<DescriptionWrap>
				{width < 961 ? (
					<Description>
						{storeState.description.length > 300
							? `${storeState.description.substring(0, 300)}...`
							: storeState.description}
					</Description>
				) : (
					<Description>{storeState.description}</Description>
				)}
			</DescriptionWrap>
			<Video
				src={storeState.video}
				autoPlay
				// controls="controls"
				muted
				poster={storeState.poster}
			></Video>
		</Container>
	);
};
export default Detail;
