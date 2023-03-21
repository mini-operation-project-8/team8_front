import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { __deletePost, __getPosts } from '../redux/modules/postModule';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.posts.posts);
  console.log(post)
  const [findPost, setFindPost] = useState({});

  const changeInputHandler = (event) => {
    // const { value, name } = event.target;
    // setPost((old) => {
    //   return {...old, [name]: value};
    // });
  }

  const postDeleteHandler = () => {
    dispatch(__deletePost(findPost.postId));
  }

  // 서버 통신용 코드
  useEffect(()=>{
    dispatch(__getPosts());
    setFindPost(post.find((item) => {
      return item?.postId === parseInt(params.id);
    }))
  },[JSON.stringify(post)]);

  // 로컬 통신용 코드
  console.log(findPost)
  // useEffect(()=>{
  //   dispatch(__getPosts());
  //   setFindPost(post.find((item) => {
  //     return item?.postId === parseInt(params.id);
  //   }))
  // },[JSON.stringify(post)]);

  return (
    <div>
      <HeaderNav />
      <Container>
        {/* 서버 통신용 코드 */}
        <div style={{marginTop: "3rem"}}>
          <p>{findPost?.postId}</p>
          <p>작성자 : {findPost?.userId}</p>
          <hr />
        </div>
        <p>{findPost?.title}</p>
        <hr />
        <P>{findPost?.content}</P>

        {/* 로컬 통신용 코드 */}
        {/* <div style={{marginTop: "3rem"}}>
          <h3>{findPost?.title}</h3>
        </div>
        <div style={{marginTop: "1rem"}}>
          <span style={{marginRight: "1rem"}}>글 번호 : {findPost?.postId}</span>
          <span>작성자 : {findPost?.userId}</span>
          <hr />
        </div>
        <P>{findPost?.content}</P> */}
      </Container>
      {/* {findPost.map((item)=> item.id === findPost.id)
      
      } */}
      <Container style={{alignItems: "end"}}>
        <Btn>
          <Button variant="outline-dark" onClick={()=>{navi("/")}}>이전</Button>{' '}
          <Button variant="secondary" onClick={changeInputHandler}>수정</Button>{' '}
          <Button variant="danger" onClick={postDeleteHandler}>삭제</Button>
        </Btn>
      </Container>
      <hr />
      <Container>
        <p>테스트라인</p>
      </Container>
    </div>
  )
}

const P = styled.p`
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  height: 30vh;
`

const Btn = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
`