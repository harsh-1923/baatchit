import AuthProvider from "./context/auth";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ChatPage from "./pages/ChatPage/ChatPage";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  const dark = true;
  return (
    <AuthProvider>
      <div className="App">
        <Navbar dark={ dark }/>
        <Routes>
          <Route path="/" element={<LandingPage dark={dark}/>} />
          <Route path="/signup" element={<Signup dark={true}/>} />
          <Route path="/login" element={<Login dark={dark} />} />
          <Route path="/chatpage" element={<ChatPage dark={dark} />} />
          <Route path="/profile" element={<Profile dark={true}/>} />
        </Routes>
        
      </div>
    </AuthProvider>
  );
} 

export default App;
