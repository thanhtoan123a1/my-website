import React from 'react';
import './styles.scss';

const AvatarStatus = (props) => {

  const { src, isOnline } = props;
  return <div className="avatar-status-wrapper">
    <img className="avatar-status-wrapper--img" src={src} alt="avatar" />
    <div className={`avatar-status-wrapper--status ${isOnline? 'status-online' : 'status-offline'}`} />
  </div>
}

export default AvatarStatus;
