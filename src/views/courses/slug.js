import React from "react";

// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { PAGES } from "help/constants";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { coursesActions } from "redux/modules/courses";

function Slug(props) {
  const { course, error, dispatch } = props;
  const { t } = useTranslation();
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(coursesActions.getCoursesDetails(props.match.params.slug));
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, props.match.params.slug]);

  if (!course || !course.fields) return <div />;
  if (error) return <Redirect to="/top" />;
  return (
    <div className="wrapper">
      <CoverHeader
        title={t("courses")}
        page={PAGES.COURSES}
      />
      <div className="section section-about-us">
        <Container>
          <Row>
            {documentToReactComponents(course.fields.document, {
              renderNode: {
                "embedded-asset-block": node => <img src={node.data.target.fields.file.url} alt={course.fields.title} style={{ width: '100%', height: 'auto' }} />
              }
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  course: state.courses.coursesDetails,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Slug);
