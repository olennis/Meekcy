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

const Video = () => {
	useEffect(() => {
		var player = videojs('my-video');
		qualityselector(videojs);
		player.seekButtons({
			forward: 3,
			back: 2,
		});
		console.log('player.seekButton:', player.seekButtons);
		player.controlBar.addChild('QualitySelector');
	}, []);
	const storeState = useSelector((state) => state.changeDetaildata, []);

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
				{}
				<source
					label="720p"
					src="https://meekcy2.s3.ap-northeast-2.amazonaws.com/video/avengers/1080/output.m3u8"
					type="application/x-mpegURL"
				/>
				{/* <source
					label="480p"
					src="https://meekcy2.s3.ap-northeast-2.amazonaws.com/video/reply-1997/main.m3u8"
					type="application/x-mpegURL"
				/>

				<source
					label="360p"
					src="https://meekcy2.s3.ap-northeast-2.amazonaws.com/video/reply-1997/main.m3u8"
					type="application/x-mpegURL"
				/> */}
			</video>
		</Container>
	);
};
export default Video;
