import { motion } from "framer-motion";
import styled from "styled-components";

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

const NoMovieNotice = styled(motion.div)`
	width: 100%;
	text-align: center;
	font-size: 2em;
	margin-top: 45px;
	transform-origin: left;
	color: ${props => props.theme.accentColor};
`;

const noticeVariants = {
	initial: {
		opacity: 0,
		scaleX: 0,
	},
	animate: {
		opacity: 1,
		scaleX: 1,
		transition: {
			duration: 1,
			delay: 1,
			type: "tween",
		},
	},
};

interface ISearchResult {
	keyword: string | null;
	resultLength: number;
}

function SearchResult({ keyword, resultLength }: ISearchResult) {
	return (
		<>
			<SearchTitle>
				<h3>
					The keyword is <span>&quot;{keyword}&quot;</span>
				</h3>
			</SearchTitle>
			{resultLength === 0 && (
				<NoMovieNotice variants={noticeVariants} initial="initial" animate="animate">
					<h3>Sorry, There's no movie found :(</h3>
				</NoMovieNotice>
			)}
		</>
	);
}

export default SearchResult;
