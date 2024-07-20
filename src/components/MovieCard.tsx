import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMovie, makeBgPath, makeImagePath } from "../utils/api";
import { IMovie } from "../utils/types";

const Overlay = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-size: cover;
	@media only screen and (max-width: 480px) {
		flex-direction: column;
		padding: 0 20px;
	}
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
	@media only screen and (max-width: 480px) {
		width: 100%;
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
	@media only screen and (max-width: 480px) {
		position: absolute;
	}
`;

const Infos = styled.div`
	margin-top: 15px;
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
	margin-bottom: 10px;
`;

const Overview = styled.p`
	line-height: 1.35;
`;

const contextVariants = {
	initial: { x: -150, opacity: 0 },
	visible: { x: 0, opacity: 1, transition: { delay: 0.5, duration: 1, type: "spring" } },
	exit: { x: -150, opacity: 0 },
};

interface IProps {
	clickedMovie: number;
	onOverlayClick: () => void;
}

function MovieCard({ clickedMovie, onOverlayClick }: IProps) {
	const { data: movieData, isLoading: isMovieLoading } = useQuery<IMovie>({
		queryKey: ["movie", "detail"],
		queryFn: () => getMovie(clickedMovie!),
		enabled: clickedMovie !== null,
	});

	const overlayBg = movieData?.backdrop_path
		? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${makeBgPath(movieData?.backdrop_path)})`
		: "rgba(0,0,0,.5)";

	return (
		<Overlay onClick={onOverlayClick} style={{ background: overlayBg }}>
			{movieData && (
				<>
					<PosterCard layoutId={clickedMovie + ""} $bgPhoto={makeImagePath(movieData?.poster_path)}></PosterCard>
					<AnimatePresence>
						<ContextCard variants={contextVariants} initial="initial" animate="visible" exit="exit">
							<h2>{movieData?.title}</h2>
							<Infos>
								<SmallTitle>Genres</SmallTitle>
								<Genres>
									{movieData.genres?.map(genre => (
										<li key={genre.id}>{genre.name}</li>
									))}
								</Genres>
							</Infos>
							<Infos>
								<SmallTitle>Overview</SmallTitle>
								<Overview>{movieData.overview === "" ? "There is no overview written " : movieData.overview}</Overview>
							</Infos>
						</ContextCard>
					</AnimatePresence>
				</>
			)}
		</Overlay>
	);
}

export default MovieCard;
