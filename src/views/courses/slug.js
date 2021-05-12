import React, { useState } from "react";

// reactstrap components
import { Container, Modal, ModalBody, Progress, Row } from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import { useAuth } from "components/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { timeAgo } from "help/functions";
import { TIME } from "help/constants";
import { DATE_FORMAT } from "help/constants";
import Emoji from "components/Emoji";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Head from "components/HeadTag";

function Slug(props) {
  const { course, dispatch, comments, likes } = props;
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [commentContent, setCommentContent] = useState("");
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openEmojiModal, setEmojiModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const toggle = () => setModal(!modal);
  const toggleEmoji = () => setEmojiModal(!openEmojiModal);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(coursesActions.getCoursesDetails(props.match.params.slug));
    dispatch(coursesActions.getComments(props.match.params.slug));
    dispatch(coursesActions.getLikeList(props.match.params.slug));

    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, props.match.params.slug]);

  function convertOffset(offset) {
    switch (offset) {
      case TIME.SECONDS:
        return t("seconds");
      case TIME.MINUTES:
        return t("minutes");
      case TIME.HOURS:
        return t("hours");
      case TIME.DAYS:
        return t("days");
      case TIME.MONTHS:
        return t("months");
      case TIME.YEARS:
        return t("years");
      default:
        return t("seconds");
    }
  }

  function handleClicksReaction(loveList) {
    const modalContent = (
      <div className="reaction-modal-wrapper">
        {loveList.map((item) => {
          return (
            <div key={item} className="reaction-modal">
              <img src={require("assets/img/icons/love.png")} alt="like" />
              {item}
            </div>
          );
        })}
      </div>
    );
    setModalContent(modalContent);
    toggle();
  }

  function handleClicksLikeTotal() {
    const modalContent = (
      <div className="reaction-modal-wrapper">
        {likes.map((item) => {
          return (
            <div key={item} className="reaction-modal">
              <img
                src={require("assets/img/icons/like-circle.png")}
                alt="like"
              />
              {item}
            </div>
          );
        })}
      </div>
    );
    setModalContent(modalContent);
    toggle();
  }

  function toggleShare() {
    const modalContent = (
      <div className="share-wrapper">
        <FacebookShareButton
          url={window.location.href}
          quote="This is demo"
          hashtag=""
        >
          <FacebookIcon round={true} />
          <br />
          Facebook
        </FacebookShareButton>
        &nbsp;&nbsp;&nbsp;
        <TwitterShareButton
          url={window.location.href}
          quote="This is demo"
          hashtag=""
        >
          <TwitterIcon round={true} />
          <br />
          Twitter
        </TwitterShareButton>
      </div>
    );
    setModalContent(modalContent);
    toggle();
  }

  function handleDeleteComment(comment) {
    if (window.confirm(t("deleteComment"))) {
      dispatch(
        coursesActions.deleteComment({
          courseId: props.match.params.slug,
          commentId: comment.id,
        })
      );
    }
  }
  function handleUpload() {
    if (commentContent || url) {
      const body = {
        createdAt: new Date(),
        email: currentUser.email,
        content: commentContent,
        media: url,
        userId: currentUser.uid,
      };
      dispatch(
        coursesActions.addComment({ courseId: props.match.params.slug, body })
      );
      setUrl("");
      setCommentContent("");
    }
  }

  function handleLoveAction(comment) {
    const loveList = comment.loveList;
    let data = [];
    if (loveList && loveList.length) {
      if (loveList.includes(currentUser.email)) {
        data = loveList.filter((item) => {
          return item !== currentUser.email;
        });
      } else {
        data = [...loveList, currentUser.email];
      }
    } else {
      data.push(currentUser.email);
    }
    dispatch(
      coursesActions.loveComment({
        courseId: props.match.params.slug,
        data,
        commentId: comment.id,
      })
    );
  }

  function handleClicksLike() {
    let data = [];
    if (likes && likes.length) {
      if (likes.includes(currentUser.email)) {
        data = likes.filter((item) => {
          return item !== currentUser.email;
        });
      } else {
        data = [...likes, currentUser.email];
      }
    } else {
      data.push(currentUser.email);
    }
    dispatch(
      coursesActions.likeCourse({
        courseId: props.match.params.slug,
        data,
      })
    );
  }

  function renderCommentBlock(comment) {
    const createdAt = comment.createdAt
      ? timeAgo(new Date(comment.createdAt.seconds * 1000))
      : "";
    const timeAgoText = `${createdAt.number} ${convertOffset(
      createdAt.offset
    ).toLocaleLowerCase()} ${t("ago").toLocaleLowerCase()}`;
    const loveList = comment.loveList || [];
    return (
      <div key={comment.id} className="comment-blocks">
        <img
          src={comment.avatar}
          alt={comment.avatar}
          className="comment-blocks--image"
        />
        <div className="comment-content-wrapper">
          <div className="comment-content">
            <div className="comment-content__name">
              {comment.userName || comment.email}
            </div>
            <div
              className="comment-content__text"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></div>
            {comment.media && (
              <img
                src={comment.media}
                alt={comment.media}
                onClick={() => {
                  window.open(comment.media, "_blank");
                }}
                className="comment-content__media"
              />
            )}
            {currentUser && comment.email === currentUser.email && (
              <div
                className="delete-comment"
                onClick={() => handleDeleteComment(comment)}
              >
                <img src={require("assets/img/icons/x.png")} alt="delete" />
              </div>
            )}
            {loveList.length > 0 && (
              <div
                className="like-number-wrapper"
                onClick={() => handleClicksReaction(loveList)}
              >
                <img
                  src={require("assets/img/icons/love.png")}
                  alt="like"
                  className="number-like"
                />
                {loveList.length}
              </div>
            )}
          </div>
          <div className="like-wrapper">
            {currentUser && (
              <div
                className={`like-text ${
                  loveList.includes(currentUser.email)
                    ? "active-like"
                    : "normal-like"
                }`}
                onClick={() => handleLoveAction(comment)}
              >
                {t("love")}
              </div>
            )}
            <span>{timeAgoText}</span>
          </div>
        </div>
      </div>
    );
  }

  function handleChangeFile(e) {
    if (e.target.files[0]) {
      const body = {
        image: e.target.files[0],
        courseId: props.match.params.slug,
        setProgress: setProgress,
        callback: (url) => {
          setUrl(url);
        },
      };
      dispatch(coursesActions.uploadFile(body));
    }
  }

  function handleWriteComment(e) {
    setCommentContent(e.target.value);
  }

  function handleInputKeyup(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleUpload();
    }
  }

  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newContent = commentContent + emoji.native;
    setCommentContent(newContent);
  }

  if (!course || !course.fields) return <div />;
  return (
    <div className="wrapper">
      <Head
        title={course.fields.title}
        description={course.fields.description}
        ogUrl={window.location.href}
        ogImageUrl={`https:${course.fields.coverImage.fields.file.url}`}
        siteName={t("toanCourse")}
        keyword="Course"
      />
      <CoverHeader
        title={course.fields.title}
        coverPhoto={course.fields.coverImage.fields.file.url}
      />
      <div className="courses-details">
        <Container className="course-details-wrapper">
          <Row className="content-wrapper">
            {documentToReactComponents(course.fields.document, {
              renderNode: {
                "embedded-asset-block": (node) => (
                  <img
                    src={node.data.target.fields.file.url}
                    alt={course.fields.title}
                    style={{ width: "100%", alignSelf: "center" }}
                  />
                ),
              },
            })}
            <div className="date-wrapper">
              <i>
                {new Date(course.sys.createdAt).toLocaleString(
                  "en-US",
                  DATE_FORMAT.NORMAL
                )}
              </i>
            </div>
            <div className="course-details-info-footer">
              {likes.length > 0 && (
                <div
                  className="course-details-info-footer__item-left"
                  onClick={handleClicksLikeTotal}
                >
                  <img
                    src={require("assets/img/icons/like-circle.png")}
                    alt="like"
                  />
                  {likes.length}
                </div>
              )}
              {comments.length > 0 && (
                <div
                  className="course-details-info-footer__item-right"
                  onClick={() => setOpenComment(true)}
                >
                  {comments.length} {t("comments")}
                </div>
              )}
            </div>
            <div className="course-details-footer">
              {currentUser && (
                <div
                  className={`${
                    likes.includes(currentUser.email) ? "active" : ""
                  } course-details-footer__item`}
                  onClick={handleClicksLike}
                >
                  {likes.includes(currentUser.email) ? (
                    <img
                      src={require("assets/img/icons/like-active.png")}
                      alt="like"
                    />
                  ) : (
                    <img
                      src={require("assets/img/icons/like.png")}
                      alt="like"
                    />
                  )}
                  {t("like")}
                </div>
              )}
              <div
                className="course-details-footer__item"
                onClick={() => setOpenComment(true)}
              >
                <img src={require("assets/img/icons/comment.png")} alt="like" />
                {t("comments")}
              </div>
              <div
                className="course-details-footer__item"
                onClick={toggleShare}
              >
                <img
                  src={require("assets/img/icons/share-transparent.png")}
                  alt="like"
                />
                {t("share")}
              </div>
            </div>
          </Row>
          {openComment && (
            <Row className="content-wrapper courses-comment-wrapper">
              {comments && comments.length > 0 && (
                <div className="courses-details-comment">
                  {comments.map((comment) => renderCommentBlock(comment))}
                </div>
              )}
              {currentUser && (
                <Row className="content-wrapper courses-comment-wrapper comment-input">
                  <div className="courses-details-comment comment-wrapper">
                    <input
                      type="text"
                      onKeyUp={handleInputKeyup}
                      id="comment-input"
                      value={commentContent}
                      onChange={handleWriteComment}
                      placeholder={t("writeComment")}
                      className="comment-wrapper--text"
                    />
                    <input
                      type="file"
                      id="input-file"
                      className="courses-details-comment--file"
                      onChange={handleChangeFile}
                    />
                    <img
                      src={require("assets/img/icons/emoji.png")}
                      alt="emoji-icon"
                      className="emoji-icon-item"
                      onClick={toggleEmoji}
                    />
                    <label htmlFor="input-file">
                      <img
                        src={require("assets/img/icons/camera-upload.png")}
                        alt="button"
                      />
                    </label>
                  </div>
                  <div
                    className={`comment-send ${
                      !url && !commentContent ? "disable-send" : ""
                    }`}
                    onClick={handleUpload}
                  >
                    <img
                      src={require("assets/img/icons/send.png")}
                      alt="send"
                    />
                  </div>
                  {progress !== 0 && progress !== 100 && (
                    <Progress value={100} />
                  )}
                  {url && (
                    <div className="preview-wrapper">
                      <img src={url} className="img-preview" alt="preview" />
                      <img
                        src={require("assets/img/icons/x.png")}
                        onClick={() => setUrl("")}
                        className="img-close-preview"
                        alt="close-preview"
                      />
                    </div>
                  )}
                </Row>
              )}
            </Row>
          )}
        </Container>
      </div>
      <Modal
        modalTransition={{ timeout: 100 }}
        isOpen={modal}
        toggle={toggle}
        centered
        size="sm"
      >
        <ModalBody>{modalContent}</ModalBody>
      </Modal>
      <div className="emoji-modal-wrapper">
        <Modal
          modalTransition={{ timeout: 50 }}
          isOpen={openEmojiModal}
          toggle={toggleEmoji}
          centered
          size="sm"
        >
          <ModalBody>
            <Emoji clickEmoji={clickEmoji} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  course: state.courses.coursesDetails,
  comments: state.courses.comments,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
  likes: state.courses.likes,
});

export default connect(mapStateToProps)(Slug);
