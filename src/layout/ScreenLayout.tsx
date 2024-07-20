import styled from "styled-components";
import { IDataResults } from "../utils/types";
import Loader from "../components/Loader";
import MovieList from "../components/movies/MovieList";

const Container = styled.div`
	position: relative;
	padding: 15px;
`;

interface IScreenProps {
	movies: IDataResults;
}

function ScreenLayout({ movies }: IScreenProps) {
	return (
		<Container>
			{" "}
			{movies && (
				<>
					<MovieList {...movies} />
				</>
			)}
		</Container>
	);
}

export default ScreenLayout;
