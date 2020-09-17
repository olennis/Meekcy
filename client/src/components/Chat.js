import React from 'react';
import styled from 'styled-components';
import { Popover, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Chat = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;
const ChatHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #333333;
	line-height: 1.8;
`;
const ChatHeaderTitle = styled.span`
	@media (min-width: 376px) and (max-width: 667px) {
		display: none;
	}
`;
const HeaderLeftWrap = styled.div`
	display: flex;
	font-size: 14px;
`;
const Participant = styled.div`
	@media (min-width: 376px) and (max-width: 667px) {
		display: none;
	}
`;
const ClipWrap = styled.div`
	cursor: pointer;
	padding: 0px 15px 0px 20px;
`;
const ChatHeaderProfile = styled(Popover)`
	margin-right: 20px;
`;

const ChatChatpg = styled.div`
	flex: 1;
	overflow: scroll;
	padding: 10px 0px;
`;
const ChatChatpgMessage = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 0px 5px 10px;
	word-break: break-word;
	@media (min-width: 376px) and (max-width: 667px) {
		overflow: auto;
		overflow-x: hidden;
	}
`;
const MessageProfile = styled(Avatar)`
	min-width: 30px;
	min-height: 30px;
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
	border-bottom: 1.2px solid;
	width: 100%;
	height: 4vh;
	padding: 3px 5px 3px 10px;
	&:focus {
		outline: none;
	}
	@media (min-width: 376px) and (max-width: 667px) {
		font-size: 13px;
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
				<HeaderLeftWrap>
					<ClipWrap onClick={copyLinkClickEvent}>
						<FontAwesomeIcon icon={faPaperclip} size={'1x'} />
					</ClipWrap>
					<Participant>
						<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
						{` ${participant}`}
					</Participant>
				</HeaderLeftWrap>
				<ChatHeaderTitle>Meekcy Party</ChatHeaderTitle>
				<ChatHeaderProfile
					content={avatars.map((value, index) => {
						return (
							<Avatar
								key={index}
								size="32"
								id={value.id}
								src={value.url}
								onClick={changeAvartarClickEvent}
							></Avatar>
						);
					})}
					placement="left"
					title="Avatar"
					trigger="click"
				>
					<FontAwesomeIcon icon={faUserCircle} onClick={popoverAvatarClickEvent}></FontAwesomeIcon>
				</ChatHeaderProfile>
			</ChatHeader>
			<ChatChatpg id="chatpg" ref={chatPg}>
				{chatList.map(({ value }, index) => {
					return (
						<ChatChatpgMessage key={index}>
							<MessageProfile src={value.avatar}></MessageProfile>
							<MessageText>
								<MessageTextName>{value.nickname}</MessageTextName>
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
