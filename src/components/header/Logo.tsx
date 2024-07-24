import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../utils/atom";
import DarkLogoImage from "../../assets/img/logo_dark_nulflix_0.png";
import LightLogoImage from "../../assets/img/logo_light_nulflix_0.png";

const LogoWrapper = styled(motion.div)`
	max-width: 250px;
	width: 50%;
	margin: 0 auto;
`;

const LogoImg = styled(motion.img)`
	width: 100%;
	transform-origin: left;
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

function Logo() {
	const isDarkOn = useRecoilValue(isDarkAtom);
	return (
		<LogoWrapper>
			<AnimatePresence>
				{isDarkOn ? (
					<LogoImg layoutId="logoImg" variants={logoVariants} initial="hidden" animate="visible" exit="exit" src={DarkLogoImage} alt="nulflix dark logo img" />
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
	);
}

export default Logo;
