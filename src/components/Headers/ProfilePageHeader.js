import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();
  const { onEdit, currentUser } = props;
  console.log("currentUser", currentUser);

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-wrapper">
            <div className="photo-container">
              <img alt="..." src={currentUser.photoURL ? currentUser.photoURL : require("assets/img/my-portrait.jpg")} className="photo-container__avatar"></img>
            </div>
            <div className="photo-wrapper--button" onClick={onEdit} />
          </div>
          <h3 className="title">{currentUser.displayName}</h3>
          <p className="category">Developer</p>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
