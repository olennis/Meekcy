import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import videojs from 'video.js';
import seekButtons from 'videojs-seek-buttons';
import qualityselector from '@silvermine/videojs-quality-selector';
import 'video.js/dist/video-js.min.css';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
	// const videoSrc = storeState.video;
	// const poster = storeState.poster;

	return (
		<Container>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}

			<video
				id="my-video"
				className="video-js vjs-default-skin vjs-big-play-centered"
				controls
				preload="auto"
				data-setup="{}"
				style={{ width: '100%', height: '100%' }}
			>
				<source
					src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
					// src={videoSrc}
					type="video/mp4"
					label="720P"
				></source>
				<source
					src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
					// src={videoSrc}
					type="video/mp4"
					label="480P"
				></source>
				<source
					src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
					// src={videoSrc}
					type="video/mp4"
					label="360P"
				></source>
			</video>
		</Container>
	);
};
export default Video;
