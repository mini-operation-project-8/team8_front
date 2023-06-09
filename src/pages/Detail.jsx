import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

import { __getPost, __deletePost, __fixPost } from '../redux/modules/postModule';
import Comment from '../components/Comment';
import { cookies } from '../shared/cookie';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts.posts);
  const [edit, setEdit] = useState(false);
  const token = cookies.get("token")
  const [modifiedPost, setModifiedPost] = useState({
    title: posts.title,
    content: posts.content
  })
  console.log(modifiedPost);

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setModifiedPost((old) => {
      return {...old, [name]: value};
    });
  }

  const postDeleteHandler = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(posts.postId))
      navi("/")
    } else {
      return;
    }
  }

  const fixPostHandler = () => {
    dispatch(__fixPost({
      postId: posts.postId,
      modifiedPost
    }))
    setEdit((pre) => !pre);
  }

  useEffect(()=>{
    dispatch(__getPost(parseInt(params.id)));
  },[JSON.stringify(posts)]);

  return (
    <div>
      <HeaderNav />
      {!edit ? 
        <Container>
          <div style={{marginTop: "3rem"}}>
            <h3>{posts?.title}</h3>
          </div>
          <hr />
          <div style={{marginTop: "1rem"}}>
            <span style={{marginRight: "1rem"}}>글 번호 : {posts?.postId}</span>
            <span>작성자 : {posts?.userId}</span>
          </div>
          <P>{posts?.content}</P>
        </Container>
      :
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{marginTop:"3rem"}}><h3>제목</h3></Form.Label>
              <Form.Control value={modifiedPost.title} name="title" type="text" placeholder={posts.title} onChange={changeInputHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{marginTop:"1rem"}}><h3>내용</h3></Form.Label>
              <Form.Control value={modifiedPost.content} name="content" as="textarea" rows={20} placeholder={posts.content} onChange={changeInputHandler} />
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
              {token ?
              <>
                <Button variant="secondary" onClick={()=>{setEdit((pre) => !pre);}}>
                  수정
                </Button>
                <Button variant="danger" onClick={postDeleteHandler}>
                  삭제
                </Button>
              </>
              : null}
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