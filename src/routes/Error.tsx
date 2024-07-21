import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../style/GlobalStyle";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding: 60px 30px;
	margin: 0 auto;
	background-color: ${props => props.theme.bgColor};
	color: ${props => props.theme.textColor};
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
	return (
		<>
			<GlobalStyle />
			<Container>
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
