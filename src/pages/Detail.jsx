import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

import { __getPosts, __getPost, __deletePost, __fixPost } from '../redux/modules/postModule';
import Comment from '../components/Comment';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts.posts);
  const [edit, setEdit] = useState(false);
  const [postData, setPostData] = useState({
    postId: 0,
    userId: "",
    title: "",
    content: "",
    comment: ""
  })
  
  // console.log("posts", posts)
  // console.log("postData", postData);

  const [modifiedPost, setModifiedPost] = useState({
    title: postData.title,
    content: postData.content
  })
  
  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setModifiedPost((old) => {
      return {...old, [name]: value};
    });
  }

  const postDeleteHandler = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(postData.postId))
      navi("/")
    } else {
      return;
    }
  }

  const fixPostHandler = () => {
    dispatch(__fixPost({
      postId: postData.postId,
      modifiedPost
    }))
    dispatch(__getPost(postData.postId))
    setEdit((pre) => !pre);
  }

  useEffect(()=>{
    const find = posts?.find((item) => {
      return item?.postId === parseInt(params.id);
    })
    setPostData(find);
  },[posts]);

  return (
    <div>
      <HeaderNav />
      {!edit ? 
        <Container>
          <div style={{marginTop: "3rem"}}>
            <h3>{postData?.title}</h3>
          </div>
          <hr />
          <div style={{marginTop: "1rem"}}>
            <span style={{marginRight: "1rem"}}>글 번호 : {postData?.postId}</span>
            <span>작성자 : {postData?.userId}</span>
          </div>
          <P>{postData?.content}</P>
        </Container>
      :
        <Container>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{marginTop:"3rem"}}><h3>제목</h3></Form.Label>
            <Form.Control value={modifiedPost.title} name="title" type="text" placeholder={postData.title} onChange={changeInputHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{marginTop:"1rem"}}><h3>내용</h3></Form.Label>
            <Form.Control value={modifiedPost.content} name="content" as="textarea" rows={20} placeholder={postData.content} onChange={changeInputHandler} />
          </Form.Group>
        </Form>
      </Container>
      }
      
      {/* {findPost.map((item)=> item.id === findPost.id)
      
      } */}
      <Container style={{ alignItems: "end" }}>
        <div>
          {!edit ? 
            <Btn>
              <Button
                variant="outline-dark"
                onClick={() => {
                  navi("/");
                }}
              >
                이전
              </Button>
              <Button variant="secondary" onClick={()=>{setEdit((pre) => !pre);}}>
                수정
              </Button>
              <Button variant="danger" onClick={postDeleteHandler}>
                삭제
              </Button>
            </Btn>
          :
            <Btn>
              <Button
                variant="outline-dark"
                onClick={() => {
                  navi("/");
                }}
              >
                이전
              </Button>
              <Button variant="dark" onClick={fixPostHandler}>
                완료
              </Button>
            </Btn>
          }
        </div>
      </Container>
      <hr />
      <Comment />
    </div>
  );
}

const P = styled.p`
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  height: 30vh;
  margin-top: 1rem;
`

const Btn = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
`