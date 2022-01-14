import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../components/LinkButton/LinkButton";
import { AuthContext } from "../../context/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const Login = ({ dark }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const t = auth.currentUser;
  // console.log(user)

  //set data - DATA COLLECTION
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  //destructure
  const { email, password, error, loading } = data;

  //handle change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    console.log(data);
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result); //we have now added user in authentication
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/chatpage");
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };

  //color scheme set
  const backgroundColor = dark ? "#121212" : "#F2EEEE";
  const primary = dark ? "white" : "black";
  return (
    <div className="login-wrapper" style={{ backgroundColor: backgroundColor }}>
      <h1 style={{ color: '#FF7597', fontSize: "40px" }}> Welcome back!! </h1>
      <form className="form">
        <input
          className="input-field"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <br />
        <br />
        <div className="btn">
          <button type="submit" className="btn" onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
