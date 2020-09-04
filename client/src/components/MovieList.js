import React, { useState, useEffect } from 'react';
import Poster from './Poster';
import { moviesApi } from '../containers/moviesApi';
import Section from './Section';
import NewModal from './Modal';
import styled from 'styled-components';

const Container = styled.div`
	padding: 15px;
`;
const MovieList = ({ setDetailAction, changeModalTrue, changeModalFalse }) => {
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		moviesApi.nowPlaying().then((response) => {
			setMovie(response);
		});
	}, []);

	return (
		<>
			<NewModal changeModalFalse={changeModalFalse}></NewModal>
			<Container>
				<Section title="Now Playing">
					{movie?.data.results.map((movie, index) => {
						return (
							<Poster
								setDetailAction={setDetailAction}
								key={index}
								movie={movie}
								changeModalTrue={changeModalTrue}
							></Poster>
						);
					})}
				</Section>
			</Container>
		</>
	);
};
export default MovieList;
