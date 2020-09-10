import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Detail from './Detail';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const TrueContainer = styled.div`
	display: block;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	@media (max-width: 667px) {
		background-color: rgba(0, 0, 0);
	}
`;
const FalseContainer = styled.div`
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
	background-image: url(${(props) => props.bgUrl});
	float: left;
	background-size: cover;
	border-radius: 4px;
	background-position: center center;
	transition: opacity 0.1s linear;
	position: relative;
	margin: 10% auto;
	width: 100%;
	height: 60vh;
	min-height: 450px;
	@media (max-width: 375px) {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: -35px;
	}
	@media (min-width: 376px) and (max-width: 667px) {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: -70px;
	}
`;

const BGIMG = styled.div`
	padding: 20px;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`;

const PlayBtn = styled.button`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	padding: 10px 25px;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
		4px 4px 5px 0px rgba(0, 0, 0, 0.1);
	border: none;
	color: black;
	background-color: white;
	cursor: pointer;
	font-size: 15px;
	position: absolute;
	bottom: 30px;
	left: 20px;
	&:hover {
		background-color: #900c3f;
		color: white;
	}
	@media (min-width: 376px) and (max-width: 667px) {
		position: absolute;
		bottom: 90px;
	}
`;

const PreviewBtn = styled.a`
	width: 90px;
	height: 40px;
	border-radius: 5px;
	padding: 10px 25px;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
		4px 4px 5px 0px rgba(0, 0, 0, 0.1);
	border: none;
	color: white;
	background-color: gray;
	cursor: pointer;
	font-size: 15px;
	position: absolute;
	bottom: 30px;
	left: 170px;
	line-height: 1.3;
	&:hover {
		background-color: #900c3f;
		color: white;
	}
	@media (max-width: 667px) {
		display: none;
	}
`;

const NewModal = ({ changeModalFalse }) => {
	const storeState = useSelector((state) => state.changeDetaildata, []);
	const history = useHistory();

	const createRoom = () => {
		let token = localStorage.getItem('token');

		axios
			.post(
				'http://ec2-15-164-214-96.ap-northeast-2.compute.amazonaws.com:4000/rooms',
				{
					video_id: storeState.id,
					end_time: 0,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				console.log(res.data.roomname);
				history.push(`/streaming/:${res.data.roomname}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const playButton = () => {
		changeModalFalse();
		createRoom();
	};

	const modalState = useSelector((state) => state.changeModalStatus, []);

	// themoviedb api 영상불러오기
	// const [youtube, setYoutube] = useState(null);
	// useEffect(() => {
	// 	moviesApi.youtubeVideo(storeState.id).then((response) => {
	// 		console.log(response);
	// 		setYoutube(`https://youtu.be/${response.data.results[0].key}`);
	// 	});
	// }, []);

	return (
		<>
			{modalState === true ? (
				<TrueContainer>
					<ModalContent bgUrl={storeState.poster}>
						<BGIMG>
							<Detail changeModalFalse={changeModalFalse}></Detail>

							<PlayBtn onClick={() => playButton()}>
								<FontAwesomeIcon icon={faPlay} />
								{`  PLAY`}
							</PlayBtn>
							<PreviewBtn href="https://www.youtube.com" target="_blank" rel="noopener" primary>
								예고편
							</PreviewBtn>
						</BGIMG>
					</ModalContent>
				</TrueContainer>
			) : (
				<FalseContainer>
					<ModalContent></ModalContent>
				</FalseContainer>
			)}
		</>
	);
};
export default NewModal;