import { IDataResults } from "../utils/types";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../utils/api";
import ScreenLayout from "../layout/ScreenLayout";
import Loader from "../components/Loader";

function NowPlaying() {
	const { data, isLoading } = useQuery<IDataResults>({
		queryKey: ["nowPlaying", ""],
		queryFn: () => getNowPlaying(),
	});
	return (
		<>
			{isLoading && <Loader text="Calling Now Playing movies right now" />}
			{data && <ScreenLayout movies={data} />}
		</>
	);
}

export default NowPlaying;
