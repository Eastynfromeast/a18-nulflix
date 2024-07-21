import styled from "styled-components";
import { IDataResults } from "../utils/types";
import MovieList from "../components/movies/MovieList";
import { useMatch } from "react-router-dom";

const Container = styled.div`
	position: relative;
	padding: 15px;
	padding-top: 160px;
`;

const SearchTitle = styled.div`
	width: 100%;
	padding: 20px 10px 40px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	h3 {
		padding: 0 15px 15px;
		width: auto;
		border-bottom: 1px solid ${props => props.theme.textColor};
	}
	span {
		display: inline-block;
		text-transform: uppercase;
		font-weight: 600;
		color: ${props => props.theme.accentColor};
		margin-left: 7px;
	}
`;

interface IScreenProps {
	movies: IDataResults;
	searchTitle?: string | null;
}

function ScreenLayout({ movies, searchTitle = null }: IScreenProps) {
	const searchMatch = useMatch("/search");
	return (
		<Container>
			{" "}
			{movies && (
				<>
					{searchMatch && (
						<SearchTitle>
							<h3>
								The keyword is <span>&quot;{searchTitle}&quot;</span>
							</h3>
						</SearchTitle>
					)}
					<MovieList {...movies} />
				</>
			)}
		</Container>
	);
}

export default ScreenLayout;
