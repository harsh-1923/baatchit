import React from "react";
import "./Messages.css";
import Attachment from "../svgs/Attachment";

const Messages = ({ handleSubmit, text, setText, setImg }) => {
  // console.log("we are here");
  const dis = text === "" ? true : false;
  return (
    <div className="messages-form-wrapper">
      <form className="message-form" onSubmit={handleSubmit}>
        <label htmlFor="img" className="attachment">
          <Attachment/>
        </label>
        <input
          type="file"
          id="img"
          accept="iimage/png,image/jpeg"
          onChange={(e) => {
            // console.log("clicked");
            setImg(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
        <div>
          <input
            className="msg-input-box"
            type="text"
            placeholder="Enter message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button disabled={dis} className="btn">
            <h4>Send</h4>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages;
