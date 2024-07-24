import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchWrapper = styled.form`
	position: relative;
	color: ${props => props.theme.accentColor};
	display: flex;
	align-items: center;
	svg {
		height: 30px;
		position: relative;
		z-index: 9;
	}
	@media only screen and (max-width: 480px) {
		justify-content: center;
	}
`;

const SearchInput = styled(motion.input)`
	transform-origin: right center;
	position: absolute;
	right: 0px;
	padding: 5px 10px;
	padding-inline: 0;
	padding-left: 30px;
	color: ${props => props.theme.textColor};
	font-size: 16px;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.accentColor};
	&:active {
		border: 1px solid ${props => props.theme.accentColor};
	}
	@media only screen and (max-width: 480px) {
		position: relative;
	}
`;

interface ISearchForm {
	keyword: string;
}

function SearchForm() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { register, handleSubmit, resetField } = useForm<ISearchForm>();
	const navigate = useNavigate();
	const onValid = (data: ISearchForm) => {
		navigate(`/search?keyword=${data.keyword}`);
		resetField("keyword");
	};

	const inputAnimation = useAnimation();
	const toggleSearch = () => {
		if (isSearchOpen) {
			inputAnimation.start({ scaleX: 0 });
		} else {
			inputAnimation.start({ scaleX: 1 });
		}
		setIsSearchOpen(prev => !prev);
	};
	return (
		<SearchWrapper onSubmit={handleSubmit(onValid)}>
			<motion.svg
				onClick={toggleSearch}
				animate={{ x: isSearchOpen ? -170 : 0 }}
				transition={{ type: "tween", delay: 0.25 }}
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clipRule="evenodd"
				></path>
			</motion.svg>
			<SearchInput
				initial={{ scaleX: 0 }}
				animate={inputAnimation}
				transition={{ type: "tween" }}
				{...register("keyword", { required: "Please write down more than 2 Roman alphabets", minLength: 2 })}
				placeholder="Search a movie..."
			/>
		</SearchWrapper>
	);
}

export default SearchForm;
