import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../utils/atom";
import Navigator from "./header/Navigator";
import Logo from "./header/Logo";
import ThemeSwitch from "./header/ThemeSwitch";
import SearchForm from "./header/SearchForm";

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

function Header() {
	const isDarkOn = useRecoilValue(isDarkAtom);
	const { scrollY } = useScroll();
	const headerBgDark = useTransform(scrollY, [0, 70], ["rgba(34, 31, 31,0)", "rgba(34, 31, 31,1)"]);
	const headerBgLight = useTransform(scrollY, [0, 70], ["rgba(245, 245, 241,0)", "rgba(245, 245, 241,1)"]);

	return (
		<>
			<Nav style={{ backgroundColor: isDarkOn ? headerBgDark : headerBgLight }}>
				<UtilItems>
					<Logo />
					<ThemeSwitch />
					<SearchForm />
				</UtilItems>
				<Navigator />
			</Nav>
		</>
	);
}

export default Header;
