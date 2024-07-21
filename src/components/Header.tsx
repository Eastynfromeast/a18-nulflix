import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCardOpen, isDarkAtom } from "../utils/atom";

const Nav = styled(motion.nav)`
	width: 100%;
	padding: 10px 10px 25px;
	position: fixed;
	top: 0;
	z-index: 9;
	font-size: 16px;
`;

const LogoImg = styled(motion.div)`
	img {
		width: 100%;
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

const SwitchWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-bottom: 10px;
	gap: 20px;
`;

const SwitchTitle = styled.h3`
	span {
		display: inline-block;
		margin-left: 10px;
		font-weight: 600;
		text-transform: uppercase;
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
`;

const Handle = styled(motion.span)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
	background-color: ${props => props.theme.textColor};
	border-radius: 100%;
`;

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

	return (
		<>
			<Nav style={{ backgroundColor: isDarkOn ? headerBgDark : headerBgLight, opacity: isCardOpenValue ? 0 : 1 }}>
				<LogoImg>{isDarkOn && <img src="" alt="nulflix dark logo img" />}</LogoImg>
				<SwitchWrapper>
					<SwitchTitle>
						Theme
						<span>{isDarkOn ? "Dark" : "Light"}</span>
					</SwitchTitle>
					<Switch onClick={toggleDarkAtom} style={{ justifyContent: isDarkOn ? "flex-start" : "flex-end" }}>
						<Handle layout transition={{ type: "tween" }}>
							{isDarkOn ? "🌙" : "☀️"}
						</Handle>
					</Switch>
				</SwitchWrapper>
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
