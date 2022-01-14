import React, {useState, useEffect} from "react";
import "./Profile.css";
import Camera from '../../components/svgs/Camera'
import Default from "../../Assets/basic.jpg";
import { storage, db, auth } from '../../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const Profile = ({ dark }) => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          console.log(url);
          setImg("");
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [img]);



  //color scheme set
  const backgroundColor = dark ? "#121212" : "#F2EEEE";
  const primary = dark ? "white" : "black";
  return user ? (
    <div
      className="profile-wrapper"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="avatar-wrapper">
        <img src={user.avatar || Default} alt="avatar" />
        <div className="overlay">
          <label htmlFor="photo">
            <Camera />
          </label>
          <input
            type="file"
            accept="image/"
            style={{ display: "none" }}
            id="photo"
            onChange={(e) => {
              setImg(e.target.files[0]);
              console.log(img);
            }}
          />
        </div>
      </div>
      <div className="user-detail-wrapper">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <small>Joined at: {user.createdAt.toDate().toDateString()}</small>
      </div>
    </div>
  ): <>error</>;
};

export default Profile;
