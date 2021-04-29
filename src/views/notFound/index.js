import React from "react";
import { useTranslation } from 'react-i18next';

// reactstrap components
import {
  Container,
} from "reactstrap";


function NotFound() {
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
      <div className="section">
        <Container>
          {t('notFound')}
        </Container>
      </div>
    </div>
  );
}

export default NotFound;
