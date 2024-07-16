import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
	width: 100%;
	padding: 20px 10px;
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
	return (
		<>
			<Nav>
				<NavItems>
					<NavItem>
						<Link to="/">
							Popular
							{homeMatch && <HeaderDot layoutId="index" />}
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/coming-soon">
							ComingSoon
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
