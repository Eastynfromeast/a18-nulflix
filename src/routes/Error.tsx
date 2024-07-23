import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../utils/atom";
import Header from "../components/Header";
import styled from "styled-components";
import "../style/reset.css";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding: 160px 30px 60px;
	margin: 0 auto;
	font-size: 24px;
	line-height: 1.5;
`;

const ErrorTitle = styled.h1`
	font-size: 2em;
`;

const ErrorText = styled.p`
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

function Error() {
	const error = useRouteError();
	const isDark = useRecoilValue(isDarkAtom);

	return (
		<>
			<Container
				style={{
					backgroundColor: isDark ? "#221f1f" : "#f5f5f1",
					color: isDark ? "#f5f5f1" : "#221f1f",
				}}
			>
				<Header />
				{isRouteErrorResponse(error) ? (
					<div>
						<ErrorTitle>
							{error?.status} {error?.statusText}
						</ErrorTitle>
						<hr />
						<ErrorText>
							Sorry, an unexpected error has occurred.
							<br />
							Please press go back and try again.
						</ErrorText>
					</div>
				) : (
					<ErrorText>Oops!</ErrorText>
				)}
			</Container>
		</>
	);
}

export default Error;
