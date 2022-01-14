import React from "react";
import "./Chat.css";
import Messages from '../Messages/Messages'
import Message from "../Message/Message";

const Chat = ({ chat, dark, msgs }) => {
  console.log(msgs);

  //color scheme set
  const backgroundColor = dark ? "#121212" : "#F2EEEE";
  const primary = dark ? "white" : "black";
  const statusColor = chat.isOnline ? "green" : "red";
  return (
    <div className="chat-wrapper">
      <div className="chat-title">
        <h2>{chat.name}</h2>

        <div
          className="status-indicator"
          style={{ backgroundColor: statusColor }}
        ></div>
      </div>

      <div className="msgs-wrapper">
        {/* {msgs.length
          ? msgs.map((msg, i) => <Message key={i} msg={msg} />)
          : null} */}
          <Message msg={'hey'}/>
      </div>
    </div>
  );
};

export default Chat;
