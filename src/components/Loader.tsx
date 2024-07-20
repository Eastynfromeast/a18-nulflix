import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";
import { motion } from "framer-motion";

interface IText {
	text: string;
}

const LoaderContainer = styled(motion.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const LoaderText = styled.p`
	width: 100%;
	color: ${props => props.theme.textColor};
`;

function Loader({ text }: IText) {
	return (
		<LoaderContainer>
			<RotatingLines strokeColor="#E50914" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
			<LoaderText>{text}</LoaderText>
		</LoaderContainer>
	);
}

export default Loader;
