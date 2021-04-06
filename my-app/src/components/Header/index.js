import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: #334b43;
  color: #5ebbca;
  font-size: 50px;
  text-transform: uppercase;
	text-align: center;
`;
class Header extends React.PureComponent {
  constructor(props) {
    super(props);
		this.state = {
			title: 'This is header'
		}
  }

  render() {
		const { title } = this.state;
    return <HeaderWrapper>{title}</HeaderWrapper>;
  }
}

export default Header;
