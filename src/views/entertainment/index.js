import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { entertainmentActions } from "redux/modules/entertainment";
import { FACEBOOK_HOME_PAGE } from "help/constants";
import { YOUTUBE_HOME_PAGE } from "help/constants";
import { CONTENT_TYPE } from "help/constants";
AOS.init({
  duration: 2000,
});

function Entertainment(props) {
  const { t } = useTranslation();
  const { dispatch, entertainments } = props;
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(
      entertainmentActions.getEntertainment({
        content_type: CONTENT_TYPE.ENTERTAINMENT,
        order: "-sys.createdAt",
      })
    );
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch]);

  function renderFirstBlock(item) {
    return (
      <div className="row">
        <div className="col-sm-6 card-wrapper" data-aos="fade-right">
          <img
            src={item.fields.coverImage.fields.file.url}
            alt="left"
            className="card-wrapper--image-left"
          />
        </div>
        <div className="col-sm-6 card-wrapper" data-aos="fade-left">
          <div className="card-wrapper__information card-wrapper__information--right">
            <div className="card-wrapper--title">{item.fields.title}</div>
            <div className="card-wrapper--description">
              {item.fields.description}
            </div>
            <div
              className="live-preview"
              onClick={() => window.open(item.fields.link, "_blank")}
            >
              {t("watchNow")}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function renderSecondBlock(item) {
    return (
      <div className="row">
        <div className="col-sm-6 card-wrapper" data-aos="fade-right">
          <div className="card-wrapper__information card-wrapper__information--left">
            <div className="card-wrapper--title">{item.fields.title}</div>
            <div className="card-wrapper--description">
              {item.fields.description}
            </div>
            <div
              className="live-preview"
              onClick={() => window.open(item.fields.link, "_blank")}
            >
              {t("watchNow")}
            </div>
          </div>
        </div>
        <div className="col-sm-6 card-wrapper" data-aos="fade-left">
          <img
            src={item.fields.coverImage.fields.file.url}
            alt="left"
            className="card-wrapper--image-right"
          />
        </div>
      </div>
    );
  }

  function renderItem(item) {
    return (
      <div
        key={item.fields.link}
        className="col-md-4 col-sm-12 card-list-item"
        data-aos="fade-up"
      >
        <img
          src={item.fields.coverImage.fields.file.url}
          alt="img"
          className="card-list-item--image"
        />
        <div className="card-list-item--cover">
          <div className="card-wrapper--title">{item.fields.title}</div>
          <div className="card-wrapper--description">
            {item.fields.description}
          </div>
          <div
            className="live-preview"
            onClick={() => window.open(item.fields.link, "_blank")}
          >
            {t("watchNow")}
          </div>
        </div>
      </div>
    );
  }

  if (!entertainments || entertainments.length < 2) return <div />;
  const landingItems = entertainments.filter(
    (item) => item.fields.isLandingPost
  );
  const normalItems = entertainments.filter(
    (item) => !item.fields.isLandingPost
  );
  return (
    <div className="wrapper">
      <CoverHeader coverPhoto={require("assets/img/landing_01.jpg")} />
      <div className="item-wrapper">
        <div>
          {renderFirstBlock(landingItems[0])}
          {renderSecondBlock(landingItems[1])}
        </div>
      </div>
      <div className="section section-team text-center dark-background">
        <Container className="item-wrapper">
          <h2>{t("channelUpdate")}</h2>
          <div className="row card-list-wrapper">
            {normalItems.map((item) => renderItem(item))}
          </div>
        </Container>
        <Container className="item-wrapper">
          <h2 className="title">{t("hereMyTeam")}</h2>
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
                  <p className="category text-info">{t("hoaNickname")}</p>
                  <p className="description">{t("hoaDescription")}</p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/nguyenhoa123a10",
                        "_blank"
                      )
                    }
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
                  <p className="category text-info">{t("toanNickname")}</p>
                  <p className="description">{t("toanDescription")}</p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open(FACEBOOK_HOME_PAGE, "_blank")}
                  >
                    <i className="fab fa-facebook"></i>
                  </Button>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) => window.open(YOUTUBE_HOME_PAGE, "_blank")}
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
                  <p className="category text-info">{t("manhNickname")}</p>
                  <p className="description">{t("manhDescription")}</p>
                  <Button
                    className="btn-icon btn-round"
                    color="info"
                    onClick={(e) =>
                      window.open(
                        "https://www.facebook.com/profile.php?id=100026716162744",
                        "_blank"
                      )
                    }
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

const mapStateToProps = (state) => ({
  entertainments: state.entertainment.entertainments,
});

export default connect(mapStateToProps)(Entertainment);
