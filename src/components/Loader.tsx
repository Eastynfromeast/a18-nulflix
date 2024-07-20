import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

interface IText {
	text: string;
}

const LoaderContainer = styled(motion.div)`
	width: 100%;
	text-align: center;
`;

const LoaderText = styled.p`
	width: 100%;
	color: ${props => props.theme.textColor};
`;

function Loader({ text }: IText) {
	return (
		<LoaderContainer>
			<AnimatePresence>
				<RotatingLines strokeColor="#E50914" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
				<LoaderText>{text}</LoaderText>
			</AnimatePresence>
		</LoaderContainer>
	);
}

export default Loader;
