import React, { useState } from "react";

// reactstrap components
import { Container, Progress, Row } from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { connect } from "react-redux";
import { coursesActions } from "redux/modules/courses";
import { useAuth } from "components/contexts/AuthContext";
import { useTranslation } from "react-i18next";

function Slug(props) {
  const { course, dispatch, comments } = props;
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [commentContent, setCommentContent] = useState("");
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    dispatch(coursesActions.getCoursesDetails(props.match.params.slug));
    dispatch(coursesActions.getComments(props.match.params.slug));

    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, props.match.params.slug]);

  function handleUpload() {
    if (commentContent || url) {
      const body = {
        createdAt: new Date(),
        userName: currentUser.displayName,
        email: currentUser.email,
        avatar: currentUser.photoURL,
        content: commentContent,
        media: url,
      };
      dispatch(
        coursesActions.addComment({ courseId: props.match.params.slug, body })
      );
      setUrl("");
      setCommentContent("");
    }
  }

  function renderCommentBlock(comment) {
    return (
      <div key={comment.id} className="comment-blocks">
        <img
          src={comment.avatar}
          alt={comment.avatar}
          className="comment-blocks--image"
        />
        <div className="comment-content">
          <div className="comment-content__name">{comment.email}</div>
          <div className="comment-content__text">{comment.content}</div>
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

  if (!course || !course.fields) return <div />;
  return (
    <div className="wrapper">
      <CoverHeader
        title={course.fields.title}
        coverPhoto={course.fields.coverImage.fields.file.url}
      />
      <div className="courses-details">
        <Container>
          <Row className="content-wrapper">
            {documentToReactComponents(course.fields.document, {
              renderNode: {
                "embedded-asset-block": (node) => (
                  <img
                    src={node.data.target.fields.file.url}
                    alt={course.fields.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                ),
              },
            })}
          </Row>
          <Row className="content-wrapper courses-comment-wrapper">
            {comments && comments.length > 0 && (
              <div className="courses-details-comment">
                {comments.map((comment) => renderCommentBlock(comment))}
              </div>
            )}
            <Row className="content-wrapper courses-comment-wrapper">
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
                <label htmlFor="input-file">
                  <img
                    src={require("assets/img/icons/camera-upload.png")}
                    alt="button"
                  />
                </label>
              </div>
              <div className="comment-send" onClick={handleUpload}>
                <img src={require("assets/img/icons/send.png")} alt="send" />
              </div>
              {progress !== 0 && progress !== 100 && <Progress value={100} />}
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  course: state.courses.coursesDetails,
  comments: state.courses.comments,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Slug);
