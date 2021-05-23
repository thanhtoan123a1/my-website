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
import { newsFeedActions } from 'redux/modules/newsFeed';
import { POST_TYPES } from 'help/constants';
import { toast } from 'react-toastify';
import PostHeader from './PostHeader';
import Post from './Post';

function Home(props) {
  const { currentUser } = useAuth();
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

  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newContent = content + emoji.native;
    setContent(newContent);
  }

  function handleLike(params) {
    const { reactions, postId } = params;
    const body = {
      reactions,
    };
    updatePost(body, postId);
  }

  function handleAddComment(body, postId, imgRawData) {
    const newBody = { ...body };
    if (imgRawData) {
      dispatch(
        newsFeedActions.uploadSingleFile({
          callback: (imgURL) => {
            newBody.comments[newBody.comments.length - 1].imageURL = imgURL;
            updatePost(newBody, postId);
          },
          path: `news-feed/${new Date().getTime()}/${imgRawData.name}`,
          file: imgRawData,
        })
      );
    } else {
      updatePost(newBody, postId);
    }
  }

  function updatePost(body, postId) {
    const params = {
      callback: () => {
        getAllPosts();
      },
      postId,
      body,
    };
    dispatch(newsFeedActions.updateNewPost(params));
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
        newsFeedActions.uploadSingleFile({
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

  return (
    <div className="home-wrapper">
      <div className="home">
        <div className="home-right">
          <PostHeader
            handleChangeImages={handleChangeImages}
            handleChangeVideo={handleChangeVideo}
            handleWriteStatus={handleWriteStatus}
            handleShare={handleShare}
            t={t}
            toggleEmoji={toggleEmoji}
            setVideoData={setVideoData}
            currentUser={currentUser}
            removePreviewImage={removePreviewImage}
            imgList={imgList}
            shareURL={shareURL}
            content={content}
            videoData={videoData}
            imageDataList={imageDataList}
            setShareURL={setShareURL}
          />
          <div>
            {posts?.map((post, key) => (
              <Post
                t={t}
                currentUser={currentUser}
                block={post}
                key={key}
                userObj={userObj}
                handleAddComment={handleAddComment}
                handleLike={handleLike}
              />
            ))}
          </div>
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
