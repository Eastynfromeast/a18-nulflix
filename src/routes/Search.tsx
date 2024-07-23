import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearchedMovie } from "../utils/api";
import Loader from "../components/Loader";
import ScreenLayout from "../layout/ScreenLayout";
import { IDataResults } from "../utils/types";
import styled from "styled-components";

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");

	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["search", keyword],
		queryFn: () => getSearchedMovie(keyword!),
		enabled: keyword !== null,
	});

	return (
		<>
			{isLoading && <Loader text="Searching the movie..." />}

			{data && <ScreenLayout movies={data} searchTitle={keyword} />}
		</>
	);
}

export default Search;