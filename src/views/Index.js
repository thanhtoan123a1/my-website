import React from "react";

// core components
import TopHeader from "components/Headers/TopHeader.js";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import { CONTENT_TYPE, CONTENTFUL_TAGS } from "help/constants";
import { useAuth } from "components/contexts/AuthContext";
import { Redirect } from "react-router";

function Top(props) {

  const { landingPageAccess, dispatch } = props;

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(coursesActions.getLandingPageAsset({
      content_type: CONTENT_TYPE.LANDING_PAGE,
      "metadata.tags.sys.id[in]": CONTENTFUL_TAGS.LANDING_PAGE,
      'order': 'fields.index',
    }));
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch]);
  const { currentUser } = useAuth();
  if (currentUser && (!currentUser.displayName || !currentUser.photoURL)) return <Redirect to="/profile-page" />;
  return (
    <div className="wrapper">
      <TopHeader landingPageAccess={landingPageAccess} />
    </div>
  );
}

const mapStateToProps = state => ({
  landingPageAccess: state.courses.landingPageAccess,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Top);
