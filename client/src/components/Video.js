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
	const options = {
		controls: true,
		muted: true,
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
			player.on('ended', () => {
				console.log('ended');
			});

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
				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});

			player.controlBar.progressControl.children_[0].on('click', () => {
				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});
		});
	}, []);

	useEffect(() => {
		const player = videojs(videoPlayerRef.current);
		socket.on('receiveSeeked', (value) => {
			player.currentTime(value.currentTime);
			// url로 중간에 스트리밍화면에 진입한 유저에게 재생상태에 맞춰 비디오 컨트롤
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

		/* 
			@Description  url로 스트리밍화면에 진입한 사람에게 현재 동영상 위치를 알려주는 기능
		                  서버가 임의의 유저를 고른 대상만 이벤트가 발생함 
			@params       { string } target 
		*/
		socket.on('currentVideoPosition', ({ target }) => {
			// target(url 진입한 소켓 Id) , currentTime(현재 동영상 위치) , status(동영상 재생여부)를 서버에 전달
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
