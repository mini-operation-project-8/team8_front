import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";
import Comment from "./components/Comment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chitchat/signup" element={<SignUp />}/>
        <Route path="/chitchat/login" element={<Login />}/>
        <Route path="/chitchat/post" element={<Post />}/>
        <Route path="/chitchat/detail/:id" element={<Detail />}/>
        <Route path="/chitchat/:id/comments/:commentId" element={<Comment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;