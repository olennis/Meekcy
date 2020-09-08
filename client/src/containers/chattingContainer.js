import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chatting from '../components/Chat';
import { socket } from '../pages/StreamingPage';
import { message as antdM } from 'antd';
import axios from 'axios';
const ChattingContainer = (roomName) => {
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

	//message and caption socket.io 통신
	useEffect(() => {
		socket.on('receiveMessage', (value) => {
			console.log(value);

			receivedMessage(value);
			//scroll
			const chatpg = document.getElementById('chatpg');
			chatpg.scrollTop = chatpg.scrollHeight;
		});
	}, []);
	//avatar change socket.io 통신
	useEffect(() => {
		socket.on('receiveChangeAvatar', (value) => {
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
		let roomName = 'testRoom';
		socket.emit('joinRoom', { roomName });
		console.log('client room join');
	}, []);
	//socket으로 받은 메세지를 render하는 chatting state에 추가
	function receivedMessage(message) {
		setMessages((oldMsgs) => [...oldMsgs, message]);
	}
	//message 입력후 server로 socket을 날려주는 이벤트
	const sendMessageEnterEvent = (e) => {
		e.preventDefault();
		const inputBox = document.getElementById('chatInput');
		if (inputBox.value === '') {
			return;
		}
		inputBox.value = '';
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
				.get('/avatars', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setAvatars(res?.data);
				});
		}
		socket.emit('changeAvartar', { changeurl: 'http://naver.com' });
	}
	//나열된 avartar들 중 하나를 클릭하면 해당 url을 server에 전달
	function changeAvartarClickEvent(e) {
		socket.emit('sendChangeAvatar', { user: { avatar: e.target?.src } });
	}
	//링크 복사 click event
	function copyLinkClickEvent() {
		const tempTextArea = document.createElement('textarea');
		tempTextArea.value = 'taeha.com';
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
		/>
	);
};
export default ChattingContainer;
