import { useQuery } from "@tanstack/react-query";
import { getMovie, getPopular, makeBgPath, makeImagePath } from "../utils/api";
import { IDataResults, IMovie } from "../utils/types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Container = styled.div`
	position: relative;
	padding: 15px;
`;

const MainVisual = styled(motion.div)`
	width: 100%;
	margin: 0 auto 30px;
	text-align: center;
`;

const MovieGrid = styled(motion.ul)`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(80px, 280px));
	gap: 15px;
	justify-content: center;
`;

const Movie = styled(motion.li)`
	overflow: hidden;
	border-radius: 25px;
	text-align: center;
	img {
		width: 100%;
	}
`;

const Overlay = styled(motion.div)<{ $bgPhoto: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.$bgPhoto}) no-repeat;
	background-size: cover;
`;

const Card = styled(motion.div)`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	color: ${props => props.theme.textColor};
	width: 50%;
	height: 50%;
	max-width: 480px;
	min-height: 720px;
	border-radius: 25px;
	img {
		width: 100%;
		object-fit: cover;
	}
`;

const PosterCard = styled(Card)<{ $bgPhoto: string }>`
	background-image: url(${props => props.$bgPhoto});
`;

const ContextCard = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 7px;
	padding: 0 20px 50px;
	font-size: 16px;
	word-break: keep-all;
	background-color: rgba(0, 0, 0, 0.75);
	h2 {
		font-weight: 600;
		font-size: 2.5em;
		margin-bottom: 15px;
	}
`;

const Genres = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

const SmallTitle = styled.span`
	display: block;
	width: 100%;
	font-weight: 500;
	opacity: 0.75;
	margin-top: 15px;
`;

const Overview = styled.p`
	line-height: 1.35;
`;

function Home() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["popular", ""],
		queryFn: () => getPopular(),
	});
	const [clickedMovie, setClickedMovie] = useState<null | number>(null);
	const onClickMovie = (id: number) => {
		setClickedMovie(id);
	};
	const closeModal = () => setClickedMovie(null);

	return (
		<Container>
			{" "}
			{isLoading && <p>...is Loading</p>}
			{data && (
				<>
					<MainVisual>
						<img src={makeImagePath(data.results[0].poster_path)} alt={data.results[0].title} />
						<div> {data.results[0].title}</div>
					</MainVisual>
					<MovieGrid>
						{data.results.slice(1).map((movie: IMovie) => (
							<Movie layoutId={movie.id + ""} key={movie.id} onClick={() => onClickMovie(movie.id)}>
								<img src={makeImagePath(movie.poster_path)} alt={movie.title} />
								<h3>{movie.title}</h3>
							</Movie>
						))}
					</MovieGrid>
					{clickedMovie && <MovieCard onOverlayClick={closeModal} clickedMovie={clickedMovie} />}
				</>
			)}
		</Container>
	);
}

export default Home;
