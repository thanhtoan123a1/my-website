import React from "react";
import { PAGES } from "help/constants";

// reactstrap components
import { Container } from "reactstrap";

// core components

function CoverHeader({ title, page }) {
  let pageHeader = React.createRef();
  const newPage = PAGES;

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        if (pageHeader.current) {
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        }
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require(page === newPage.VLOGS ? "assets/img/vlogs-cover.jpeg" : "assets/img/courses-cover.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{title}</h1>
          </Container>
        </div>
      </div>
    </>
  );
}

export default CoverHeader;
