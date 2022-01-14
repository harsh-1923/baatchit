import React, { useEffect, useState } from "react";
import "./chatpage.css";
import { db, auth, storage } from "../../firebase";
import UserBadge from "../../components/UserBadge/UserBadge";
import Chat from "../../components/Chat/Chat";
import Message from "../../components/Message/Message";
import Messages from "../../components/Messages/Messages";

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const ChatPage = ({ dark }) => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
  // console.log(user1);
  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [user1]));
    //
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = (user) => {
    setChat(user);
    console.log(chat);

    const user2 = user.uid; //selected user
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  // console.log(msgs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
      img = "";
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
  };

  const statusColor = chat ? (chat.isOnline ? "green" : "red") : "red";

  //color scheme set
  const backgroundColor = dark ? "#121212" : "#F2EEEE";
  const primary = dark ? "white" : "black";
  return (
    <div
      className="chat-page-wrapper"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="user-list-wrapper">
        <div className="user-list-title">
          <h2>Messages</h2>
        </div>
        <div className="user-names">
          {users.map((user) => {
            return (
              <UserBadge key={user.uid} user={user} selectUser={selectUser} />
            );
          })}
        </div>
      </div>
      <div className="chat">
        {chat ? (
          <div className="chat-wrapper">
            <div className="chat-title">
              <h2 style={{ marginRight: "10px" }}>{chat.name}</h2>
              <div
                className="status-indicator"
                style={{ backgroundColor: statusColor }}
              ></div>
            </div>
            <div
              style={{
                padding: "20px 50px",
                // backgroundColor: "pink",
                height: "calc(100vh - 160px)",
                overflow: "auto",
              }}
            >
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} chat={chat} />
                  ))
                : null}
            </div>

            <div className="msg-form">
              <Messages
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2> Select user to stasrt chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
