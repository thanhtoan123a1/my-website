/*eslint-disable*/
import React from "react";
import { useTranslation } from "react-i18next";

// reactstrap components
import { Container } from "reactstrap";
import CountDownTime from "components/CountDownTime/CountDownTime";
import CustomCarousel from "components/Carousel";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import { CONTENT_TYPE, CONTENTFUL_TAGS } from "help/constants";
// core components

function IndexHeader(props) {
  let pageHeader = React.createRef();
  const { t } = useTranslation();
  const { langdingPageAccess, dispatch } = props;

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
    dispatch(coursesActions.getLandingPageAsset({
      content_type: CONTENT_TYPE.LANDING_PAGE,
      "metadata.tags.sys.id[in]": CONTENTFUL_TAGS.LANDING_PAGE,
      'order': 'fields.index',
    }));
    return function cleanup() {
      if (window.innerWidth > 991) {
        window.removeEventListener("scroll", updateScroll);
      }
    };
  }, []);

  if (!langdingPageAccess || !langdingPageAccess.length) return <div />;
  const blocks = langdingPageAccess.map(course => {
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

const mapStateToProps = state => ({
  langdingPageAccess: state.courses.langdingPageAccess,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(IndexHeader);
