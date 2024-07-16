import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import NowPlaying from "./routes/NowPlaying";
import ComingSoon from "./routes/ComingSoon";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
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
