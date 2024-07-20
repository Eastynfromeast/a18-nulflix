import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../utils/api";
import { IDataResults } from "../utils/types";
import styled from "styled-components";
import { motion } from "framer-motion";
import ScreenLayout from "../layout/ScreenLayout";
import Loader from "../components/Loader";

const MainVisual = styled(motion.div)`
	width: 100%;
	margin: 0 auto 30px;
	text-align: center;
`;

function Popular() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["popular", ""],
		queryFn: () => getPopular(),
	});

	return (
		<>
			{isLoading && <Loader text="Calling popular movies right now" />}
			{data && <ScreenLayout movies={data} />}
		</>
	);
}

export default Popular;
