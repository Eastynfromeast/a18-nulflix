import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../utils/api";
import { IDataResults } from "../utils/types";
import ScreenLayout from "../layout/ScreenLayout";
import Loader from "../components/Loader";

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
