import { IDataResults } from "../utils/types";
import { useQuery } from "@tanstack/react-query";
import { getComingSoon } from "../utils/api";
import ScreenLayout from "../layout/ScreenLayout";
import Loader from "../components/common/Loader";

function ComingSoon() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["comingSoon", ""],
		queryFn: () => getComingSoon(),
	});
	return (
		<>
			{isLoading && <Loader text="Calling Up coming movies right now" />}
			{data && <ScreenLayout movies={data} />}
		</>
	);
}

export default ComingSoon;
