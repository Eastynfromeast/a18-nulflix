const API_KEY = "538b777273f0fd37c37dfdd6101c1a53";
const ORIGINAL_URL = "https://api.themoviedb.org/3";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzhiNzc3MjczZjBmZDM3YzM3ZGZkZDYxMDFjMWE1MyIsIm5iZiI6MTcyMTMwNzk0NC4wMzQ4MjMsInN1YiI6IjY1Zjk1ODY1Nzk4Yzk0MDE2MjE1ODY5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F77RIxSQoEJ6mt-OAQc7Yo1_vNPtTIuj-SLxiaJkqNY",
	},
};

export function getPopular() {
	return fetch(`${ORIGINAL_URL}/movie/popular?api_key=${API_KEY}`).then(r => r.json());
}

export function getNowPlaying() {
	return fetch(`${ORIGINAL_URL}/movie/now_playing?api_key=${API_KEY}`).then(r => r.json());
}

export function getComingSoon() {
	return fetch(`${ORIGINAL_URL}/movie/upcoming?api_key=${API_KEY}`).then(r => r.json());
}

export function getMovie(id: number) {
	return fetch(`${ORIGINAL_URL}/movie/${id}?api_key=${API_KEY}`).then(r => r.json());
}

export function getSearchedMovie(keyword: string) {
	return fetch(`${ORIGINAL_URL}/search/movie?query=${keyword}`, options).then(r => r.json());
}

export function makeImagePath(image: string) {
	return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string) {
	return `https://image.tmdb.org/t/p/original${image}`;
}
