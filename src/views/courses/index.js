import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Row, Input } from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { PAGES } from "help/constants";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import CustomDropdown from "components/Dropdown";
import { CONTENT_TYPE } from "help/constants";
import { CONTENTFUL_TAGS } from "help/constants";

const items = [
  { key: CONTENTFUL_TAGS.REACTJS, value: "ReactJS" },
  { key: CONTENTFUL_TAGS.PHOTOSHOP, value: "Photoshop" },
  { key: CONTENTFUL_TAGS.OTHERS, value: "Others" },
  { key: CONTENTFUL_TAGS.ALL, value: "All" },
];

// miniseconds to call api when typing
const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

function Courses(props) {
  const { t } = useTranslation();
  const { dispatch, courses, isChecking } = props;
  const [params, setParams] = useState({
    content_type: CONTENT_TYPE.ARTICLE,
  });
  const interval = {
    time: null,
  };

  const history = useHistory();

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

  function getTags(tags) {
    if (tags && tags.length) {
      return tags.map(tag => {
        return items.find(item => item.key === tag.sys.id);
      });
    }
    return [];
  }

  function handleClickTag(tagId) {
    onSelect(tagId);
  }

  function handleClickArticle(courseId) {
    history.push(`/courses/${courseId}`)
  }

  function renderFirstBlock(item) {
    return (
      <div onClick={() => handleClickArticle(item.sys.id)} className="course-section--first-block--card">
        <img src={item.fields.coverImage.fields.file.url} alt="img" className="course-section--first-block__image" />
        <div className="author-wrapper">
          <img src={item.fields.author.fields.avatar.fields.file.url} alt="img" className="course-section--first-block__avatar" />
          <div className="section-card-name">{item.fields.author.fields.userName}</div><div className="section-card-time">&nbsp;-&nbsp;1h</div>
        </div>
        <div className="section-card-title">{item.fields.title}</div>
        <div className="section-card-description">{item.fields.description}</div>
        <div className="section-card-tags">
          {
            getTags(item.metadata.tags).map(tag => {
              return (
                <span className="section-card-tags--item" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClickTag(tag.key);
                }}>
                  #{tag.value}
                </span>
              );
            })
          }
        </div>
      </div>
    );
  }
  function renderSecondBlock(item) {
    return (
      <div onClick={() => handleClickArticle(item.sys.id)} className="course-section--second-block--card">
        <img src={item.fields.coverImage.fields.file.url} alt="img" className="course-section--second-block__image" />
        <div className="section2-wrapper">
          <div className="author-wrapper">
            <img src={item.fields.author.fields.avatar.fields.file.url} alt="img" className="course-section--first-block__avatar" />
            <div className="section-card-name">{item.fields.author.fields.userName}</div><div className="section-card-time">&nbsp;-&nbsp;1h</div>
          </div>
          <div className="section-card-title">{item.fields.title}</div>
          <div className="section-card-description">{item.fields.description}</div>
          <div className="section-card-tags">
            {
              getTags(item.metadata.tags).map(tag => {
                return (
                  <span className="section-card-tags--item" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClickTag(tag.key);
                  }}>
                    #{tag.value}
                  </span>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

  function renderNormalArticle(item) {
    return (
      <div onClick={() => handleClickArticle(item.sys.id)} className="normal-card">
        <div className="normal-card--image-wrapper">
          <img src={item.fields.coverImage.fields.file.url} alt="img" className="normal-card__image" />
          <div className="normal-card__right">
            <div className="section-card-title">{item.fields.title}</div>
            <div className="section-card-description">{item.fields.description}</div>
            <div className="author-wrapper">
              <img src={item.fields.author.fields.avatar.fields.file.url} alt="img" className="course-section--first-block__avatar" />
              <div className="section-card-name">{item.fields.author.fields.userName}</div><div className="section-card-time">&nbsp;-&nbsp;1h</div>
            </div>
            <div className="section-card-tags">
              {
                getTags(item.metadata.tags).map(tag => {
                  return (
                    <span className="section-card-tags--item" onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClickTag(tag.key);
                    }}>
                      #{tag.value}
                    </span>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isChecking || !courses || !courses.length) return <div />;
  return (
    <div className="wrapper">
      <CoverHeader title={t("courses")} page={PAGES.COURSES} />
      <div className="section section-about-us section-course">
        <Container>
          <CustomDropdown items={items} onSelect={onSelect} />
          <Input
            type="search"
            name="search"
            placeholder="Search by keywords"
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDown}
          />
          <br />
          <Row>
            <div className="col-8 course-section-right">
              <div className="course-section-right--block">
                <div className="course-section--first-block">
                  {renderFirstBlock(courses[0])}
                </div>
                <div className="course-section--second-block">
                  {courses[1] && renderSecondBlock(courses[1])}
                </div>
              </div>
            </div>
            <div className="col-4 course-section-left">
              <div className="course-section-left--block">

              </div>
            </div>
          </Row>
          <Row>
            {
              courses.length > 2 &&
              courses.slice(2).map(course => {
                return renderNormalArticle(course);
              })
            }
          </Row>
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
