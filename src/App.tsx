import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./utils/atom";
import { darkTheme, lightTheme } from "./theme/theme";
import Footer from "./components/common/Footer";

function App() {
	const isDark = useRecoilValue(isDarkAtom);
	return (
		<>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				<Header />
				<Outlet />
				<Footer />
			</ThemeProvider>
		</>
	);
}

export default App;
