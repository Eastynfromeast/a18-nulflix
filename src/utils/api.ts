const BASE_URL = "https://movies-api.nomadcoders.workers.dev";
const API_KEY = "538b777273f0fd37c37dfdd6101c1a53";
const ORIGINAL_URL = "https://api.themoviedb.org/3";

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

export function makeImagePath(image: string) {
	return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string) {
	return `https://image.tmdb.org/t/p/original${image}`;
}
