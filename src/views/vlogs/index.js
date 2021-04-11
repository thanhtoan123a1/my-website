import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { PAGES } from "help/constants";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { vlogsActions } from "redux/modules/vlog";
import { FACEBOOK_HOME_PAGE } from "help/constants";
import { YOUTUBE_HOME_PAGE } from "help/constants";

function renderYoutubeCard(vlogs) {
  return vlogs.map((card, index) => (
    <div key={index}>
      <div className="youtube-card-wrapper">
        <Row>
          <Col md="6" className="youtube-preview">
            <iframe className="youtube-player-list"
              id="youtube-player"
              type="text/html"
              title={card.title}
              src={card.src}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            >
              &lt;br /&gt;
          </iframe>
          </Col>
          <Col md="6" className="youtube-card" onClick={() => { window.open(card.src, '_blank') }}>
            <div className="youtube-card__title">
              {card.title}
            </div>
            <div className="youtube-card__description">
              {card.description}
            </div>
            <div className="youtube-card__footer">
              <div className="now-ui-icons ui-1_calendar-60" />
              &nbsp;
              {card.created_at}
            </div>
            <div className="youtube-card__footer">
              <div className="now-ui-icons location_pin" />
              &nbsp;
              {card.location}
            </div>
          </Col>
        </Row>
      </div>
      <hr />
    </div>

  )
  )
}

function Vlogs(props) {
  const { t } = useTranslation();
  const { dispatch, vlogs } = props;
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    /* eslint-disable */
    dispatch(vlogsActions.getVlogs());
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <div className="wrapper">
      <CoverHeader
        title={
          <div className="youtube-subscribe" onClick={(e) => window.open(YOUTUBE_HOME_PAGE, '_blank')}>
            <i className="fab fa-youtube"></i>
              &nbsp;
              {t('subscribeYoutube')}
          </div>
        }
        page={PAGES.VLOGS}
      />
      <div className="section section-about-us">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">{t('vlogsQuestionTitle')}</h2>
              <h5 className="description">
                {t('vlogsDescription')}
              </h5>
            </Col>
          </Row>
          {renderYoutubeCard(vlogs || [])}
        </Container>
      </div>
      <div className="section section-team text-center">
        <Container>
          <h2 className="title">{t('hereMyTeam')}</h2>
          <div className="team">
            <Row>
              <Col md="4">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("assets/img/hoa-avatar.jpg")}
                  ></img>
                  <h4 className="title">Hòa Nguyễn</h4>
                  <p className="category text-info">{t('hoaNickname')}</p>
                  <p className="description">
                    {t('hoaDescription')}
                  </p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open('https://www.facebook.com/nguyenhoa123a10', '_blank')}
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                </div>
              </Col>
              <Col md="4">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("assets/img/my-portrait.jpg")}
                  ></img>
                  <h4 className="title">Thanh Toàn</h4>
                  <p className="category text-info">{t('toanNickname')}</p>
                  <p className="description">
                    {t('toanDescription')}
                  </p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open(FACEBOOK_HOME_PAGE, '_blank')}
                  >
                    <i className="fab fa-facebook"></i>
                  </Button>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open(YOUTUBE_HOME_PAGE, '_blank')}
                  >
                    <i className="fab fa-youtube"></i>
                  </Button>
                </div>
              </Col>
              <Col md="4">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("assets/img/manh-avatar.jpg")}
                  ></img>
                  <h4 className="title">Lê Mạnh</h4>
                  <p className="category text-info">{t('manhNickname')}</p>
                  <p className="description">
                    {t('manhDescription')}
                  </p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open('https://www.facebook.com/profile.php?id=100026716162744', '_blank')}
                  >
                    <i className="fab fa-facebook"></i>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  vlogs: state.vlogs.vlogs,
});

export default connect(mapStateToProps)(Vlogs);
