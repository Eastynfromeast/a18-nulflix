import { Link, useMatch } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../utils/atom";

const Nav = styled(motion.nav)`
	width: 100%;
	padding: 20px 10px;
	position: fixed;
	top: 0;
	z-index: 99;
`;

const ThemeButton = styled.button`
	display: block;
	margin: 0 auto 10px;
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

function Header() {
	const homeMatch = useMatch("/");
	const comingSoonMatch = useMatch("/coming-soon");
	const nowPlayingMatch = useMatch("/now-playing");
	const { scrollY } = useScroll();
	const headerBg = useTransform(scrollY, [0, 60], ["rgba(34, 31, 31,0)", "rgba(34, 31, 31,1)"]);

	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom(prev => !prev);

	return (
		<>
			<Nav style={{ backgroundColor: headerBg }}>
				<ThemeButton onClick={toggleDarkAtom}>Change theme</ThemeButton>
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
