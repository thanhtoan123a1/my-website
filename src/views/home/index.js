import React from "react";

// core components
import { connect } from "react-redux";
import "./styles.scss";

function Home(props) {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <div className="home-wrapper">
      <div className="home">
        <h1 className="home__title">This is Home</h1>
        <h1><span className="text-danger">Tho</span>, please help me fill news feed content in here!!!</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  landingPageAccess: state.courses.landingPageAccess,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Home);
