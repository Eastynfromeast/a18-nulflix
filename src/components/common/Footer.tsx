import styled from "styled-components";

const FooterContainer = styled.footer`
	color: ${props => props.theme.accentColor};
	margin: 30px 10px 0;
	p {
		border-top: 1px solid;
		padding: 20px 15px;
		text-align: right;
		opacity: 0.75;
		font-size: 14px;
	}
`;

function Footer() {
	return (
		<FooterContainer>
			<p>&copy; Nulflix by Nuri Nuna</p>
		</FooterContainer>
	);
}

export default Footer;
