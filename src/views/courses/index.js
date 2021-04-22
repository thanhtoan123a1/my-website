import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { PAGES } from "help/constants";
import { client } from "help/client";
import { Link } from "react-router-dom";

function formatDateTime(time) {
  const date = new Date(time);
  return date.toLocaleTimeString('en-US');
}

function renderCoursesCard(articles, updatedText) {
  return articles.map((card, index) => {
    const { fields: { title, description, coverImage }, sys: { updatedAt, type, id } } = card;
    return <div key={index}>
      <div className="youtube-card-wrapper">
        <Row>
          <Col md="6" className="youtube-preview">
            <img src={coverImage.fields.file.url} alt={title} style={{width: '100%', height: 'auto'}} />
          </Col>
            <Col md="6" className="youtube-card" >
          <Link className="link-no-style" to={`/courses/${id}`}>
              <div className="youtube-card__title">
                {title}
              </div>
              <div className="youtube-card__description">
                {description}
              </div>
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
  })
}

function Courses() {
  const [articles, setArticles] = React.useState(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    client.getEntries()
      .then(data => {
        setArticles(data.items);
      }).catch(err => {
        console.log("err", err);
      });
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  if (!articles) return <div />;
  return (
    <div className="wrapper">
      <CoverHeader
        title={t("courses")}
        page={PAGES.COURSES}
      />
      <div className="section section-about-us">
        <Container>
          {renderCoursesCard(articles, t("updatedAt"))}
        </Container>
      </div>
    </div>
  );
}

export default Courses;
