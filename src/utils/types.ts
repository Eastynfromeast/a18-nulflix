export interface IGenre {
	id: number;
	name: string;
}

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids?: number[];
	genres?: IGenre[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	vote_average: number;
}

export interface IDataResults {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IMovieDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: string;
	budget: number;
	genres: IGenre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
	production_countries: { iso_3166_1: string; name: string }[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
	status: string;
	tagline: string;
	title: string;
	video: false;
	vote_average: number;
}
