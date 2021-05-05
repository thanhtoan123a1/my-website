import React from "react";
import { useAuth } from "components/contexts/AuthContext";

// reactstrap components
import {
  Container,
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import EditImage from "components/EditImage";
import { coursesActions } from "redux/modules/courses";
import { connect } from "react-redux";

function ProfilePage(props) {
  const [editMode, setEditMode] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const { currentUser } = useAuth();
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
  }, []);

  function onSave(preview) {
    const body = {
      image: preview,
      courseId: 'profile',
      setProgress: () => {},
      callback: url => {
        setUrl(url);
      }
    }
    console.log("body", body);
    dispatch(coursesActions.uploadFile(body));
  }

  console.log('url', url);

  return (
    <div className="wrapper">
      <ProfilePageHeader onEdit={() => setEditMode(true)} currentUser={currentUser} />
      <Container>
        {
          editMode &&
          <EditImage src={currentUser.photoURL} onSave={onSave} />
        }
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(ProfilePage);
