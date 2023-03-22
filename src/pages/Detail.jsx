import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { __getPosts, __deletePost, __fixPost } from '../redux/modules/postModule';
import Comment from '../components/Comment';

export default function Detail() {
  const navi = useNavigate();
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.posts.posts);
  const [edit, setEdit] = useState(false);
  const [findPost, setFindPost] = useState({});
  const [modifiedPost, setModifiedPost] = useState({
    title: "",
    content: ""
  })

  // console.log(modifiedPost);
  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setModifiedPost((old) => {
      return {...old, [name]: value};
    });
  }

  const postDeleteHandler = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(findPost.postId))
      navi("/")
    } else {
      return;
    }
  }

  const postFixHandler = () => {
    dispatch(__fixPost({
      postId: findPost.postId,
      title: modifiedPost.title,
      content: modifiedPost.content
    }))
    setEdit((pre) => !pre);
  }

  useEffect(()=>{
    // dispatch(__getPosts());
    setFindPost(post.find((item) => {
      return item?.postId === parseInt(params.id);
    }))
  },[JSON.stringify(post)]);

  return (
    <div>
      <HeaderNav />
      {!edit ? 
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
      :
        <Container>
          <div style={{marginTop: "3rem"}}>
            <input type="text" name='title' value={modifiedPost.title} onChange={changeInputHandler}/>
          </div>
          <div>
            <input type="textarea" name='content' value={modifiedPost.content} onChange={changeInputHandler}/>
          </div>
        </Container>
      }
      
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
          {!edit ? 
            <Button variant="secondary" onClick={()=>{setEdit((pre) => !pre);}}>
              수정
            </Button>
          :
            <Button variant="secondary" onClick={postFixHandler}>
              완료
            </Button>
          }
          <Button variant="danger" onClick={postDeleteHandler}>
            삭제
          </Button>
        </Btn>
      </Container>
      <hr />
      <Comment/>
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