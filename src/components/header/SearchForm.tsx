import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchWrapper = styled.form`
	overflow: hidden;
	position: absolute;
	top: 35%;
	right: 15px;
	width: 235px;
	color: ${props => props.theme.accentColor};
	display: flex;
	flex-direction: column;
	align-items: center;
	svg {
		height: 30px;
		position: relative;
		z-index: 9;
	}
	@media only screen and (max-width: 480px) {
		flex-direction: row;
		justify-content: center;
		position: static;
	}
`;

const SearchInput = styled(motion.input)`
	transform-origin: right center;
	position: absolute;
	right: 0px;
	padding: 5px 10px;
	padding-inline: 0;
	padding-left: 45px;
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

const ErrorText = styled(motion.p)`
	display: block;
	color: ${props => props.theme.accentColor};
	min-height: 1em;
	padding-top: 5px;
	max-width: 235px;
`;

interface ISearchForm {
	keyword: string;
}

function SearchForm() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<ISearchForm>();
	const navigate = useNavigate();
	const onValid = (data: ISearchForm) => {
		navigate(`/search?keyword=${data.keyword}`);
		resetField("keyword");
	};

	const inputAnimation = useAnimation();
	const toggleSearch = () => {
		if (isSearchOpen) {
			inputAnimation.start({ scaleX: 0, opacity: 0 });
		} else {
			inputAnimation.start({ scaleX: 1, opacity: 1 });
		}
		setIsSearchOpen(prev => !prev);
	};

	console.log(errors);
	const windowW = window.innerWidth;
	return (
		<SearchWrapper onSubmit={handleSubmit(onValid)}>
			<motion.svg
				onClick={toggleSearch}
				animate={{ x: isSearchOpen ? (windowW > 480 ? "-260%" : "0%") : windowW > 480 ? "350%" : "500%" }}
				transition={{ type: "tween" }}
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
				initial={{ scaleX: 0, opacity: 0 }}
				animate={inputAnimation}
				transition={{ type: "tween", delay: 0.25 }}
				{...register("keyword", {
					required: "Please write down more than 2 Roman alphabets",
					minLength: { value: 2, message: "You need to put minimun 2 letters..." },
				})}
				placeholder="Search a movie..."
			/>
			<ErrorText>{errors?.keyword && errors.keyword.message}</ErrorText>
		</SearchWrapper>
	);
}

export default SearchForm;
