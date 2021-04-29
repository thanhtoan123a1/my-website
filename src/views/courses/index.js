import React, { useState } from "react";

// reactstrap components
import { Container, Row, Col, Input } from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { PAGES } from "help/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import CustomDropdown from "components/Dropdown";
import { CONTENT_TYPE } from "help/constants";
import { CONTENTFUL_TAGS } from "help/constants";

function formatDateTime(time) {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US");
}

const items = [
  { key: CONTENTFUL_TAGS.REACTJS, value: "ReactJS" },
  { key: CONTENTFUL_TAGS.PHOTOSHOP, value: "Photoshop" },
  { key: CONTENTFUL_TAGS.OTHERS, value: "Others" },
  { key: CONTENTFUL_TAGS.ALL, value: "All" },
];

// miniseconds to call api when typing
const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

function renderCoursesCard(articles, updatedText) {
  return articles.map((card, index) => {
    const {
      fields: { title, description, coverImage },
      sys: { updatedAt, type, id },
    } = card;
    return (
      <div key={index}>
        <div className="youtube-card-wrapper">
          <Row>
            <Col md="6" className="youtube-preview">
              <img
                src={coverImage.fields.file.url}
                alt={title}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col md="6" className="youtube-card">
              <Link className="link-no-style" to={`/courses/${id}`}>
                <div className="youtube-card__title">{title}</div>
                <div className="youtube-card__description">{description}</div>
                <div className="youtube-card__footer">
                  <div className="now-ui-icons ui-1_calendar-60" />
                  &nbsp;
                  {`${updatedText}: ${formatDateTime(updatedAt)}`}
                </div>
                <div className="youtube-card__footer">
                  <div className="now-ui-icons location_pin" />
                  &nbsp;
                  {type}
                </div>
              </Link>
            </Col>
          </Row>
        </div>
        <hr />
      </div>
    );
  });
}

function Courses(props) {
  const { t } = useTranslation();
  const { dispatch, courses } = props;
  const [params, setParams] = useState({
    content_type: CONTENT_TYPE.ARTICLE,
  });
  const interval = {
    time: null,
  };

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(coursesActions.getCourses(params));
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (tagId) => {
    const newParams = { ...params };
    if (tagId === "all") {
      delete newParams["metadata.tags.sys.id[in]"];
    } else {
      newParams["metadata.tags.sys.id[in]"] = tagId;
    }
    setParams(newParams);
    dispatch(coursesActions.getCourses(newParams));
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    const newParams = { ...params, "fields.title[match]": value };
    clearTimeout(interval.time);
    setParams(newParams);
    interval.time = setTimeout(() => {
      dispatch(coursesActions.getCourses(newParams));
    }, WAIT_INTERVAL);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      const { value } = e.target;
      const newParams = { ...params, "fields.title[match]": value };
      dispatch(coursesActions.getCourses(newParams));
    }
  };

  if (!courses) return <div />;
  return (
    <div className="wrapper">
      <CoverHeader title={t("courses")} page={PAGES.COURSES} />
      <div className="section section-about-us">
        <Container>
          <CustomDropdown items={items} onSelect={onSelect} />
          <Input
            type="search"
            name="search"
            placeholder="Search by keywords"
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDown}
          />
          {renderCoursesCard(courses, t("updatedAt"))}
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Courses);
