import { useQuery } from "@tanstack/react-query";
import { getPopular, makeImagePath } from "../utils/api";
import { IDataResults } from "../utils/types";
import styled from "styled-components";
import { motion } from "framer-motion";
import MovieList from "../components/MovieList";

const Container = styled.div`
	position: relative;
	padding: 15px;
`;

const MainVisual = styled(motion.div)`
	width: 100%;
	margin: 0 auto 30px;
	text-align: center;
`;

function Home() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["popular", ""],
		queryFn: () => getPopular(),
	});

	return (
		<Container>
			{" "}
			{isLoading && <p>...is Loading</p>}
			{data && (
				<>
					<MainVisual>
						<img src={makeImagePath(data.results[0].poster_path)} alt={data.results[0].title} />
						<div> {data.results[0].title}</div>
					</MainVisual>
					<MovieList {...data} />
				</>
			)}
		</Container>
	);
}

export default Home;
