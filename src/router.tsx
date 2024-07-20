import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NowPlaying from "./routes/NowPlaying";
import ComingSoon from "./routes/ComingSoon";
import Popular from "./routes/Popular";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Popular />,
			},
			{
				path: "now-playing",
				element: <NowPlaying />,
			},
			{
				path: "coming-soon",
				element: <ComingSoon />,
			},
		],
	},
]);

export default router;
