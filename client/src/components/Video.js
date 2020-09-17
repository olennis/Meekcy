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
import { socket } from '../pages/StreamingPage';
import axios from 'axios';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Video = ({ videoUrl, videoPlayerRef, socket, history }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	//videojs options추가,m3u8 샘플 찾아서 구현
	const options = {
		fluid: true,
		controls: true,
		muted: true,
		aspectRatio: '16:9',
		sources: [
			{
				// src: `${videoUrl.url}`,
				src: 'https://meekcyvideo.s3.ap-northeast-2.amazonaws.com/s3/video/avengers/master.m3u8',
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
	const saveVideoHistory = async () => {
		socket.disconnect();
		let token = localStorage.getItem('token');
		let player = videojs(videoPlayerRef.current);
		let currentTime = player.currentTime();

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
		history.push('/');
	};

	useEffect(() => {
		//리액트일때 사용법 찾기
		//옵션값 넣는 법 찾기
		const player = videojs(videoPlayerRef.current, options, () => {
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
				displayCurrentQuality: true,
			});
			if (storeState.endTime) {
				player.currentTime(storeState.endTime);
			}
			// player.on('seeking', () => {
			// 	player.pause();
			// 	socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			// });

			player.controlBar.playToggle.on('click', () => {
				console.log('playbuttonclickevent');
				if (player.controlBar.playToggle.controlText_ === 'Play') {
					console.log('play');
					socket.emit('sendChangePlay');
				} else {
					console.log('pause');
					socket.emit('sendChangePause');
				}
			});

			player.controlBar.progressControl.on('click', () => {
				console.log(player.currentTime());

				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});

			player.controlBar.progressControl.children_[0].on('click', () => {
				console.log(player.currentTime());

				socket.emit('sendChangeSeeked', { currentTime: player.currentTime() });
			});
			console.log(player.controlBar);
			console.log(player.controlBar.seekBack);
			console.log(player.seekButtons());
		});
	}, []);
	useEffect(() => {
		window.addEventListener('beforeunload', saveVideoHistory);
		window.history.pushState(null, '', window.location.href);
		window.onpopstate = () => {
			history.go(1);
			saveVideoHistory();
		};

		return () => {
			window.removeEventListener('beforeunload', saveVideoHistory);
			window.onpopstate = null;
		};
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
