import React, { useState } from "react";
import { useAuth } from "components/contexts/AuthContext";

// core components
import { connect } from "react-redux";
import "./styles.scss";
import Emoji from "components/Emoji";
import { ModalBody, Modal } from "reactstrap";
import { useTranslation } from "react-i18next";

function Home(props) {
  const { currentUser } = useAuth();
  const [commentContent, setCommentContent] = useState("");
  const [openEmojiModal, setEmojiModal] = useState(false);
  const { t } = useTranslation();
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
  const toggleEmoji = () => setEmojiModal(!openEmojiModal);

  function handleInputKeyup(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleComment();
    }
  }
  function handleComment() {
    console.log("comment", commentContent);
  }

  function handleChangeFile(e) {
    if (e.target.files[0]) {
      console.log("file", e.target.files[0]);
    }
  }
  function handleWriteComment(e) {
    setCommentContent(e.target.value);
  }
  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newContent = commentContent + emoji.native;
    setCommentContent(newContent);
  }
  const blocks = [
    {
      id: 1,
      userName: "Thanh Toan",
      photoURL:
        "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
      type: "image",
      imageURL:
        "https://my-website-web.vercel.app/static/media/react.ca31f74a.png",
      content: "Turn on notification",
      reactions: [
        {
          email: "thanhtoan123a1@gmail.com",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "love",
        },
        {
          email: "toantvt@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "like",
        },
        {
          email: "toantvt+1@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "sad",
        },
        {
          email: "toantvt+2@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "angry",
        },
        {
          email: "toantvt+3@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "smile",
        },
      ],
      comment: 20,
    },
    {
      id: 2,
      userName: "Thanh Toan 1",
      photoURL:
        "https://my-website-web.vercel.app/static/media/photoshop.7ed55304.jpg",
      type: "image",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/my-website-ba5a0.appspot.com/o/courses%2F1efksMEa4w6eTPumY5yi4o%2F39D0373F-20E7-4EC9-A179-9F8BFF0832B2.png?alt=media&token=b5196769-621b-468e-97b8-6bfcac3573a7",
      content: "Bài đăng đầu tiên",
      reactions: [
        {
          email: "toantvt+2@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "angry",
        },
        {
          email: "toantvt+3@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "smile",
        },
      ],
      comment: 20,
    },
    {
      id: 3,
      userName: "Thanh Toan 2",
      photoURL:
        "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
      type: "image",
      imageURL:
        "http://images.ctfassets.net/wew8a337s7oc/6CLLz2JNEml4dCckzPXvcD/9bf331c17efe0178d93dd9c25e5ac9c9/cong-cu-ai-2.jpg",
      content: "Bài đăng đầu tiên",
      reactions: [
        {
          email: "toantvt+2@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "angry",
        },
        {
          email: "toantvt+3@hblab.vn",
          avatar:
            "http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg",
          type: "smile",
        },
      ],
      comment: 20,
    },
  ];

  function handleWriteStatus(e) {
    const { value } = e.target;
    console.log("value", value);
  }
  function renderPostBlock(block, key) {
    return (
      <div key={key} className="post-block">
        <div className="post-block__header">
          <img
            src={block.photoURL}
            alt="user"
            className="post-block__header--avatar"
          />
          <div>
            <span className="post-block__header--title">{block.userName}</span>
            &nbsp;shared an album
            <div className="post-block__header--time">6 hours ago</div>
          </div>
          <img
            src={require("assets/img/icons/home/more.png")}
            alt="edit"
            className="post-block__header--edit"
          />
        </div>
        <div className="post-block__header--content">{block.content}</div>
        <div className="post-block__header--background">
          <div
            className="post-block__header--base-background"
            style={{
              backgroundImage: `url(${block.imageURL})`,
            }}
          />
          <img
            src={block.imageURL}
            alt="user"
            className="post-block__header--photo"
          />
        </div>
        <div className="post-block__comment">
          <div className="post-block__comment--item">
            <img
              src={require("assets/img/icons/home/heart.png")}
              alt="user"
              className="post-block__comment--photo"
            />
            {block.reactions.length}
          </div>
          <div className="post-block__comment--item">
            <img
              src={require("assets/img/icons/home/comment.png")}
              alt="user"
              className="post-block__comment--photo"
            />
            {block.comment}
          </div>
        </div>
        <div className="post-block__comment--post">
          <img
            src={currentUser.photoURL}
            alt="user"
            className="post-block__comment--img"
          />
          <div className="post-block__comment-wrapper">
            <input
              type="text"
              onKeyUp={handleInputKeyup}
              value={commentContent}
              onChange={handleWriteComment}
              placeholder={t("writeComment")}
              className="post-block__comment-wrapper--text"
            />
            <input
              type="file"
              id={`input-file-${block.id}`}
              className="courses-details-comment--file"
              onChange={handleChangeFile}
            />
            <label htmlFor={`input-file-${block.id}`}>
              <img
                src={require("assets/img/icons/home/camera.png")}
                alt="button"
              />
            </label>
            <img
              src={require("assets/img/icons/home/smile.png")}
              alt="emoji-icon"
              className="post-block__comment-wrapper--emoji"
              onClick={toggleEmoji}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="home-wrapper">
      <div className="home">
        <div className="home-left"></div>
        <div className="home-right">
          <div className="post-section">
            <div className="post-section__header">
              <div className="post-section__header--item">Status</div>
              <div className="post-section__header--item-text">Photos</div>
              <div className="post-section__header--item-text">Videos</div>
            </div>
            <div className="post-section__body">
              <img
                src="http://images.ctfassets.net/wew8a337s7oc/5BKRvIAHGrurgYeWRv1heE/ed93512f19f385e40dd1f1f73d7baa68/25791096_1173048532827338_6844968991832809549_o.jpg"
                alt="avt"
              />
              <input
                type="text"
                id="comment-input"
                onChange={handleWriteStatus}
                placeholder="What's on your mind, Toan?"
                className="comment-wrapper--text"
              />
            </div>
            <div className="post-section__footer">
              <div className="post-section__footer--item">
                <img
                  src={require("assets/img/icons/home/user.png")}
                  alt="type"
                />
                People
              </div>
              <div className="post-section__footer--item">
                <img
                  src={require("assets/img/icons/home/location.png")}
                  alt="type"
                />
                Location
              </div>
              <div className="post-section__footer--item">
                <img
                  src={require("assets/img/icons/home/mood.png")}
                  alt="type"
                />
                Mood
              </div>
              <div className="post-section__footer--button">Share</div>
            </div>
          </div>
          <div>{blocks.map((block, key) => renderPostBlock(block, key))}</div>
        </div>
      </div>
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
  );
}

const mapStateToProps = (state) => ({
  landingPageAccess: state.courses.landingPageAccess,
  isChecking: state.courses.isChecking,
  error: state.courses.error,
});

export default connect(mapStateToProps)(Home);
