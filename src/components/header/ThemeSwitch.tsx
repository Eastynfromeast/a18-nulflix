import styled from "styled-components";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { isDarkAtom } from "../../utils/atom";

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

function ThemeSwitch() {
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const [isDarkOn, setIsDarkOn] = useState(true);
	const toggleDarkAtom = () => {
		setDarkAtom(prev => !prev);
		setIsDarkOn(prev => !prev);
	};
	return (
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
	);
}

export default ThemeSwitch;
