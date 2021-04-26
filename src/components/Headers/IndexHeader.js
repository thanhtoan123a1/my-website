/*eslint-disable*/
import React from "react";
import { useTranslation } from "react-i18next";
import { withOrientationChange } from 'react-device-detect';

// reactstrap components
import { Container } from "reactstrap";
import CountDownTime from "components/CountDownTime/CountDownTime";
// core components

function IndexHeader({ isPortrait }) {
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
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require(isPortrait ? "assets/img/header_mobile.png" : "assets/img/header.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <CountDownTime />
          <div className="row landing-page-description-text">
            <h1 className="h1-seo col-md-12">{t('newCourses')}</h1>
            <h3 className="col-md-12">{t('comingSoon')}</h3>
          </div>
        </Container>
    </div>
    </>
  );
}

export default withOrientationChange(IndexHeader);
