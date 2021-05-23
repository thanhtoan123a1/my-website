import React, { useState } from 'react';
import AvatarStatus from 'components/AvatarStatus';
import { ReactTinyLink } from 'react-tiny-link';
import { timeAgo } from 'help/functions';
import { POST_TYPES } from 'help/constants';
import { Modal, ModalBody } from 'reactstrap';
import { TIME } from 'help/constants';
import Emoji from 'components/Emoji';

const Post = (props) => {
  const { t, currentUser, block, userObj, handleAddComment, handleLike } =
    props;
  const [commentContent, setCommentContent] = useState('');
  const [imgRawData, setImgRawData] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [openEmojiModal, setEmojiModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const toggle = () => setOpenModal(!openModal);
  if (!block || !userObj || Object.keys(userObj).length < 1) return null;
  const reactions =
    block.reactions && block.reactions.length ? block.reactions : [];
  const isLiked = reactions.includes(currentUser.uid);

  const toggleEmoji = () => setEmojiModal(!openEmojiModal);
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

  function handleInputKeyup(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleComment();
    }
  }

  function handleComment() {
    const comments =
      block.comments && block.comments.length ? [...block.comments] : [];
    comments.push({
      content: commentContent,
      createdAt: new Date(),
      userId: currentUser.uid,
      reactions: [],
    });
    const body = {
      comments,
    };
    handleAddComment(body, block.id, imgRawData);
    setImgRawData(null);
    setImgData(null);
    setCommentContent('');
  }

  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newContent = commentContent + emoji.native;
    setCommentContent(newContent);
  }

  const createdAt = block.createdAt
    ? timeAgo(new Date(block.createdAt.seconds * 1000))
    : '';
  const timeAgoText = `${createdAt.number} ${convertOffset(
    createdAt.offset
  ).toLocaleLowerCase()} ${t('ago').toLocaleLowerCase()}`;

  const postUser = userObj[block.userId];

  function handleWriteComment(e) {
    setCommentContent(e.target.value);
  }

  function handleLiked() {
    let newReactions = [...reactions];
    if (isLiked) {
      newReactions = reactions.filter(
        (reaction) => reaction !== currentUser.uid
      );
    } else {
      newReactions.push(currentUser.uid);
    }
    const body = {
      reactions: newReactions,
      postId: block.id,
    };
    handleLike(body);
  }

  function handleViewLiked() {
    if (!reactions.length) return;
    const newModalContent = (
      <div className="post-modal__wrapper">
        {reactions.map((item) => {
          const user = userObj[item];
          return (
            <div key={item} className="post-modal__section">
              <div className="post-modal--avatar">
                <AvatarStatus src={user.photoURL} isOnline={user.isOnline} />
              </div>
              {user.displayName}
            </div>
          );
        })}
      </div>
    );
    setModalContent(newModalContent);
    toggle();
  }

  function removePreviewImage() {
    setImgRawData(null);
    setImgData(null);
  }

  function handleChangeFile(e) {
    if (e.target.files[0]) {
      setImgRawData(e.target.files[0]);
      var reader = new FileReader();

      reader.onload = function (file) {
        setImgData(file.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function renderComment(comment, key) {
    const user = userObj[comment.userId];
    const commentCreatedAt = comment.createdAt
      ? timeAgo(new Date(comment.createdAt.seconds * 1000))
      : '';
    const timeAgoCommentText = `${commentCreatedAt.number} ${convertOffset(
      commentCreatedAt.offset
    ).toLocaleLowerCase()} ${t('ago').toLocaleLowerCase()}`;
    return (
      <div key={key} className="post-block__comment-section">
        <img
          src={user.photoURL}
          alt="user"
          className="post-block__comment--img"
        />
        <div className="comment-content-wrapper post-block__comment-section--wrapper">
          <div className="comment-content post-block__comment-content">
            <div className="comment-content__name">{user.displayName}</div>
            <div
              className="comment-content__text"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></div>
            {comment.imageURL && (
              <img
                src={comment.imageURL}
                alt={comment.imageURL}
                onClick={() => {
                  window.open(comment.imageURL, '_blank');
                }}
                className="post-block__comment-section--img"
              />
            )}
          </div>
          <div className="like-wrapper">
            <span>{timeAgoCommentText}</span>
          </div>
        </div>
      </div>
    );
  }

  function getShareText(type) {
    switch (type) {
      case POST_TYPES.IMAGE:
        if (block.images.length > 1) {
          return t('sharedAnAlbum').toLocaleLowerCase();
        }
        return t('addedANewPhoto').toLocaleLowerCase();
      case POST_TYPES.SHARE:
        return t('sharedALink').toLocaleLowerCase();
      case POST_TYPES.VIDEO:
        return t('addedANewVideo').toLocaleLowerCase();
      default:
        return t('updatedStatus').toLocaleLowerCase();
    }
  }
  if (!postUser) return null;

  return (
    <div className="post-block">
      <div className="post-block__header">
        <div className="post-block__header--avatar">
          <AvatarStatus src={postUser.photoURL} isOnline={postUser.isOnline} />
        </div>
        <div>
          <span className="post-block__header--title">
            {postUser.displayName}
          </span>
          &nbsp;{getShareText(block.type)}
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
        <div
          className={`post-block__comment--item ${
            isLiked ? 'post-active' : ''
          }`}
        >
          <img
            src={
              isLiked
                ? require('assets/img/icons/home/heart-active.png')
                : require('assets/img/icons/home/heart.png')
            }
            alt="user"
            className="post-block__comment--photo"
            onClick={handleLiked}
          />
          <span onClick={handleViewLiked} className="number-wrapper">
            {reactions.length}
          </span>
        </div>
        <div
          className="post-block__comment--item"
          onClick={() => setShowComments(!showComments)}
        >
          <img
            src={require('assets/img/icons/home/comment.png')}
            alt="user"
            className="post-block__comment--photo"
          />
          <span className="number-wrapper">
            {block.comments ? block.comments.length : 0}
          </span>
        </div>
      </div>
      {showComments && block.comments && block.comments.length && (
        <div>
          {block.comments.map((comment, key) => renderComment(comment, key))}
        </div>
      )}
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
            accept="image/*"
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
      {imgData && (
        <div className="preview-img-wrapper__comment">
          <div className="preview-img-wrapper--item">
            <img
              src={imgData}
              className="preview-img-wrapper--cell"
              alt="close-preview"
            />
            <img
              src={require('assets/img/icons/x.png')}
              onClick={removePreviewImage}
              className="preview-img-wrapper--close"
              alt="close-preview"
            />
          </div>
        </div>
      )}
      {openEmojiModal && (
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
      )}
      {openModal && (
        <Modal
          modalTransition={{ timeout: 50 }}
          isOpen={openModal}
          toggle={toggle}
          centered
          size="sm"
        >
          <ModalBody>{modalContent}</ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Post;
