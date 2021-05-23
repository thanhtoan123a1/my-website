import React from 'react';
import AvatarStatus from 'components/AvatarStatus';
import { ReactTinyLink } from 'react-tiny-link';

const PostHeader = (props) => {
  const {
    handleChangeImages,
    handleChangeVideo,
    handleWriteStatus,
    handleShare,
    t,
    toggleEmoji,
    setVideoData,
    currentUser,
    removePreviewImage,
    imgList,
    shareURL,
    setShareURL,
    content,
    videoData,
    imageDataList,
  } = props;
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
};

export default PostHeader;
