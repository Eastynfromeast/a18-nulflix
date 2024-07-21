import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IDataResults, IMovie } from "../../utils/types";
import MovieModal from "./MovieModal";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isCardOpen } from "../../utils/atom";
import MovieCard from "./MovieCard";

const MovieGrid = styled(motion.ul)`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(80px, 280px));
	gap: 15px;
	justify-content: center;
`;

const moviesVarianst = {
	initial: { opacity: 0, y: 50 },
	animate: {
		opacity: 1,
		y: 1,
		transition: {
			type: "spring",
			staggerChildren: 0.3,
			delayChildren: 0.3,
			duration: 1,
		},
	},
};

const movieVariants = {
	initial: { opacity: 0, scaleX: 0 },
	animate: { opacity: 1, scaleX: 1, originX: 0, transition: { duration: 0.3 } },
};

const titleVariants = {
	hover: { opacity: 1, transition: { delay: 0.2 } },
};

function MovieList(data: IDataResults) {
	const [clickedMovie, setClickedMovie] = useState<null | number>(null);
	const setIsCardOpen = useSetRecoilState(isCardOpen);
	const onClickMovie = (id: number) => {
		setClickedMovie(id);
		setIsCardOpen(true);
	};
	const closeModal = () => {
		setClickedMovie(null);
		setIsCardOpen(false);
	};

	return (
		<>
			<MovieGrid variants={moviesVarianst} initial="initial" animate="animate">
				<AnimatePresence>
					{data.results.map((movie: IMovie) => (
						<MovieCard key={movie.id} movie={movie} onClickMovie={onClickMovie} />
					))}
				</AnimatePresence>
			</MovieGrid>
			{clickedMovie && <MovieModal closeModal={closeModal} clickedMovie={clickedMovie} />}
		</>
	);
}

export default MovieList;
