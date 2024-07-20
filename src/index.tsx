import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={client}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>
);
