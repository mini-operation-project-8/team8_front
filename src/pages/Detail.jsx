import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import { __deletePost, __getPosts } from '../redux/modules/postModule';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.posts.posts);
  const [findPost, setFindPost] = useState({});
  const [comment, setComment] =useState({
    contents: ""
  });

  const changeInputHandler = (event) => {
    // const { value, name } = event.target;
    // setPost((old) => {
    //   return {...old, [name]: value};
    // });
  }

  // const postDeleteHandler = () => {
  //   if(window.confirm("정말 삭제하시겠습니까?")) {
  //     dispatch(__deletePost(findPost.postId))
  //     navi("/")
  //   } else {
  //     return;
  //   }
  // }

  const postDeleteHandler = () => {
    dispatch(__deletePost(findPost.postId));
  }

  //댓글........
  const clickAddComment = (e) => {
    setComment(e.target.value);
  }

  // 서버 통신용 코드
  useEffect(()=>{
    dispatch(__getPosts());
    setFindPost(post.find((item) => {
      return item?.postId === parseInt(params.id);
    }))
  },[JSON.stringify(post)]);

  // 로컬 통신용 코드
  // console.log(findPost)
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
        <div style={{marginTop: "3rem"}}>
          <h3>{findPost?.title}</h3>
        </div>
        <hr />
        <div style={{marginTop: "1rem"}}>
          <span style={{marginRight: "1rem"}}>글 번호 : {findPost?.postId}</span>
          <span>작성자 : {findPost?.userId}</span>
        </div>
        <P>{findPost?.content}</P>
      </Container>
      {/* {findPost.map((item)=> item.id === findPost.id)
      
      } */}
      <Container style={{ alignItems: "end" }}>
        <Btn>
          <Button
            variant="outline-dark"
            onClick={() => {
              navi("/");
            }}
          >
            이전
          </Button>{" "}
          <Button variant="secondary" onClick={changeInputHandler}>
            수정
          </Button>{" "}
          <Button variant="danger" onClick={postDeleteHandler}>
            삭제
          </Button>
        </Btn>
      </Container>
      <hr />
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StComment value={comment} onChange={clickAddComment}
        type="text" placeholder="댓글을 달아주세요" />
        &nbsp;<Button variant="secondary" >수정</Button>
      </Container>
      <p/>
      <Container>
        <Card>
          <Card.Body>댓글카드</Card.Body>
        </Card>
      </Container>
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

const StComment = styled.input`
 width : 90%;
`