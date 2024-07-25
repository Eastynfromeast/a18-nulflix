import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMovie, makeBgPath, makeImagePath } from "../../utils/api";
import { IMovieDetail } from "../../utils/types";
import Loader from "../common/Loader";
import defaultImg from "../../assets/img/default_card_nulflix_0.jpg";

const rumos = keyframes`
	0%, 100%{
		box-shadow: 0 0 0px rgba(255, 255, 255, 0);
	}
	50% {
		box-shadow: 0 0 7px rgba(255, 255, 255, 0.75);
	}
`;

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
	z-index: 10;
	@media only screen and (max-width: 480px) {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding-top: 75px;
	}
`;

const ExitBtn = styled(motion.button)`
	display: block;
	position: absolute;
	top: 20px;
	right: 20px;
	padding: 5px;
	background-color: rgba(0, 0, 0, 0.75);
	color: #fff;
	border-radius: 100%;
	width: 35px;
	height: 35px;
	transition: all 0.5s ease-in-out;
	animation: ${rumos} 3s ease-in-out infinite;
	svg {
		width: 100%;
		transition: all 0.5s ease-in-out;
	}
	&:hover {
		background-color: ${props => props.theme.accentColor};

		svg {
			transform: scale(0.75);
		}
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
		max-width: 100vw;
	}
`;

const PosterCard = styled(Card)<{ $bgPhoto: string }>`
	background-image: url(${props => props.$bgPhoto});
	background-size: cover;
	background-position: center;
`;

const ContextCard = styled(Card)`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 7px;
	padding: 0 20px 50px;
	font-size: 16px;
	word-break: keep-all;
	background-color: ${props => props.theme.cardBgColor};
	color: ${props => props.theme.textColor};
	h2 {
		font-weight: 600;
		font-size: 2.5em;
		margin-bottom: 15px;
	}
	@media only screen and (max-width: 480px) {
		position: absolute;
	}
`;

const Tagline = styled.p`
	width: 100%;
	font-size: 1.2em;
	font-style: italic;
`;

const Infos = styled(motion.div)`
	margin-top: 10px;
`;

const RowInfos = styled(Infos)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 10px;
`;

const InfoList = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 10px;
`;

const InfoTitle = styled.span`
	display: block;
	text-transform: uppercase;
	font-weight: 500;
	opacity: 0.75;
	margin-bottom: 10px;
`;

const Overview = styled.p`
	line-height: 1.35;
`;

const LinkButton = styled.a`
	width: 100%;
	border: 1px solid;
	border-radius: 25px;
	padding: 15px;
	text-align: center;
	margin-top: 20px;
	transition: all 0.5s ease-in-out;
	&:hover {
		background-color: ${props => props.theme.accentColor};
		color: ${props => props.theme.bgColor};
		font-weight: 600;
	}
`;

const contextVariants = {
	initial: { x: -150, opacity: 0 },
	visible: { x: 0, opacity: 1, transition: { delay: 0.5, duration: 1, type: "spring", staggerChildren: 0.3, delayChildren: 0.3 } },
	exit: { x: -150, opacity: 0 },
};

const buttonVariants = {
	initial: { opacity: 0, scale: 0 },
	animate: { opacity: 1, scale: 1, transition: { delay: 0.75, duration: 1, type: "spring" } },
};

interface IProps {
	clickedMovie: number;
	closeModal: () => void;
}

const convertTime = (time: number) => {
	const hour = Math.floor(time / 60);
	const min = Math.floor(time % 60);
	return `${hour}h ${min}m`;
};

const OVERVIEW_MAX = 200;

const convertOverview = (overview: string) => {
	let converted;
	if (overview.length > OVERVIEW_MAX) {
		converted = overview.slice(0, OVERVIEW_MAX) + "...";
	} else if (overview === "") {
		converted = "No overview is written";
	} else {
		converted = overview;
	}

	return converted;
};

function MovieModal({ clickedMovie, closeModal }: IProps) {
	const { data, isLoading } = useQuery<IMovieDetail>({
		queryKey: ["movie", "detail"],
		queryFn: () => getMovie(clickedMovie!),
		enabled: clickedMovie !== null,
	});

	const overlayBg = data?.backdrop_path ? `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)), url(${makeBgPath(data?.backdrop_path)})` : "rgba(0,0,0,.5)";

	return (
		<Overlay onClick={closeModal} style={{ background: overlayBg }}>
			{isLoading && <Loader text="calling movie details" />}
			{data && (
				<>
					<PosterCard layoutId={clickedMovie + ""} $bgPhoto={data.poster_path ? makeImagePath(data?.poster_path) : defaultImg}></PosterCard>
					<AnimatePresence>
						<ContextCard variants={contextVariants} initial="initial" animate="visible" exit="exit">
							<ExitBtn onClick={closeModal} variants={buttonVariants} initial="initial" animate="animate">
								<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path>
								</svg>
							</ExitBtn>
							<h2>{data?.title}</h2>
							{data.tagline && (
								<Infos>
									<Tagline>{data.tagline !== "" ? data.tagline : null}</Tagline>
								</Infos>
							)}

							<RowInfos>
								<InfoTitle>Released</InfoTitle>
								<p>{data.release_date !== "" ? data.release_date : "unknown"}</p>
							</RowInfos>
							<RowInfos>
								<InfoTitle>Runtime</InfoTitle>
								<p>{convertTime(data.runtime)}</p>
							</RowInfos>
							<RowInfos>
								<InfoTitle>Rating</InfoTitle>
								<p>{data.vote_average.toFixed(2)}</p>
							</RowInfos>
							<RowInfos>
								<InfoTitle>Language</InfoTitle>
								<InfoList>
									{data.spoken_languages?.map((lang, i) => (
										<li key={lang.iso_639_1}>{lang.english_name}</li>
									))}
								</InfoList>
							</RowInfos>
							<RowInfos>
								<InfoTitle>Genres</InfoTitle>
								<InfoList>
									{data.genres?.map(genre => (
										<li key={genre.id}>{genre.name}</li>
									))}
								</InfoList>
							</RowInfos>
							<Infos>
								<InfoTitle>Overview</InfoTitle>
								<Overview>{convertOverview(data.overview)}</Overview>
							</Infos>
							<LinkButton href={data.homepage} target="_blank">
								More about this movie
							</LinkButton>
						</ContextCard>
					</AnimatePresence>
				</>
			)}
		</Overlay>
	);
}

export default MovieModal;
