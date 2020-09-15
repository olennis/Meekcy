import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: process.env.REACT_APP_APIKEY,
		language: 'en-US',
	},
});

export const moviesApi = {
	nowPlaying: () => api.get('movie/now_playing'),
	upcoming: () => api.get('movie/upcoming'),
	popular: () => api.get('movie/popular'),
	movieDetail: (id) =>
		api.get(`movie/${id}`, {
			params: {
				append_to_response: 'videos',
			},
		}),
	search: (term) =>
		api.get('search/movie', {
			params: {
				query: encodeURIComponent(term),
			},
		}),
	//youtubeVideo: (id) => api.get(`/movie/${id}/videos`),
};
