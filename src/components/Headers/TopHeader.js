/*eslint-disable*/
import React from "react";
import { useTranslation } from "react-i18next";

// reactstrap components
import { Container } from "reactstrap";
import CountDownTime from "components/CountDownTime/CountDownTime";
import CustomCarousel from "components/Carousel";
// core components

function TopHeader(props) {
  let pageHeader = React.createRef();
  const { t } = useTranslation();
  const { landingPageAccess } = props;

  React.useEffect(() => {
    const updateScroll = () => {
      let windowScrollTop = window.pageYOffset / 3;
      if (pageHeader.current) {
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      }
    };
    if (window.innerWidth > 991) {
      window.addEventListener("scroll", updateScroll);
    }
    return function cleanup() {
      if (window.innerWidth > 991) {
        window.removeEventListener("scroll", updateScroll);
      }
    };
  }, []);

  if (!landingPageAccess || !landingPageAccess.length) return <div />;
  const blocks = landingPageAccess.map(course => {
    return {
      src: course.fields.coverImage.fields.file.url,
    }
  });

  return (
    <>
      <div className="landing-page-header">
        <div
          className="carousel-wrapper"
          ref={pageHeader}
        >
          <CustomCarousel items={blocks} />
        </div>
        <Container className="time-down-container">
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

export default TopHeader;
