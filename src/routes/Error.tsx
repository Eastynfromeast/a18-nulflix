import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding: 160px 30px 60px;
	margin: 0 auto;
	background-color: #221f1f;
	color: #f5f5f1;
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
	console.log(error);
	return (
		<>
			<Container>
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
