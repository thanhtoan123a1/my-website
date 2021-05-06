import React from "react";
import { useAuth } from "components/contexts/AuthContext";

// reactstrap components
import { Container } from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import EditImage from "components/EditImage";
import { coursesActions } from "redux/modules/courses";
import { connect } from "react-redux";
import { dataBase64URLtoFile } from "help/functions";

function ProfilePage(props) {
  const [editMode, setEditMode] = React.useState(false);
  const { currentUser, updateProfile } = useAuth();
  const { dispatch } = props;

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
  }, [currentUser]);

  function onSave(preview) {
    const image = dataBase64URLtoFile(preview, `profile-${new Date().getTime()}`);
    const body = {
      image,
      courseId: "profile",
      setProgress: () => {},
      callback: (url) => {
        setAvatar(url);
      },
    };
    dispatch(coursesActions.uploadFile(body));
  }

  function setAvatar(imageURL) {
    const body = {
      photoURL: imageURL,
      coverURL: imageURL,
    }
    updateProfile(body).then(() => {
      window.location.reload();
    }).catch(error => {
      console.log(error);
    });
  }

  function setEditName(name) {
    const body = {
      displayName: name,
    }
    updateProfile(body);
  }

  return (
    <div className="wrapper">
      <ProfilePageHeader
        onEdit={() => setEditMode(true)}
        onEditName={name => setEditName(name)}
        currentUser={currentUser}
      />
      <Container>
        {editMode && <EditImage src={currentUser.photoURL} onSave={onSave} />}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(ProfilePage);
