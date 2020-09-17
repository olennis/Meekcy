import React, { useState, useEffect, useRef } from 'react';
import Chatting from '../components/Chat';
import { message as antdM } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ChattingContainer = ({ socket }) => {
	/**
	 * state hook style
	 * avatarPopover : 아바타 설정 popup창 visible상태
	 * message : 현재 작성 message 저장
	 * message : 서버에서 받아온 message 저장
	 */
	const [avatarPopover, setAvatarVisible] = useState(true);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [avatars, setAvatars] = useState([]);
	const [myinfo, setMyinfo] = useState({});
	const [participant, setParticipant] = useState(0);

	const chatPg = useRef(null);
	const chatInput = useRef(null);

	const history = useHistory();
	const roomName = history.location.pathname.substring(7);

	//message and caption socket.io 통신
	useEffect(() => {
		socket.on('receiveMessage', (value) => {
			receivedMessage(value);
			//scroll
			chatPg.current.scrollTop = chatPg.current.scrollHeight;
		});
		socket.on('receiveHistoryMessages', (value) => {
			setMessages(value);
			chatPg.current.scrollTop = chatPg.current.scrollHeight;
		});
	}, []);
	//avatar change socket.io 통신
	useEffect(() => {
		socket.on('receiveChangeAvatar', (value) => {
			console.log(value);
			setMessages((oldMsgs) => {
				const chagedMsg = oldMsgs.map((element) => {
					if (element.value.id === value.userId) {
						element.value.avatar = value.avatar;
					}
					return element;
				});
				return chagedMsg;
			});
		});
	}, []);
	useEffect(() => {
		// streaming page component에서 room정보를 받아 chatting componet에 준다. 받은정보를 이용해 서버의 room 정보를 준다.

		socket.emit('joinRoom', { roomName });
	}, []);
	useEffect(() => {
		socket.on('receiveParticipants', (value) => {
			setParticipant(value.countParticipants);
		});
	});
	//socket으로 받은 메세지를 render하는 chatting state에 추가
	function receivedMessage(message) {
		setMessages((oldMsgs) => [...oldMsgs, message]);
	}
	//message 입력후 server로 socket을 날려주는 이벤트
	const sendMessageEnterEvent = (e) => {
		e.preventDefault();
		if (chatInput.current.value === '') {
			return;
		}
		chatInput.current.value = '';
		setMessage('');
		socket.emit('sendMessage', { message: message });
	};
	//input 창에 text 쓸때마다 현재 메세지 state 변경
	function handleChange(e) {
		setMessage(e.target.value);
	}
	/**avatar 변경을위한 개인 avartar 클릭시 server에서 avatar들의 url을 받아와 배열에 저장 후
	 * props로 넘겨주기위해 저장
	 * popup을 띄어주는
	 */
	function popoverAvatarClickEvent() {
		setAvatarVisible(!avatarPopover);
		if (avatarPopover) {
			const token = localStorage.getItem('token');
			axios
				.get('http://ec2-13-124-190-63.ap-northeast-2.compute.amazonaws.com:4000/avatars', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setAvatars(res?.data);
				});
		}
	}
	//나열된 avartar들 중 하나를 클릭하면 해당 url을 server에 전달
	function changeAvartarClickEvent(e) {
		e.persist();
		const token = localStorage.getItem('token');

		axios
			.patch(
				'http://ec2-13-124-190-63.ap-northeast-2.compute.amazonaws.com:4000/user/profile',
				{
					avatar_id: e.target.parentNode.id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				socket.emit('sendChangeAvatar', { user: { avatar: e.target?.src } });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	//링크 복사 click event
	function copyLinkClickEvent() {
		const tempTextArea = document.createElement('textarea');

		tempTextArea.value = `http://meekcy.s3-website.ap-northeast-2.amazonaws.com/rooms/${roomName}`;
		document.body.appendChild(tempTextArea);
		tempTextArea.focus();
		tempTextArea.select();
		try {
			document.execCommand('copy');
			antdM.success({ content: '링크가 복사되었습니다!', duration: 0.8 });
		} catch (error) {
			antdM.success({ content: '링크복사에 실패하였습니다.', duration: 0.8 });
		}
		document.body.removeChild(tempTextArea);
	}

	return (
		<Chatting
			sendMessageEnterEvent={sendMessageEnterEvent}
			chatList={messages}
			handleChange={handleChange}
			popoverAvatarClickEvent={popoverAvatarClickEvent}
			avatars={avatars}
			copyLinkClickEvent={copyLinkClickEvent}
			changeAvartarClickEvent={changeAvartarClickEvent}
			myinfo={myinfo}
			chatPg={chatPg}
			chatInput={chatInput}
			participant={participant}
		/>
	);
};
export default ChattingContainer;
