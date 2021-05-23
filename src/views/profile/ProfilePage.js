import React from 'react';
import { useAuth } from 'components/contexts/AuthContext';

// reactstrap components
import { Modal, ModalBody } from 'reactstrap';

// core components
import ProfilePageHeader from 'components/Headers/ProfilePageHeader.js';
import EditImage from 'components/EditImage';
import { coursesActions } from 'redux/modules/courses';
import { connect } from 'react-redux';
import { dataBase64URLtoFile } from 'help/functions';
import { authActions } from 'redux/modules/auth';

function ProfilePage(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const { currentUser, updateProfile } = useAuth();
  const { dispatch, user } = props;

  React.useEffect(() => {
    document.body.classList.add('profile-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(authActions.getUserDetail(currentUser.uid));
    return function cleanup() {
      document.body.classList.remove('profile-page');
      document.body.classList.remove('sidebar-collapse');
    };
  }, [currentUser.uid, dispatch]);

  const toggleModal = () => setOpenModal(!openModal);
  function onSave(preview) {
    const image = dataBase64URLtoFile(
      preview,
      `profile-${new Date().getTime()}`
    );
    const body = {
      image,
      courseId: 'profile',
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
    };
    updateProfile(body)
      .then(() => {
        dispatch(
          authActions.updateUser({
            userId: currentUser.uid,
            data: { photoURL: imageURL },
          })
        );
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeCoverPhoto(file) {
    const body = {
      image: file,
      courseId: 'profile',
      setProgress: () => {},
      callback: (url) => {
        dispatch(
          authActions.updateUser({
            userId: currentUser.uid,
            data: { coverImageURL: url },
          })
        );
      },
    };
    dispatch(coursesActions.uploadFile(body));
  }

  function setEditName(name) {
    const body = {
      displayName: name,
    };
    updateProfile(body);
    dispatch(
      authActions.updateUser({
        userId: currentUser.uid,
        data: { displayName: name },
      })
    );
  }

  return (
    <div className="wrapper">
      <ProfilePageHeader
        onEdit={toggleModal}
        onEditName={(name) => setEditName(name)}
        currentUser={currentUser}
        changeCoverPhoto={changeCoverPhoto}
        user={user}
      />
      {openModal && (
        <Modal
          modalTransition={{ timeout: 50 }}
          isOpen={openModal}
          toggle={toggleModal}
          centered
          size="lg"
        >
          <ModalBody>
            <EditImage src={currentUser.photoURL} onSave={onSave} />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ProfilePage);
