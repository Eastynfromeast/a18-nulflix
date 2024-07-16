import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyle from "./style/GlobalStyle";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={darkTheme}>
				<GlobalStyle />
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
