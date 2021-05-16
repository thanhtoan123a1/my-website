import React, { useEffect, useState } from "react";
import AvatarStatus from "components/AvatarStatus";
import { TIME } from "help/constants";
import { timeAgo } from "help/functions";
import { useTranslation } from "react-i18next";
import { firestore } from "redux/helpers/firebase";
import ChatBox from "components/Chat/ChatBox";
import "./styles.scss";
import { messagesAction } from "redux/modules/messages";

const ChatRoom = (props) => {
  const [rooms, setRooms] = useState({});
  const [chats, setChats] = useState([]);
  const { t } = useTranslation();
  const { user, userList, dispatch } = props;

  useEffect(() => {
    if (firestore && user) {
      const unsubscribe = firestore
        .collection("messages")
        .where(`user${user.uid}`, "==", true)
        .onSnapshot(async (querySnapshot) => {
          const data = await querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          data.sort((a, b) => (a.lastMessageTime < b.lastMessageTime ? 1 : -1));
          setRooms(data);
        });
      return unsubscribe;
    }
  }, [user]);

  function handleClickChat(chat) {
    if (!chat.roomId) {
      dispatch(
        messagesAction.createRoom({
          userId: user.uid,
          partnerId: chat.partnerId,
          lastMessage: "Type a message...",
          createAt: new Date(),
          callback: (e) => {
            handleJoinRoom(chat.partnerId);
          },
        })
      );
    } else {
      handleJoinRoom(chat.partnerId);
    }
  }

  function handleJoinRoom(partnerId) {
    const liveChats = [...chats];
    if (liveChats.find((live) => live.partnerId === partnerId)) return;
    const { roomList } = convertChatRoom();
    const chat = roomList.find((room) => room.partnerId === partnerId);
    if (chat) {
      if (liveChats.length >= 5) {
        liveChats[0] = chat;
      } else {
        liveChats.push(chat);
      }
      setChats(liveChats);
    }
  }

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
  function convertChatRoom() {
    const userNotChatList = [];
    const usersAlreadyChat = [];
    const roomList = rooms.length
      ? rooms.map((room) => {
          let data = {};
          const lastMessageTime = room.lastMessageTime
            ? timeAgo(new Date(room.lastMessageTime.seconds * 1000))
            : "";
          const timeAgoText = `${lastMessageTime.number} ${convertOffset(
            lastMessageTime.offset
          ).toLocaleLowerCase()}`;
          let partnerId = room.user[0];
          if (partnerId === user.uid) {
            partnerId = room.user[1];
          }
          const partnerDetails = userList.find(
            (item) => partnerId === item.uid
          );
          if (partnerDetails) {
            data = {
              roomId: room.id,
              partnerId: partnerDetails.uid,
              lastUpdateText: timeAgoText,
              roomAvatar: partnerDetails.photoURL,
              title: partnerDetails.displayName,
              isOnline: partnerDetails.isOnline || false,
              lastMessage: room.lastMessage,
            };
            usersAlreadyChat.push(partnerDetails.uid);
          }
          return data;
        })
      : [];
    if (userList.length) {
      for (let i = 0; i < userList.length; i++) {
        if (
          userList[i].uid !== user.uid &&
          !usersAlreadyChat.includes(userList[i].uid)
        ) {
          userNotChatList.push({
            roomAvatar: userList[i].photoURL,
            title: userList[i].displayName,
            isOnline: userList[i].isOnline || false,
            lastMessage: userList[i].email,
            partnerId: userList[i].uid,
          });
        }
      }
    }
    if (userNotChatList) {
      userNotChatList.sort((a, b) => (b.isOnline ? 1 : -1));
    }
    return { roomList, userNotChatList };
  }

  function onCloseChat(chatId) {
    const liveChats = chats.filter((live) => live.partnerId !== chatId);
    setChats(liveChats);
  }

  function renderItem(item, isRoom, key) {
    return (
      <div
        key={key}
        className="room-wrapper__item"
        onClick={() => handleClickChat(item)}
      >
        <div className="room-wrapper__item--img">
          <AvatarStatus src={item.roomAvatar} isOnline={item.isOnline} />
        </div>
        <div className="room-wrapper__item--info">
          <div className="room-wrapper__item--title">{item.title}</div>
          <div className="room-wrapper__item--message">
            <div
              className={`room-wrapper__item--last-message ${
                isRoom ? "" : "full-width"
              }`}
            >
              {item.lastMessage ? item.lastMessage : t("aImage")}
            </div>
            <div className="room-wrapper__item--last-update">
              {item.lastUpdateText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderChats(chat) {
    return (
      <div key={chat.partnerId} className="messages-box">
        <ChatBox
          user={chat}
          currentUser={user}
          onClose={onCloseChat}
          dispatch={dispatch}
        />
      </div>
    );
  }

  const { roomList, userNotChatList } = convertChatRoom();
  return (
    <div className="room-wrapper">
      {roomList.map((room, key) => {
        return renderItem(room, true, key);
      })}
      {rooms.length > 0 && <hr />}
      {userNotChatList.map((userChat, key) => renderItem(userChat, false, key))}
      <div className="messages-wrapper">
        {chats.map((chat) => renderChats(chat))}
      </div>
    </div>
  );
};

export default ChatRoom;
