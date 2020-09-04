import React, { useState, useEffect } from 'react';
import Poster from './Poster';
import Section from './Section';
import NewModal from './Modal';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
	padding: 15px;
`;
const FavoriteList = ({ setDetailAction, changeModalTrue, changeModalFalse }) => {
	const [movie, setMovie] = useState(null);
	// const detailState = useSelector((state) => state.changeDetaildata, []);
	// const modalState = useSelector((state) => state.changeModalStatus, []);
	console.log('로컬스토리지체크:', localStorage.getItem('token'));
	useEffect(() => {
		axios
			.get('http://ec2-13-125-163-234.ap-northeast-2.compute.amazonaws.com:4000/videos', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => setMovie(res))
			.catch((err) => console.log(err));
	}, []);
	console.log('movie:', movie);
	return (
		<>
			<NewModal changeModalFalse={changeModalFalse}></NewModal>
			<Container>
				<Section title="시청중인 컨텐츠">
					{movie?.data.map((movie, index) => {
						let favoriteMovie = {
							id: movie.id,
							poster_path: movie.thumbnail,
							original_title: movie.title,
							release_date: movie.releaseDay,
							runningTime: movie.runningTime,
							overview: movie.detail,
						};
						return (
							<Poster
								setDetailAction={setDetailAction}
								key={index}
								movie={favoriteMovie}
								changeModalTrue={changeModalTrue}
							></Poster>
						);
					})}
				</Section>
			</Container>
		</>
	);
};
export default FavoriteList;
