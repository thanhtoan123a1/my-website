import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: #334b43;
  text-align: center;
  color: #5ebbca;
`;

const Title = styled.div`
  font-size: 50px;
  text-transform: uppercase;
  height: 65px;
`;

const Content = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;

const ContentLeft = styled.div`
  width: 50%;
  text-align: left;
  padding-left: 140px;
`;

const ContentRight = styled.div`
`;

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "This is footer",
    };
  }

  render() {
    const { title } = this.state;
    return <FooterWrapper>
      <Title>{title}</Title>
      <Content>
        <ContentLeft>
          Trần Văn Thanh Toàn
          <br />
          Private
          <br />
          Email: thanhtoan123a1@gmail.com
          <br />
          <br />
          toantvt@hblab.vn / +84 379637022 HBLAB JSC
          <br />
          024-6658-6605‬
          <br />
          2F Central Point Building, 219 Trung Kinh Street, Cau Giay District, Ha Noi, Vietnam
          <br />
          https://hblab.vn/

        </ContentLeft>
        <ContentRight>
          Facebook: <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/thanhtoan123a1/">Thanh Toàn</a>
        </ContentRight>
      </Content>
      </FooterWrapper>;
  }
}

export default Footer;
