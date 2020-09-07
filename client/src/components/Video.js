import React from 'react';
import styled from 'styled-components';

const VideoWrap = styled.video.attrs({})`
	width: 100%;
	height: 100%;
`;

const VideoSource = styled.source.attrs({
	src: 'images/test.mp4',
	type: 'video/mp4',
})``;

const Video = () => {
	return (
		<VideoWrap controls autoplay>
			<VideoSource></VideoSource>
		</VideoWrap>
	);
};

export default Video;
