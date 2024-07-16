import { useQuery } from "@tanstack/react-query";
import { getPopular, makeImagePath } from "../utils/api";
import { IDataResults, IMovie } from "../utils/types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

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

const Overlay = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	position: fixed;
	top: 0;
`;

const Card = styled(motion.div)`
	overflow: hidden;
	display: flex;
	justify-content: center;
	background-color: #fff;
	color: #000;
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

function Home() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["popular", ""],
		queryFn: () => getPopular(),
	});

	const [clickedMovie, setClickedMovie] = useState<null | IMovie>(null);
	const onClickMovie = (id: number) => {
		const foundMovie = data?.results.find(movie => id === movie.id);
		if (foundMovie) setClickedMovie(foundMovie);
	};
	const toggleModal = () => setClickedMovie(null);

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
					{clickedMovie && (
						<Overlay onClick={toggleModal}>
							<Card layoutId={clickedMovie.id + ""}>
								<img src={makeImagePath(clickedMovie.poster_path)} alt={clickedMovie.title} />
							</Card>
						</Overlay>
					)}
				</>
			)}
		</Container>
	);
}

export default Home;
