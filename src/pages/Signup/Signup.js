import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = ({ dark }) => {
  const navigate = useNavigate();
  console.log(dark);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { name, email, password, error, laoding } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    // console.log(data)
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(result); //we have now added user in authentication
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/login");
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };
  //color scheme set
  const backgroundColor = dark ? "#121212" : "#F2EEEE";
  const primary = dark ? "white" : "black";
  return (
    <div className="signup-wrapper" style={{ backgroundColor: backgroundColor }}>
      <h2 style={{ color: primary,  }}>
        {" "}
        We are glad you are joining us!!
      </h2>
      <h1 style={{ color: '#FF7597', marginTop: '3vh'}}>Get Started!!</h1>
      <form className="form">
        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />
        <br />
        <br />

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
          <button type="submit" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
