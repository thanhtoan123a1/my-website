import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// reactstrap components
import { Container, Input } from "reactstrap";

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();
  const { onEdit, currentUser, onEditName, changeCoverPhoto, user } = props;
  const [editNameMode, setEditNameMode] = useState(false);
  const oldName = currentUser.displayName || "Unknown";
  const [name, setName] = useState(oldName);

  const { t } = useTranslation();

  function onChangeDisplayName(e) {
    const value = e.target.value;
    setName(value);
  }

  function handleChangeCoverPhoto(e) {
    if (e.target.files[0]) {
      changeCoverPhoto(e.target.files[0]);
    }
  }

  function handleSaveName() {
    onEditName(name.trim());
    setTimeout(() => setEditNameMode(false), 1000);
  }

  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${
              user && user.coverImageURL
                ? user.coverImageURL
                : require("assets/img/bg8.jpg")
            })`,
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-wrapper">
            <div
              className="photo-container"
              onClick={() =>
                window.open(
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : require("assets/img/icons/user.png"),
                  "_blank"
                )
              }
            >
              <img
                alt="..."
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : require("assets/img/icons/user.png")
                }
                className="photo-container__avatar"
              ></img>
            </div>
            <div className="photo-wrapper--image">
              <img
                src={require("assets/img/icons/camera.png")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                alt="button-edit"
              />
            </div>
          </div>
          <h3 className="title input-display-name">
            {editNameMode ? (
              <Input
                value={name}
                className="input-title"
                onChange={onChangeDisplayName}
              />
            ) : (
              currentUser.displayName || "Unknown"
            )}
            {editNameMode && (
              <img
                className="photo-wrapper--edit-name"
                src={require("assets/img/icons/confirm.png")}
                onClick={handleSaveName}
                alt="button-edit"
              />
            )}
            <img
              className="photo-wrapper--edit-name"
              src={require(`assets/img/icons/${
                editNameMode ? "cancel.png" : "edit-box.png"
              }`)}
              onClick={() => setEditNameMode(!editNameMode)}
              alt="button-edit"
            />
          </h3>
          <p>{currentUser.email}</p>
          <input
            type="file"
            id="cover-file"
            className="courses-details-comment--file"
            onChange={handleChangeCoverPhoto}
          />
          <label htmlFor="cover-file">
            <div className="cover-change-icon-wrapper">
              <img
                src={require("assets/img/icons/cover-change.png")}
                alt="cover-change"
                className="cover-change-icon"
              />
              {t("changeCoverPhoto")}
            </div>
          </label>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
