import React from "react";

// core components
import TopHeader from "components/Headers/TopHeader.js";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import { CONTENT_TYPE, CONTENTFUL_TAGS } from "help/constants";
import { useAuth } from "components/contexts/AuthContext";
import { Redirect } from "react-router";

// sections for this page
// import Images from "./index-sections/Images.js";
// import BasicElements from "./index-sections/BasicElements.js";
// import Navbars from "./index-sections/Navbars.js";
// import Tabs from "./index-sections/Tabs.js";
// import Pagination from "./index-sections/Pagination.js";
// import Notifications from "./index-sections/Notifications.js";
// import Typography from "./index-sections/Typography.js";
// import Javascript from "./index-sections/Javascript.js";
// import Carousel from "./index-sections/Carousel.js";
// import NucleoIcons from "./index-sections/NucleoIcons.js";
// import CompleteExamples from "./index-sections/CompleteExamples.js";
// import SignUp from "./index-sections/SignUp.js";
// import Examples from "./index-sections/Examples.js";
// import Download from "./index-sections/Download.js";

function Top(props) {

  const { langdingPageAccess, dispatch } = props;

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
      <TopHeader langdingPageAccess={langdingPageAccess} />
      {/* <div className="main">
        <Images />
        <BasicElements />
        <Navbars />
        <Tabs />
        <Pagination />
        <Notifications />
        <Typography />
        <Javascript />
        <Carousel />
        <NucleoIcons />
        <CompleteExamples />
        <SignUp />
        <Examples />
        <Download />
      </div> */}
    </div>
  );
}

const mapStateToProps = state => ({
  langdingPageAccess: state.courses.langdingPageAccess,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Top);
