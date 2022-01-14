import React, { useContext } from "react";
import "./navbar.css";
import LinkButton from "../LinkButton/LinkButton";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Navbar = ({ dark }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  const navbarColor = dark ? "#424242" : "#F2EEEE";
  return (
    <div
      className="navbar-wrapper"
      style={{
        backgroundColor: navbarColor,
      }}
    >
      <div className="logo-wrapper">
        <Link style={{ textDecoration: "none" }} to="/">
          <h1 className="logo-text">BaatChit</h1>
        </Link>{" "}
      </div>
      <div className="navlink-wrapper">
        {user ? (
          <>
            <LinkButton
              path={"/profile"}
              content={"Profile"}
              primary={false}
              small={false}
            />
            <button className="btn-logout" onClick={handleSignOut}>
              <h4 style={{ fontWeight: 500}}>Logout</h4>
            </button>
          </>
        ) : (
          <>
            <LinkButton
              path={"/signup"}
              content={"Get started"}
              primary={false}
              small={false}
            />
            <LinkButton
              path={"/login"}
              content={"Login"}
              primary={true}
              small={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
