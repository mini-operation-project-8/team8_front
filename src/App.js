import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chitchat/signup" element={<SignUp />}/>
        <Route path="/chitchat/login" element={<Login />}/>
        <Route path="/chitchat/post" element={<Post />}/>
        <Route path="/chitchat/post/:id" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;