import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import HeaderNav from '../components/HeaderNav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { cookies } from "../shared/cookie";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { __sendPost } from '../redux/modules/postModule';


function Post() {
  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookies.get("token");
    if(!token) {
      alert("로그인 후에 작성 가능합니다!");
      navi("/")
    }
  }, []);

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  console.log(post)

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setPost((old) => {
      return {...old, [name]: value};
    });
  }

  const submitButtonHandler = (event) => {
    event.preventDefault();
    dispatch(__sendPost(post));
    alert("게시글 작성 완료!");
    navi("/");
  }

  return (
    <div>
      {/* 헤더 컴포넌트 */}
      <HeaderNav />
      {/* 게시글 작성 inpun */}
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><h2>제목</h2></Form.Label>
            <Form.Control value={post.title} name="title" type="text" onChange={changeInputHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><h2>내용</h2></Form.Label>
            <Form.Control value={post.content} name="content" as="textarea" rows={20} onChange={changeInputHandler} />
          </Form.Group>
        </Form>
        <div style={{alignItem:"end"}}>
          <Button variant="light" onClick={()=>{navi("/")}}>취소</Button>{' '}
          <Button type='submit' variant="dark" onClick={submitButtonHandler}>작성</Button>
        </div>
      </Container>
    </div>
  )
}

export default Post