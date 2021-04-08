import React from "react";
import { useTranslation } from 'react-i18next';

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader() {
  let pageHeader = React.createRef();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/my-portrait.jpg")}></img>
          </div>
          <h3 className="title">Trần Văn Thanh Toàn</h3>
          <p className="category">Developer</p>
          <div className="content">
            <div className="social-description">
              <h2>0</h2>
              <p>{t("posts")}</p>
            </div>
            <div className="social-description">
              <h2>0</h2>
              <p>{t("courses")}</p>
            </div>
            <div className="social-description">
              <h2>0</h2>
              <p>{t("shares")}</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
