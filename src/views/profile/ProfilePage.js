import React from "react";
import { useTranslation } from 'react-i18next';
import { SOCIAL_NETWORKS } from "help/constants.js";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import { FACEBOOK_HOME_PAGE } from "help/constants";
import { TWITTER_HOME_PAGE } from "help/constants";
import { INSTAGRAM_HOME_PAGE } from "help/constants";

function openSocialNetwork(socialNetwork) {
  let redirectLink = '';
  switch (socialNetwork) {
    case SOCIAL_NETWORKS.FB:
      redirectLink = FACEBOOK_HOME_PAGE;
      break;
    case SOCIAL_NETWORKS.IN:
      redirectLink = INSTAGRAM_HOME_PAGE;
      break;
    case SOCIAL_NETWORKS.TW:
      redirectLink = TWITTER_HOME_PAGE;
      break;
    default:
      redirectLink = FACEBOOK_HOME_PAGE;
      break;
  }

  window.open(redirectLink, '_blank');

}
function ProfilePage() {
  const [pills, setPills] = React.useState("2");
  const { t } = useTranslation();
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <div className="wrapper">
      <ProfilePageHeader />
      <div className="section">
        <Container>
          <div className="button-container">
            <Button className="btn-round" color="info" size="lg">
              {t('follow')}
            </Button>
            <Button
              className="btn-round btn-icon"
              color="default"
              id="tooltip515203352"
              size="lg"
              onClick={() => openSocialNetwork(SOCIAL_NETWORKS.TW)}
            >
              <i className="fab fa-twitter"></i>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip515203352">
              {t('followTwitter')}
            </UncontrolledTooltip>
            <Button
              className="btn-round btn-icon"
              color="default"
              id="tooltip340339231"
              size="lg"
              onClick={() => openSocialNetwork(SOCIAL_NETWORKS.IN)}
            >
              <i className="fab fa-instagram"></i>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip340339231">
              {t('followInstagram')}
            </UncontrolledTooltip>
            <Button
              className="btn-round btn-icon"
              color="default"
              id="tooltip12345214"
              size="lg"
              onClick={() => openSocialNetwork(SOCIAL_NETWORKS.FB)}
            >
              <i className="fab fa-facebook"></i>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip12345214">
              {t('followFacebook')}
            </UncontrolledTooltip>
          </div>
          <h3 className="title">Some thing about me</h3>
          <blockquote className="block-qoute">
            <p><q className="quotes">It's never too late to beleive in yourself.</q></p>
            <div className="author-name">Jack Ma</div>
          </blockquote>
          <h5 className="profile-category">
          </h5>
          <h5 className="description">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
            and records all of his own music, giving it a warm, intimate feel
            with a solid groove structure. An artist of considerable range.
            </h5>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <h4 className="title text-center">My Portfolio</h4>
              <div className="nav-align-center">
                <Nav
                  className="nav-pills-info nav-pills-just-icons"
                  pills
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      className={pills === "1" ? "active" : ""}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setPills("1");
                      }}
                    >
                      <i className="now-ui-icons design_image"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={pills === "2" ? "active" : ""}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setPills("2");
                      }}
                    >
                      <i className="now-ui-icons location_world"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={pills === "3" ? "active" : ""}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setPills("3");
                      }}
                    >
                      <i className="now-ui-icons sport_user-run"></i>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <TabContent className="gallery" activeTab={"pills" + pills}>
              <TabPane tabId="pills1">
                <Col className="ml-auto mr-auto" md="10">
                  <Row className="collections">
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg1.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg3.jpg")}
                      ></img>
                    </Col>
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg8.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg7.jpg")}
                      ></img>
                    </Col>
                  </Row>
                </Col>
              </TabPane>
              <TabPane tabId="pills2">
                <Col className="ml-auto mr-auto" md="10">
                  <Row className="collections">
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg6.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg11.jpg")}
                      ></img>
                    </Col>
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg7.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg8.jpg")}
                      ></img>
                    </Col>
                  </Row>
                </Col>
              </TabPane>
              <TabPane tabId="pills3">
                <Col className="ml-auto mr-auto" md="10">
                  <Row className="collections">
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg3.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg8.jpg")}
                      ></img>
                    </Col>
                    <Col md="6">
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg7.jpg")}
                      ></img>
                      <img
                        alt="..."
                        className="img-raised"
                        src={require("assets/img/bg6.jpg")}
                      ></img>
                    </Col>
                  </Row>
                </Col>
              </TabPane>
            </TabContent>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProfilePage;
