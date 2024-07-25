import styled from "styled-components";
import { IDataResults } from "../utils/types";
import MovieList from "../components/movies/MovieList";
import { useMatch } from "react-router-dom";
import SearchResult from "../components/search/SearchResult";

const Container = styled.div`
	position: relative;
	padding: 15px;
	padding-top: 160px;
	@media only screen and (max-width: 480px) {
		padding-top: 200px;
	}
`;

interface IScreenProps {
	movies: IDataResults;
	keyword?: string | null;
}

function ScreenLayout({ movies, keyword = null }: IScreenProps) {
	const searchMatch = useMatch("/search");
	return (
		<Container>
			{" "}
			{searchMatch && <SearchResult keyword={keyword === null ? "no keyword" : keyword} resultLength={movies?.results.length} />}
			{movies && (
				<>
					<MovieList {...movies} />
				</>
			)}
		</Container>
	);
}

export default ScreenLayout;
