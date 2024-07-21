import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimation, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCardOpen, isDarkAtom } from "../utils/atom";
import DarkLogoImage from "../assets/img/logo_dark_nulflix.png";
import LightLogoImage from "../assets/img/logo_light_nulflix_0.png";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
	width: 100%;
	padding: 10px 10px 25px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	font-size: 16px;
	@media only screen and (max-width: 480px) {
		font-size: 14px;
	}
`;

const UtilItems = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	position: relative;
	margin-bottom: 10px;
	@media only screen and (max-width: 480px) {
		flex-direction: column;
	}
`;

const LogoWrapper = styled(motion.div)`
	max-width: 250px;
	width: 50%;
	margin: 0 auto;
`;

const LogoImg = styled(motion.img)`
	width: 100%;
	transform-origin: left;
`;

const SwitchWrapper = styled.div`
	position: absolute;
	left: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-bottom: 10px;
	gap: 20px;
	@media only screen and (max-width: 480px) {
		position: static;
	}
`;

const SwitchTitle = styled.h3`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	span {
		display: inline-block;
		margin-left: 10px;
		font-weight: 600;
		text-transform: uppercase;
		color: ${props => props.theme.accentColor};
	}
`;

const Switch = styled.div`
	width: 60px;
	height: 34px;
	background-color: ${props => props.theme.cardBgColor};
	display: flex;
	align-items: center;
	border-radius: 50px;
	padding: 2px 5px;
	cursor: pointer;
	border: 1px solid ${props => props.theme.textColor};
	@media only screen and (max-width: 480px) {
		width: 50px;
		height: 25px;
	}
`;

const Handle = styled(motion.span)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
	background-color: ${props => props.theme.textColor};
	border-radius: 100%;
	@media only screen and (max-width: 480px) {
		width: 20px;
		height: 20px;
	}
`;

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

const NavItems = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
`;

const NavItem = styled.li`
	position: relative;
	text-transform: uppercase;
	color: ${props => props.theme.textColor};
`;

const HeaderDot = styled(motion.span)`
	display: block;
	width: 5px;
	height: 5px;
	border-radius: 100%;
	background-color: ${props => props.theme.accentColor};
	position: absolute;
	bottom: -10px;
	left: 0;
	right: 0;
	margin: 0 auto;
`;

const logoVariants = {
	hidden: { scaleX: 0, opacity: 0 },
	visible: {
		scaleX: 1,
		opacity: 1,
		transition: {
			delay: 1,
			duration: 2,
			type: "spring",
		},
	},
	exit: { scaleX: 0, opacity: 0 },
};

interface ISearchForm {
	keyword: string;
}

function Header() {
	const homeMatch = useMatch("/");
	const comingSoonMatch = useMatch("/coming-soon");
	const nowPlayingMatch = useMatch("/now-playing");
	const { scrollY } = useScroll();
	const headerBgDark = useTransform(scrollY, [0, 70], ["rgba(34, 31, 31,0)", "rgba(34, 31, 31,1)"]);
	const headerBgLight = useTransform(scrollY, [0, 70], ["rgba(245, 245, 241,0)", "rgba(245, 245, 241,1)"]);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const [isDarkOn, setIsDarkOn] = useState(true);
	const toggleDarkAtom = () => {
		setDarkAtom(prev => !prev);
		setIsDarkOn(prev => !prev);
	};
	const isCardOpenValue = useRecoilValue(isCardOpen);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const inputAnimation = useAnimation();
	const toggleSearch = () => {
		if (isSearchOpen) {
			inputAnimation.start({ scaleX: 0 });
		} else {
			inputAnimation.start({ scaleX: 1 });
		}
		setIsSearchOpen(prev => !prev);
	};

	const { register, handleSubmit, reset } = useForm<ISearchForm>();
	const navigate = useNavigate();
	const onValid = (data: ISearchForm) => {
		navigate(`/search?keyword=${data.keyword}`);
		reset();
	};
	return (
		<>
			<Nav style={{ backgroundColor: isDarkOn ? headerBgDark : headerBgLight, opacity: isCardOpenValue ? 0 : 1 }}>
				<UtilItems>
					<LogoWrapper>
						<AnimatePresence>
							{isDarkOn ? (
								<LogoImg
									layoutId="logoImg"
									variants={logoVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									src={DarkLogoImage}
									alt="nulflix dark logo img"
								/>
							) : (
								<LogoImg
									layoutId="logoImg"
									variants={logoVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									src={LightLogoImage}
									alt="nulflix light logo img"
								/>
							)}
						</AnimatePresence>
					</LogoWrapper>
					<SwitchWrapper>
						<Switch onClick={toggleDarkAtom} style={{ justifyContent: isDarkOn ? "flex-start" : "flex-end" }}>
							<Handle layout transition={{ type: "tween" }}>
								{isDarkOn ? "🌙" : "☀️"}
							</Handle>
						</Switch>
						<SwitchTitle>
							Theme
							<span>{isDarkOn ? "Dark" : "Light"}</span>
						</SwitchTitle>
					</SwitchWrapper>
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
				</UtilItems>
				<NavItems>
					<NavItem>
						<Link to="/">
							Popular
							{homeMatch && <HeaderDot layoutId="index" />}
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/coming-soon">
							Coming Soon
							{comingSoonMatch && <HeaderDot layoutId="index" />}
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/now-playing">
							Now Playing
							{nowPlayingMatch && <HeaderDot layoutId="index" />}
						</Link>
					</NavItem>
				</NavItems>
			</Nav>
		</>
	);
}

export default Header;
