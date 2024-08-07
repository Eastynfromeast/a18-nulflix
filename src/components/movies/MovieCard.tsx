import styled from "styled-components";
import { motion } from "framer-motion";
import { IMovie } from "../../utils/types";
import { makeImagePath } from "../../utils/api";
import defaultImg from "../../assets/img/default_card_nulflix_0.jpg";

const Movie = styled(motion.li)`
	overflow: hidden;
	border-radius: 25px;
	position: relative;
`;

const Thumbnail = styled(motion.img)`
	width: 100%;
	height: 100%;
	border-radius: 25px;
`;

const MovieTitle = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 30px 15px;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
	color: #fff;
	font-size: 16px;
	h3 {
		font-weight: 600;
		font-size: 1.8em;
	}
	p {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 5px;
		font-size: 1.2em;
	}
	opacity: 0;
`;

const Star = styled.svg`
	max-width: 1.25em;
	margin-right: 5px;
	fill: ${props => props.theme.accentColor};
`;

const movieVariants = {
	initial: { opacity: 0, scaleX: 0 },
	animate: { opacity: 1, scaleX: 1, originX: 0, transition: { duration: 0.3 } },
};

const titleVariants = {
	hover: { opacity: 1, transition: { delay: 0.2 } },
};

interface IMovieCardProps {
	movie: IMovie;
	onClickMovie: (id: number) => void;
}

function MovieCard({ movie, onClickMovie }: IMovieCardProps) {
	return (
		<Movie
			layoutId={movie.id + ""}
			variants={movieVariants}
			whileHover={{ y: -25, scale: 1.15, zIndex: 99, transition: { type: "spring", duration: 0.3 } }}
			key={movie.id}
			onClick={() => onClickMovie(movie.id)}
		>
			<Thumbnail src={movie.poster_path ? makeImagePath(movie.poster_path) : defaultImg} alt={movie.title} />
			<MovieTitle variants={titleVariants} whileHover="hover">
				<p>
					<Star viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path
							clipRule="evenodd"
							fillRule="evenodd"
							d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
						/>
					</Star>
					{movie.vote_average.toFixed(2)}
				</p>
				<h3>{movie.title}</h3>
			</MovieTitle>
		</Movie>
	);
}

export default MovieCard;
