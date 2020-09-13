import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import videojs from 'video.js';
import seekButtons from 'videojs-seek-buttons';
import 'videojs-contrib-quality-levels';
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector';

import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
import styled from 'styled-components';
import { socket } from '../pages/StreamingPage';
const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Video = ({ videoUrl }) => {
	console.log('src:', videoUrl.url);
	//videojs options추가,m3u8 샘플 찾아서 구현

	const videoPlayerRef = useRef(null);
	const options = {
		fluid: true,
		controls: true,
		muted: true,
		aspectRatio: '16:9',
		sources: [
			{
				src: `${videoUrl.url}`,
				// src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
				type: 'application/x-mpegURL',
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
				displayCurrentQuality: false,
			});

			console.log('Player Ready', player);
		});
	}, []);
	useEffect(() => {
		window.onunload = function () {
			//var player = videojs(videoTag.current);
			var player = videojs('my-video');
			let currentTime = player.currentTime();

			socket.emit('sendLastVideoCurrnetTime', { currentTime });
		};
	}, []);
	return (
		<Container>
			<video
				ref={videoPlayerRef}
				className="video-js vjs-default-skin vjs-big-play-centered"
				style={{ width: '100%', height: '100%' }}
			></video>
		</Container>
	);
};
export default Video;
