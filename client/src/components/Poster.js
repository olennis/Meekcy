import React from 'react';
import styled from 'styled-components';
const Image = styled.div`
	background-image: url(${(props) => props.bgUrl});
	height: 180px;
	background-size: cover;
	border-radius: 4px;
	background-position: center center;
	transition: opacity 0.1s linear;
`;
const Title = styled.span`
	display: block;
	margin-bottom: 3px;
`;
const Year = styled.span`
	font-size: 10px;
`;
const Rating = styled.span`
	bottom: 5px;
	right: 5px;
	position: absolute;
	opacity: 0;
	transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
	margin-bottom: 5px;
	position: relative;
	&:hover {
		${Image} {
			opacity: 0.3;
		}
		${Rating} {
			opacity: 1;
		}
	}
`;
const Container = styled.div`
	font-size: 12px;
`;
const Poster = ({ changeModalTrue, movie, setDetailAction }) => {
	return (
		<div>
			<span
				onClick={() => {
					changeModalTrue();
					setDetailAction(movie);
				}}
			>
				<Container key={movie.id}>
					<ImageContainer>
						<Image bgUrl={movie.poster_path} />{' '}
						<Rating>
							<span role="img" aria-label="rating">
								⭐️
							</span>{' '}
							{movie.vote_average}
						</Rating>
					</ImageContainer>
					<Title>
						{movie.original_title.length > 18
							? `${movie.original_title.substring(0, 18)}...`
							: movie.original_title}
					</Title>
					<Year>{movie.release_date}</Year>
				</Container>
			</span>
		</div>
	);
};
export default Poster;
