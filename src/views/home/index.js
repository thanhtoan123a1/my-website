import React, { useState } from 'react';
import { useAuth } from 'components/contexts/AuthContext';

// core components
import { connect } from 'react-redux';
import './styles.scss';
import Emoji from 'components/Emoji';
import { ModalBody, Modal } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ChatRoom from 'components/Chat/ChatRoom';
import { detectLinkInText } from 'help/functions';
import AvatarStatus from 'components/AvatarStatus';
import { ReactTinyLink } from 'react-tiny-link';
import { newsFeedActions } from 'redux/modules/newsFeed';
import { POST_TYPES, TIME } from 'help/constants';
import { toast } from 'react-toastify';
import { timeAgo } from 'help/functions';

function Home(props) {
  const { currentUser } = useAuth();
  const [commentContent, setCommentContent] = useState('');
  const [content, setContent] = useState('');
  const [shareURL, setShareURL] = useState('');
  const [posts, setPosts] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [imageDataList, setImageDataList] = useState({});
  const [videoData, setVideoData] = useState(null);
  const [openEmojiModal, setEmojiModal] = useState(false);
  const { users, dispatch, userObj } = props;
  const { t } = useTranslation();
  React.useEffect(() => {
    document.body.classList.add('index-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    getAllPosts();
    return function cleanup() {
      document.body.classList.remove('index-page');
      document.body.classList.remove('sidebar-collapse');
    };
    // eslint-disable-next-line
  }, []);
  const toggleEmoji = () => setEmojiModal(!openEmojiModal);

  function handleInputKeyup(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleComment();
    }
  }
  function handleComment() {
    console.log('comment', commentContent);
  }

  function convertOffset(offset) {
    switch (offset) {
      case TIME.SECONDS:
        return t('seconds');
      case TIME.MINUTES:
        return t('minutes');
      case TIME.HOURS:
        return t('hours');
      case TIME.DAYS:
        return t('days');
      case TIME.MONTHS:
        return t('months');
      case TIME.YEARS:
        return t('years');
      default:
        return t('seconds');
    }
  }

  function getAllPosts() {
    dispatch(
      newsFeedActions.getNewsFeed((res) => {
        setPosts(res);
      })
    );
  }

  function handleChangeImages(e) {
    if (e.target.files[0]) {
      const files = e.target.files;
      setImgList(files);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises[i] = new Promise((resolve) => {
          let reader = new FileReader();
          reader.onload = function (e) {
            resolve(e.target.result);
          };
          reader.readAsDataURL(files[i]);
        });
      }
      Promise.all(promises).then((values) => {
        setImageDataList(values);
      });
    }
  }

  function handleChangeFile(e) {
    if (e.target.files[0]) {
    }
  }

  function handleChangeVideo(e) {
    if (e.target.files[0]) {
      const video = e.target.files[0];
      if (video.size > 10485760) {
        toast.error(`${t('videoSizeTooLarge')} (<10Mb)`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setVideoData(video);
      }
    }
  }

  function handleWriteComment(e) {
    setCommentContent(e.target.value);
  }
  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newContent = commentContent + emoji.native;
    const destination = 'status';
    if (destination === 'status') {
      setContent(newContent);
    } else {
      setCommentContent(newContent);
    }
  }

  function handleWriteStatus(e) {
    const { value } = e.target;
    if ((!imgList || !imgList.length) && !videoData) {
      const detectLink = detectLinkInText(value);
      if (detectLink) {
        const link = value.substr(
          detectLink.start,
          detectLink.end - detectLink.start
        );
        setShareURL(link);
      }
    }
    setContent(value);
  }

  function removePreviewImage(index) {
    const dataList = [];
    const dataFiles = [];
    for (let i = 0; i < imageDataList.length; i++) {
      if (i !== index) {
        dataList.push(imageDataList[i]);
        dataFiles.push(imgList[i]);
      }
    }
    setImgList(dataFiles);
    setImageDataList(dataList);
  }

  function handleShare() {
    let type = POST_TYPES.TEXT;
    if (shareURL) {
      type = POST_TYPES.SHARE;
    } else if (imgList && imgList.length) {
      type = POST_TYPES.IMAGE;
    } else if (videoData) {
      type = POST_TYPES.VIDEO;
    }
    if (type === POST_TYPES.IMAGE) {
      dispatch(
        newsFeedActions.uploadMultipleImages({
          callback: (newURLs) => {
            handleAddPost(type, newURLs);
          },
          path: `news-feed/${new Date().getTime()}`,
          files: imgList,
        })
      );
    } else if (type === POST_TYPES.VIDEO) {
      dispatch(
        newsFeedActions.uploadVideo({
          callback: (videoURL) => {
            handleAddPost(type, [], videoURL);
          },
          path: `news-feed/${new Date().getTime()}/${videoData.name}`,
          file: videoData,
        })
      );
    } else {
      handleAddPost(type, [], '');
    }
  }

  function handleAddPost(type, images = [], videoURL = '') {
    const body = {
      callback: () => {
        getAllPosts();
      },
      content,
      createdAt: new Date(),
      userId: currentUser.uid,
      images,
      shareURL,
      type,
      video: videoURL,
    };
    dispatch(newsFeedActions.addPost(body));
    resetAll();
  }

  function resetAll() {
    setContent('');
    setImageDataList([]);
    setShareURL('');
    setImgList([]);
    setVideoData(null);
  }

  function renderPostHeader() {
    const isDisableVideo = (imgList && imgList.length) || !!shareURL;
    const isDisableImages = !!videoData || !!shareURL;
    const isDisableShare =
      (!imgList || imgList.length === 0) && !videoData && !shareURL && !content;
    return (
      <>
        <div className="post-section">
          <div className="post-section__header">
            <div className="post-section__header--item">Status</div>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              className="courses-details-comment--file"
              onChange={handleChangeImages}
              disabled={isDisableImages}
              multiple
            />
            <label
              htmlFor="input-file"
              className={`post-section__header--item-text ${
                isDisableImages ? 'disable-text' : ''
              }`}
            >
              {t('photos')}
            </label>
            <input
              type="file"
              id="input-file-video"
              accept="video/*"
              className="courses-details-comment--file"
              onChange={handleChangeVideo}
              disabled={isDisableVideo}
            />
            <label
              htmlFor="input-file-video"
              className={`post-section__header--item-text ${
                isDisableVideo ? 'disable-text' : ''
              }`}
            >
              Videos
            </label>
          </div>
          <div className="post-section__body">
            <div className="post-section__body--avt">
              <AvatarStatus src={currentUser.photoURL} isOnline />
            </div>
            <input
              type="text"
              value={content}
              id="comment-input"
              onChange={handleWriteStatus}
              placeholder="What's on your mind, Toan?"
              className="comment-wrapper--text"
            />
          </div>
          <div className="post-section__footer">
            <div className="post-section__footer--item">
              <img src={require('assets/img/icons/home/user.png')} alt="type" />
              People
            </div>
            <div className="post-section__footer--item">
              <img
                src={require('assets/img/icons/home/location.png')}
                alt="type"
              />
              Location
            </div>
            <div className="post-section__footer--item" onClick={toggleEmoji}>
              <img src={require('assets/img/icons/home/mood.png')} alt="type" />
              Mood
            </div>
            <div
              className={`post-section__footer--button ${
                isDisableShare ? 'disable-share' : ''
              }`}
              onClick={handleShare}
            >
              {t('share')}
            </div>
          </div>
        </div>
        {shareURL && (
          <div className="post-section__link-preview">
            <ReactTinyLink
              cardSize="large"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={shareURL}
            />
            <img
              src={require('assets/img/icons/x.png')}
              onClick={() => setShareURL('')}
              className="post-section__link-preview--close"
              alt="close-preview"
            />
          </div>
        )}
        {imageDataList && imageDataList.length > 0 && (
          <div className="preview-img-wrapper">
            {imageDataList.map((item, index) => {
              return (
                <div key={index} className="preview-img-wrapper--item">
                  <img
                    src={item}
                    className="preview-img-wrapper--cell"
                    alt="close-preview"
                  />
                  <img
                    src={require('assets/img/icons/x.png')}
                    onClick={() => removePreviewImage(index)}
                    className="preview-img-wrapper--close"
                    alt="close-preview"
                  />
                </div>
              );
            })}
          </div>
        )}
        {videoData && (
          <div className="preview-img-wrapper">
            <div className="preview-img-wrapper--item">
              <img
                src={require('assets/img/default-video.gif')}
                className="preview-img-wrapper--cell"
                alt="close-preview"
              />
              <img
                src={require('assets/img/icons/x.png')}
                onClick={() => setVideoData(null)}
                className="preview-img-wrapper--close"
                alt="close-preview"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  function renderPostBlock(block, key) {
    if (!block || !userObj || Object.keys(userObj).length < 1) return null;
    const createdAt = block.createdAt
      ? timeAgo(new Date(block.createdAt.seconds * 1000))
      : '';
    const timeAgoText = `${createdAt.number} ${convertOffset(
      createdAt.offset
    ).toLocaleLowerCase()} ${t('ago').toLocaleLowerCase()}`;
    const postUser = userObj[block.userId];
    return (
      <div key={key} className="post-block">
        <div className="post-block__header">
          <div className="post-block__header--avatar">
            <AvatarStatus
              src={postUser.photoURL}
              isOnline={postUser.isOnline}
            />
          </div>
          <div>
            <span className="post-block__header--title">
              {postUser.displayName}
            </span>
            &nbsp;shared an album
            <div className="post-block__header--time">{timeAgoText}</div>
          </div>
          <img
            src={require('assets/img/icons/home/more.png')}
            alt="edit"
            className="post-block__header--edit"
          />
        </div>
        <div
          className="post-block__header--content"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
        {block.type === POST_TYPES.IMAGE && (
          <div>
            {block.images.length > 1 ? (
              block.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="user"
                    className="post-block__header--photo"
                  />
                );
              })
            ) : (
              <div className="post-block__header--background">
                <div
                  className="post-block__header--base-background"
                  style={{
                    backgroundImage: `url(${block.images[0]})`,
                  }}
                />
                <img
                  src={block.images[0]}
                  alt="user"
                  className="post-block__header--photo"
                />
              </div>
            )}
          </div>
        )}
        {block.type === POST_TYPES.VIDEO && (
          <video className="post-block__video" controls>
            <source src={block.video} type="video/mp4" />
            <source src={block.video} type="video/avi" />
            Your browser does not support the video tag.
          </video>
        )}
        {block.type === POST_TYPES.SHARE && (
          <div>
            <ReactTinyLink
              cardSize="large"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={block.shareURL}
            />
          </div>
        )}
        <div className="post-block__comment">
          <div className="post-block__comment--item">
            <img
              src={require('assets/img/icons/home/heart.png')}
              alt="user"
              className="post-block__comment--photo"
            />
            {block.reactions ? block.reactions.length : 0}
          </div>
          <div className="post-block__comment--item">
            <img
              src={require('assets/img/icons/home/comment.png')}
              alt="user"
              className="post-block__comment--photo"
            />
            {block.comments ? block.comments.length : 0}
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
              placeholder={t('writeComment')}
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
                src={require('assets/img/icons/home/camera.png')}
                alt="button"
              />
            </label>
            <img
              src={require('assets/img/icons/home/smile.png')}
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
        <div className="home-right">
          {renderPostHeader()}
          <div>{posts?.map((post, key) => renderPostBlock(post, key))}</div>
        </div>
        <div className="home-left">
          <ChatRoom user={currentUser} userList={users} dispatch={dispatch} />
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
  users: state.users.users,
  userObj: state.users.userObj,
});

export default connect(mapStateToProps)(Home);
