import React from 'react';
import styled from 'styled-components';
import { Popover, Avatar } from 'antd';
import 'antd/dist/antd.dark.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Chat = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;
const ChatHeader = styled.div`
	width: 100%;
	display: flex;
	border-radius: 3px;
	justify-content: space-between;
	align-items: center;
	background-color: #262626;
	line-height: 1.8;
	@media (min-width: 961px) and (max-width: 1291px) {
		justify-content: space-between;
	}
	@media (max-width: 823px) and (max-height: 540px) {
		justify-content: space-between;
		font-size: 13px;
		display: block;
		height: 5%;
		padding: 4% 0 3% 0;
		margin: 0;
		width: 100%;
	}
`;
const ChatHeaderTitle = styled.span`
	margin-right: 3px;
`;
const HeaderRightWrap = styled.div`
	width: 100%;
	display: flex;
	font-size: 20px;
	align-items: center;
	justify-content: space-between;
	padding-left: 4%;

	@media (max-width: 823px) and (max-height: 540px) {
		height: 10px;
		font-size: 10px;
		padding-bottom: 1%;
	}
`;
const Participant = styled.span`
	padding: 2px 0 2px 10px;
	font-size: 8px;
	width: 35px;
	border: solid 1px white;
	border-radius: 8px;
	display: fixed;
	position: absolute;
	right: 0;
	bottom: 0;
	margin: 0 3% 5vh 0;
	@media (max-width: 823px) and (max-height: 540px) {
		margin: 0 3% 6vh 0;
	}
`;
const ClipWrap = styled.div`
	cursor: pointer;
	padding: 0px 15px 0px 0px;
	&:hover {
		color: gray;
	}
	@media (max-width: 823px) and (max-height: 540px) {
		padding: 5px 4px 4px 15px;
		size: 5px;
	}
`;
const ChatHeaderProfile = styled(Popover)`
	margin-right: 20px;
	cursor: pointer;
	&:hover {
		color: gray;
	}
`;
const ChatHeaderProfileButton = styled(Avatar)`
	@media (max-width: 823px) and (max-height: 540px) {
		font-size: 1px;
	}

	height: 30px;
	width: 30px;
`;
const ChatChatpg = styled.div`
	flex: 1;
	overflow: auto;
	padding: 10px 0px;
`;
const ChatChatpgMessage = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 0px 5px 10px;
	word-break: break-word;
	@media (max-width: 823px) and (max-height: 540px) {
	}
`;
const MessageProfile = styled(Avatar)`
	min-width: 20px;
	min-height: 20px;
	width: 20px;
	height: 20px;
	color: red;
	@media (max-width: 823px) and (max-height: 540px) {
		min-width: 10px;
		min-height: 10px;
		width: 13px;
		height: 13px;
	}
`;
const MessageText = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding-left: 5px;
`;
const MessageTextName = styled.div``;
const MessageTextExplain = styled.div`
	width: 100%;
`;
const MessageTextChating = styled.div`
	font-size: 14px;
`;
const MessageTextCaption = styled.div`
	font-size: 12px;
	color: gray;
`;
const ChatForm = styled.form``;
const ChatFormInput = styled.input`
	border-left-width: 0;
	border-right-width: 0;
	border-top-width: 0;
	border-bottom-width: 1;
	background-color: #333333;
	font-size: 18px;
	border-radius: 3px;
	border-bottom: 1.2px solid;
	width: 100%;
	height: 3vh;
	padding: 3px 5px 3px 10px;
	margin: 1px;
	&:focus {
		outline: none;
	}
	&:hover {
		border-bottom: 1px solid #900c3f;
	}

	@media (max-width: 823px) and (max-height: 540px) {
		font-size: 13px;
		height: 4vh;
	}
`;

const Chatting = ({
	sendMessageEnterEvent,
	chatList,
	handleChange,
	popoverAvatarClickEvent,
	avatars,
	copyLinkClickEvent,
	changeAvartarClickEvent,
	myinfo,
	chatPg,
	chatInput,
	participant,
}) => {
	return (
		<Chat>
			<ChatHeader>
				<HeaderRightWrap>
					<ClipWrap onClick={copyLinkClickEvent}>
						<FontAwesomeIcon icon={faPaperclip} size={'1x'} />
					</ClipWrap>
					<ChatHeaderTitle>MEEKCY</ChatHeaderTitle>

					<ChatHeaderProfile
						content={avatars.map((value, index) => {
							return (
								<ChatHeaderProfileButton
									key={index}
									size="32"
									id={value.id}
									src={value.url}
									onClick={changeAvartarClickEvent}
								></ChatHeaderProfileButton>
							);
						})}
						placement="left"
						title="Avatar"
						trigger="click"
					>
						<FontAwesomeIcon
							icon={faUserCircle}
							onClick={popoverAvatarClickEvent}
							size={'1x'}
						></FontAwesomeIcon>
					</ChatHeaderProfile>
				</HeaderRightWrap>
			</ChatHeader>
			<Participant>
				<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
				{participant}
			</Participant>
			<ChatChatpg id="chatpg" ref={chatPg}>
				{chatList.map(({ value }, index) => {
					return (
						<ChatChatpgMessage key={index}>
							<MessageProfile src={value.avatar}></MessageProfile>
							<MessageText>
								<MessageTextName>{value.username}</MessageTextName>
								<MessageTextExplain>
									{value.message ? (
										<MessageTextChating>{value.message}</MessageTextChating>
									) : (
										<MessageTextCaption>{value.caption}</MessageTextCaption>
									)}
								</MessageTextExplain>
							</MessageText>
						</ChatChatpgMessage>
					);
				})}
			</ChatChatpg>
			<ChatForm onSubmit={sendMessageEnterEvent} autoComplete="off">
				<ChatFormInput
					id="chatInput"
					onChange={handleChange}
					placeholder="Type messages..."
					autoComplete="off"
					ref={chatInput}
				></ChatFormInput>
			</ChatForm>
		</Chat>
	);
};
export default Chatting;
