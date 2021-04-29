/*eslint-disable*/
import { FACEBOOK_HOME_PAGE } from "help/constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  const { t } = useTranslation()
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href={FACEBOOK_HOME_PAGE}
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <Link
                to="/vlogs"
              >
                {t('vlogs')}
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
              >
                {t('courses')}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="https://www.invisionapp.com?ref=nukr-default-footer"
            target="_blank"
          >
            Invision
          </a>
          . Coded by{" "}
          <a
            href={FACEBOOK_HOME_PAGE}
            target="_blank"
          >
            ToanTVT
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
