import React, { useState, useEffect } from "react";
import "./UserBadge.css";
import Default from "../../Assets/basic.jpg";

const UserBadge = ({ user, selectUser }) => {
  const status = user.isOnline ? "green" : "red";
  // console.log(user)
  return (
    <div className="user-wrappert" onClick={() => selectUser(user)}>
      <img src={user.avatar || Default} alt="avatar" className="img" />
      <div className="user-detail">
        <div className="user-title" >
          <h3 className="user-name">{user.name}</h3>
          <div
            style={{ height: "10px", width: "10px", backgroundColor: status, borderRadius: '50%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBadge;
