import React from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TWITTER_HOME_PAGE } from "help/constants";
import { FACEBOOK_HOME_PAGE } from "help/constants";
import { INSTAGRAM_HOME_PAGE } from "help/constants";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { isLogin, userData } = props;

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  }

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link
              className="nav-link"
              to="/"
              id="navbar-brand"
            >
              <p className="title-up">{t('homePage')}</p>
            </Link>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Link
                  className="nav-link"
                  to="/profile-page"
                >
                  <i className="now-ui-icons travel_info"></i>
                  <p>{t('profile')}</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  className="nav-link"
                  to="/courses"
                >
                  <i className="now-ui-icons education_agenda-bookmark"></i>
                  <p>{t('courses')}</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  className="nav-link"
                  to="/vlogs"
                >
                  <i className="now-ui-icons media-1_camera-compact"></i>
                  <p>{t('vlogs')}</p>
                </Link>
              </NavItem>
              <NavItem>
                {
                  isLogin ?
                    <Link
                      className="nav-link"
                      to="/profile-page"
                    >
                      <i className="now-ui-icons users_circle-08"></i>
                      <p>{userData.name}</p>
                    </Link> :
                    <Link
                      className="nav-link"
                      to="/login-page"
                    >
                      <i className="now-ui-icons users_circle-08"></i>
                      <p>{t('login')}</p>
                    </Link>
                }
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons business_globe mr-1"></i>
                  <p>{t('language')}</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => changeLanguage('vn')}>
                    <img
                      src={require("assets/img/flags/VN.png")}
                      alt="vn-flag"
                    />
                    &nbsp;
                    Vietnamese
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => changeLanguage('en')}
                  >
                    <img
                      src={require("assets/img/flags/GB.png")}
                      alt="gb-flag"
                    />
                    &nbsp;
                    English
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  href={TWITTER_HOME_PAGE}
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href={FACEBOOK_HOME_PAGE}
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href={INSTAGRAM_HOME_PAGE}
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
        <iframe
          width="0"
          title="background-music"
          height="0"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/897372622&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        >
        </iframe>
      </Navbar>

    </>
  );
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  errorMessage: state.auth.error,
  userData: state.auth.data,
});

export default connect(mapStateToProps)(IndexNavbar);
