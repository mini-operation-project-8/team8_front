import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';

import { __deletePost, __getPosts } from '../redux/modules/postModule';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.posts.posts);
  const [findPost, setFindPost] = useState({});

  const changeInputHandler = (event) => {
    // const { value, name } = event.target;
    // setPost((old) => {
    //   return {...old, [name]: value};
    // });
  }

  const postDeleteHandler = () => {
    dispatch(__deletePost(post.post_id));
  }

  useEffect(()=>{
    dispatch(__getPosts());
    setFindPost(post.find((item) => {
      return item?.post_Id === parseInt(params.id);
    }))
  },[JSON.stringify(post)]);

  return (
    <div>
      <HeaderNav />
      <Container>
        <div style={{marginTop: "3rem"}}>
          <p>{findPost?.post_Id}</p>
          <p>작성자 : {findPost?.userId}</p>
          <hr />
        </div>
        <p>{findPost?.title}</p>
        <hr />
        <p>{findPost?.content}</p>
      </Container>
      <Container style={{alignItems: "end"}}>
        <Button variant="outline-dark" onClick={()=>{navi("/")}}>이전</Button>{' '}
        <Button variant="secondary" onClick={changeInputHandler}>수정</Button>{' '}
        <Button variant="danger" onClick={postDeleteHandler}>삭제</Button>
      </Container>
      <hr />
      <Container>
        <p>테스트라인</p>
      </Container>
    </div>
  )
}