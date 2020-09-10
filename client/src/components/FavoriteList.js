import React, { useState, useEffect } from 'react';
import Poster from './Poster';
import Section from './Section';
import NewModal from './Modal';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
	padding-left: 30px;
	padding-top: 20px;
	margin-bottom: 50px;
	@media (max-width: 667px) {
		padding-top: 10px;
	}
`;

const FavoriteList = ({ setDetailAction, changeModalTrue, changeModalFalse }) => {
	const [movie, setMovie] = useState(null);
	useEffect(() => {
		axios
			.get('http://ec2-15-164-214-96.ap-northeast-2.compute.amazonaws.com:4000/videos', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => setMovie(res))
			.catch((err) => console.log(err));
	}, []);

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
							video: movie.url,
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
