import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { firestore } from "redux/helpers/firebase";
import "./styles.scss";
import AvatarStatus from "components/AvatarStatus";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";
import Emoji from "components/Emoji";
import { messagesAction } from "redux/modules/messages";
import { coursesActions } from "redux/modules/courses";

const TIME_DIVIDE = 60; //60s equivalent 1 minute
const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image",
};
const ChatBox = ({ user, currentUser, onClose, dispatch }) => {
  const [chats, setChats] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const [openEmojiModal, setEmojiModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { t } = useTranslation();
  const toggleEmoji = () => setEmojiModal(!openEmojiModal);
  const chatContainerRef = useRef(null);

  function clickEmoji(emoji) {
    setEmojiModal(false);
    const newChatContent = chatContent + emoji.native;
    setChatContent(newChatContent);
  }
  useEffect(() => {
    if (firestore && user && user.roomId) {
      const unsubscribe = firestore
        .collection("messages")
        .doc(user.roomId)
        .collection("messages")
        .orderBy("createAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          let i = -1;
          let j = -1;
          let myTimeDuration = 0;
          let partnerTimeDuration = 0;
          const myChats = [];
          const partnerChats = [];
          let isMyChat = true;
          querySnapshot.docs.forEach((doc) => {
            const msg = doc.data();
            const item = {
              ...msg,
              id: doc.id,
              createAt: msg.createAt.seconds,
            };
            if (msg.userId === currentUser.uid) {
              if (isMyChat) {
                if (msg.createAt.seconds - myTimeDuration > TIME_DIVIDE) {
                  i = i + 1;
                  myTimeDuration = msg.createAt.seconds;
                  myChats[i] = {
                    createAt: myTimeDuration,
                    isMyChat,
                    list: [item],
                  };
                } else {
                  myChats[i].list.push(item);
                }
              } else {
                isMyChat = true;
                i = i + 1;
                myTimeDuration = msg.createAt.seconds;
                myChats[i] = {
                  createAt: myTimeDuration,
                  isMyChat,
                  list: [item],
                };
              }
            } else {
              if (!isMyChat) {
                if (msg.createAt.seconds - partnerTimeDuration > TIME_DIVIDE) {
                  j = j + 1;
                  partnerTimeDuration = msg.createAt.seconds;
                  partnerChats[j] = {
                    createAt: partnerTimeDuration,
                    isMyChat,
                    list: [item],
                  };
                } else {
                  partnerChats[j].list.push(item);
                }
              } else {
                isMyChat = false;
                j = j + 1;
                partnerTimeDuration = msg.createAt.seconds;
                partnerChats[j] = {
                  createAt: partnerTimeDuration,
                  isMyChat,
                  list: [item],
                };
              }
            }
          });
          const chatList = [...myChats, ...partnerChats].sort((a, b) =>
            a.createAt < b.createAt ? -1 : 1
          );
          setChats(chatList);
          setTimeout(() => {
            scrollToMyRef();
          }, 500);
        });
      return unsubscribe;
    }
  }, [user, currentUser, dispatch]);

  function handleChangeFile(e) {
    if (e.target.files[0]) {
      const body = {
        image: e.target.files[0],
        courseId: `messages/${user.roomId}`,
        setProgress: () => {},
        callback: (url) => {
          handleChat(url);
        },
      };
      dispatch(coursesActions.uploadFile(body));
    }
  }
  function collapseBox() {
    setCollapse(!collapse);
  }

  function renderChats() {
    if (chats.length < 1) return null;
    return chats.map((chat, index) => {
      return renderChat(chat, index);
    });
  }
  function handleInputKeyup(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleChat();
    }
  }
  function handleWriteChatContent(event) {
    setChatContent(event.target.value);
  }

  function handleChat(imgURL = "") {
    dispatch(
      messagesAction.addMessages({
        roomId: user.roomId,
        userId: currentUser.uid,
        partnerId: user.partnerId,
        content: chatContent,
        createAt: new Date(),
        type: imgURL ? MESSAGE_TYPE.IMAGE : MESSAGE_TYPE.TEXT,
        imgURL,
      })
    );
    setChatContent("");
  }

  function createClassName(index, length, user) {
    if (length < 2) {
      return `chat-box__body--${user}-circle`;
    }
    if (index === 0) {
      return `chat-box__body--${user}-first`;
    }
    if (index === length - 1) {
      return `chat-box__body--${user}-end`;
    }
    return `chat-box__body--${user}-normal`;
  }

  function renderChat(chat, index) {
    const { list, createAt, isMyChat } = chat;
    return (
      <div key={index}>
        <div className="chat-box__body--time">
          {dayjs(createAt * 1000)
            .locale("vn")
            .format("ddd HH:mm:ss A")}
        </div>
        <div className="chat-box__body--wrapper">
          {!isMyChat && (
            <div className="chat-box__body--avatar">
              <AvatarStatus src={user.roomAvatar} isOnline={user.isOnline} />
            </div>
          )}
          <div
            className={`chat-box__body--text-${isMyChat ? "right" : "left"}`}
          >
            {list.map((msg, index) => {
              return (
                <div key={index} className="chat-box__body--block">
                  {msg.type === MESSAGE_TYPE.TEXT ? (
                    <div
                      key={index}
                      className={`${createClassName(
                        index,
                        list.length,
                        isMyChat ? "my" : "partner"
                      )} ${
                        isMyChat ? "background-active" : "background-normal"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <img
                      src={msg.imgURL}
                      alt="img"
                      className="chat-box__body--image"
                      onClick={() => window.open(msg.imgURL, "_blank")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  function scrollToMyRef() {
    if (chatContainerRef && chatContainerRef.current) {
      const scroll =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.clientHeight;
      chatContainerRef.current.scrollTo(0, scroll);
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-box__header" onClick={collapseBox}>
        <div
          className={`chat-box__header--status ${
            user.isOnline ? "status-online" : "status-offline"
          }`}
        />
        <div className="chat-box__header--title">{user.title}</div>
        <div className="chat-box__header--button">
          <img
            src={require("assets/img/icons/home/minus.png")}
            alt="button"
            className="chat-box__header--button-minimize"
            onClick={collapseBox}
          />
          <img
            src={require("assets/img/icons/home/close.png")}
            className="chat-box__header--button-close"
            alt="button"
            onClick={() => onClose(user.partnerId)}
          />
        </div>
      </div>
      {!collapse && (
        <>
          <div className="chat-box__body" ref={chatContainerRef}>
            {renderChats()}
          </div>
          <div className="chat-box__footer">
            <input
              type="text"
              onKeyUp={handleInputKeyup}
              value={chatContent}
              onChange={handleWriteChatContent}
              placeholder={t("typeAMessage")}
              className="chat-box__footer--input-text"
            />
            <input
              type="file"
              id={`input-image-${user.partnerId}`}
              className="courses-details-comment--file"
              onChange={handleChangeFile}
            />
            <label htmlFor={`input-image-${user.partnerId}`}>
              <img
                src={require("assets/img/icons/home/camera.png")}
                alt="button"
                className="post-block__comment-wrapper--emoji"
              />
            </label>
            <img
              src={require("assets/img/icons/home/smile.png")}
              alt="emoji-icon"
              className="post-block__comment-wrapper--emoji"
              onClick={toggleEmoji}
            />
          </div>
        </>
      )}
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
};

export default ChatBox;
