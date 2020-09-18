import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import videojs from 'video.js';
import seekButtons from 'videojs-seek-buttons';
import 'videojs-contrib-quality-levels';
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector';

import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
	width: 100%;
	height: 100%;
	@media (min-width: 0) {
		.vjs-big-play-centered .vjs-big-play-button {
			display: none;
		}
	}
`;

const Video = ({ videoUrl, videoPlayerRef, socket, history }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	//videojs options추가,m3u8 샘플 찾아서 구현
	const options = {
		controls: true,
		muted: false,
		sources: [
			{
				src: `${videoUrl.url}`,
				type: 'application/x-mpegurl',
			},
		],
		controlBar: {
			children: [
				'playToggle',
				'volumePanel',
				'progressControl',
				'fullscreenToggle',
				'qualitySelector',
			],
		},
	};
	const saveVideoHistory = () => {
		socket.disconnect();
		let token = localStorage.getItem('token');
		let player = videojs(videoPlayerRef.current);
		let currentTime = player.currentTime();

		axios.post(
			'http://ec2-13-124-190-63.ap-northeast-2.compute.amazonaws.com:4000/videoHistory',
			{
				video_id: storeState.id,
				endTime: currentTime,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		history.go(0);
	};

	useEffect(() => {
		let player = videojs(videoPlayerRef.current, options, () => {
			player.seekButtons({
				forward: 10,
				back: 10,
			});
			player.qualityLevels();
			player.hlsQualitySelector = videojsqualityselector;
			player.hlsQualitySelector({
				displayCurrentQuality: false,
			});
			if (storeState.endTime) {
				player.currentTime(storeState.endTime);
			}

			player.controlBar.playToggle.on('click', () => {
				if (player.controlBar.playToggle.controlText_ === 'Play') {
					socket.emit('sendChangePlay');
				} else {
					socket.emit('sendChangePause');
				}
			});

			player.controlBar.progressControl.on('click', () => {
				// video 재생바를 감싸고 있는 컴트롤바를 클릭하면 소켓을 통해 현재 재생위치를 다른 사용자들과 맞출수있게 재생위치를 전달하는 click이벤트
				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});

			player.controlBar.progressControl.children_[0].on('click', () => {
				// video 재생바를 클릭하면 소켓을 통해 현재 재생위치를 다른 사용자들과 맞출수있게 재생위치를 전달하는 click이벤트
				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});

			player.ready(() => {
				// video데이가 준비된 경우 트리거를 하는 함수
				player.controlBar.seekBack.on('click', () => {
					// video 10초 전 버튼을 클릭하면 소켓을 통해 현재 재생위치를 다른 사용자들과 맞출수있게 재생위치를 전달하는 click이벤트
					socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
				});
				player.controlBar.seekForward.on('click', () => {
					//// video 10초 후 버튼을 클릭하면 소켓을 통해 현재 재생위치를 다른 사용자들과 맞출수있게 재생위치를 전달하는 click이벤트
					socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
				});
			});
		});
	}, []);

	useEffect(() => {
		const player = videojs(videoPlayerRef.current);
		socket.on('receiveSeeked', (value) => {
			player.currentTime(value.currentTime);
			if (value.status === 'play') {
				player.play();
			}
		});
		socket.on('receivePlay', () => {
			player.play();
		});
		socket.on('receivePause', () => {
			player.pause();
		});

		// url로 스트리밍화면 진입한 사람에게 현재 video 시간을 알려주는 트리거 역할
		socket.on('currentVideoPosition', ({ target }) => {
			console.dir(player);
			socket.emit('sendCurrentVideoPosition', {
				currentTime: player.currentTime(),
				target,
				status: player.paused() ? 'pause' : 'play',
			});
		});
	}, []);

	useEffect(() => {
		window.addEventListener('beforeunload', async function (event) {
			socket.disconnect();
			const token = localStorage.getItem('token');
			const player = videojs(videoPlayerRef.current);
			const currentTime = player.currentTime();

			await axios.post(
				'http://ec2-13-124-190-63.ap-northeast-2.compute.amazonaws.com:4000/videoHistory',
				{
					video_id: storeState.id,
					endTime: currentTime,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
		});

		return saveVideoHistory;
	}, []);

	// 다른 사용자가 재생위치를 변경하거나 재생버튼을 누르거나 멈추었을때 소켓을 통해서 환경을 동일하게 적용시켜주는 react의 Effect Hook함수
	useEffect(() => {
		const player = videojs(videoPlayerRef.current);
		socket.on('receiveSeeked', (value) => {
			player.currentTime(value.currentTime);
		});
		socket.on('receivePlay', () => {
			player.play();
		});
		socket.on('receivePause', () => {
			player.pause();
		});
	}, []);

	// video 영상화면을 클릭한 경우 현재 영상의 플레이환경에 따라 소켓을 이용해 다른 사용자들과 맞출수있게 환경을 전달하는 click이벤트에 연결된 메소드
	function overClick(e) {
		const player = videojs(videoPlayerRef.current);
		if (e.target.className === 'vjs-tech') {
			if (player.controlBar.playToggle.controlText_ === 'Play') {
				socket.emit('sendChangePlay');
			} else {
				socket.emit('sendChangePause');
			}
		}
	}

	return (
		<Container>
			<video
				onClick={(e) => {
					overClick(e);
				}}
				ref={videoPlayerRef}
				className="video-js vjs-default-skin vjs-big-play-centered"
				style={{ width: '100%', height: '100%' }}
			></video>
		</Container>
	);
};
export default Video;
