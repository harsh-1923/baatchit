import React from "react";
import "./Message.css";
import Moment from "react-moment";

const Message = ({ msg, chat }) => {
  // console.log(msg, "msg");
  // console.log(chat, "chat");
  const color = msg.from === chat.uid ? "#FF7597" : "#424242";
  const alignments = msg.from === chat.uid ? "flex-start" : "flex-end";
  const textColor = msg.from === chat.uid ? "black" : "white";
  // console.log(color);
  return (
    <div
      className="message-wrapper"
      style={{ justifyContent: alignments, marginBottom: "10px" }}
    >
      <div
        className="message"
        style={{ background: color, borderRadius: "10px" }}
      >
        {msg.media ? (
          <img
            className="img"
            src={msg.media}
            style={{
              width: "100px",
              height: "100px",
              // borderRadius: "5px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="text-message-wrapper">
            <div className="message-text" style={{ color: textColor }}>
              {msg.text}
            </div>
            <div className="message-time">
              <small>
              {/* {msg.createdAt.toDate().toDateString()} */}
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
