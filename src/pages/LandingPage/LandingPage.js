import React, { useContext } from "react";
import "./LandingPage.css";
import LinkButton from "../../components/LinkButton/LinkButton";

import { AuthContext } from "../../context/auth";

const LandingPage = ({ dark }) => {
  const { user } = useContext(AuthContext);

  const backgroundColor = dark ? "#121212" : "#FFFFFF";
  const primary = dark ? "#FFFFFF" : "#121212";
  return (
    <div
      className="landing-page-wrapper"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        style={{ color: primary, fontSize: "20px" }}
        className="welcome-text"
      >
        Hello, welcome to{" "}
      </div>

      <div
        style={{ color: "#FF7597", fontSize: "70px" }}
        className="welcome-text"
      >
        <h1>BaatChit!</h1>
      </div>

      <div
        style={{ color: primary, fontSize: "24px" }}
        className="welcome-text"
      >
        Have a secure, real-time chat with the people you love to spend time
        with.
      </div>

      <div className="links">
        {user ? (
          <LinkButton path={"/chatpage"} content={"See chats"} primary={true} />
        ) : (
          <>
            <LinkButton
              path={"/signup"}
              content={"Get Started"}
              primary={true}
            />
            <div style={{ color: "white", padding: "0px 20px" }}>Or</div>
            <LinkButton path={"/login"} content={"Log in"} primary={true} />
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
