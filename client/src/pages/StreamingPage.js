import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Video from '../components/Video';
import Chat from '../components/Chat';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	@media (max-width: 960px) {
		display: grid;
	}
`;

const VideoWrap = styled.div`
	width: 80%;
	height: 100vh;
	position: relative;

	${(props) => {
		if (props.ChatToggleState) {
			return css`
				width: 80%;
				transition: width 0.3s;
			`;
		} else {
			return css`
				width: 100%;
				transition: width 0.3s;
			`;
		}
	}}

	@media (max-width: 960px) {
		width: 100%;
		height: 65vh;
		${(props) => {
			if (props.ChatToggleState) {
				return css`
					height: 65vh;
					transition: height 0.3s;
				`;
			} else {
				return css`
					height: 100vh;
					transition: height 0.3s;
				`;
			}
		}}
	}
`;

const ChatWrqp = styled.div`
	width: 20%;
	height: 100vh;
	font-size: 20px;
	background-color: red;

	${(props) => {
		if (props.ChatToggleState) {
			return css`
				display: block;
			`;
		} else {
			return css`
				display: none;
			`;
		}
	}}

	@media (max-width: 960px) {
		width: 100%;
		height: 35vh;
	}
`;

const VideoIcon = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	line-height: 6;
	z-index: 2;
`;

const BackBtn = styled.div`
	padding: 5px;
	padding-left: 25px;
	cursor: pointer;
`;

const ChatToggle = styled.div`
	padding: 5px;
	padding-right: 20px;
	cursor: pointer;
	@media (max-width: 960px) {
	}
`;

const StreamingPage = () => {
	const [chatState, setChatState] = useState(true);

	const history = useHistory();

	const goToBack = () => {
		history.push(`/`);
	};

	return (
		<Container>
			<VideoWrap ChatToggleState={chatState}>
				<VideoIcon>
					<BackBtn
						onClick={() => {
							goToBack();
						}}
					>
						<FontAwesomeIcon icon={faArrowLeft} size={'2x'} />
					</BackBtn>
					<ChatToggle
						onClick={() => {
							setChatState(!chatState);
						}}
					>
						{chatState ? (
							<FontAwesomeIcon icon={faStepForward} size={'2x'} />
						) : (
							<FontAwesomeIcon icon={faStepBackward} size={'2x'} />
						)}
					</ChatToggle>
				</VideoIcon>
				<Video></Video>
			</VideoWrap>

			<ChatWrqp ChatToggleState={chatState}>
				<Chat></Chat>
			</ChatWrqp>
		</Container>
	);
};

export default StreamingPage;
