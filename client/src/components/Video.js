import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import videojs from 'video.js';
import seekButtons from 'videojs-seek-buttons';
import qualityselector from '@silvermine/videojs-quality-selector';
import 'video.js/dist/video-js.min.css';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Video = ({ videoUrl }) => {
	//videojs options추가,m3u8 샘플 찾아서 구현
	useEffect(() => {
		var player = videojs('my-video'); //리액트가 아닐 때 사용 법 , 리액트일때 사용법 찾기
		qualityselector(videojs);
		player.seekButtons({
			forward: 3,
			back: 2,
		});
		console.log('player.seekButton:', player.seekButtons);
		player.controlBar.addChild('QualitySelector');
	}, []);
	const storeState = useSelector((state) => state.changeDetaildata, []);
	console.log('videourl:', videoUrl);
	return (
		<Container>
			<video
				id="my-video"
				className="video-js vjs-default-skin vjs-big-play-centered"
				controls
				preload="auto"
				data-setup="{}"
				style={{ width: '100%', height: '100%' }}
			>
				<source label="720p" src={videoUrl.url_720} type="application/x-mpegURL" />
				{/* <source label="480p" src={videoUrl.url_480} type="application/x-mpegURL" select="true" />

				<source label="360p" src={videoUrl.url_360} type="application/x-mpegURL" /> */}
			</video>
		</Container>
	);
};
export default Video;
