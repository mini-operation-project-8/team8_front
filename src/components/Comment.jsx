import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __sendComment } from "../redux/modules/commentModule";
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap'

function Comment() {
  const post = useSelector((state)=>state.posts.posts);
  const contents = useSelector((state)=>state.posts.contents);
  const [findPost, setFindPost] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (post.length > 0) {
      setFindPost(
        post.find((item) => {
          return item?.postId === parseInt(params.id);
        })
      );
    }
  }, [JSON.stringify(post), params.id]);

  const addCommentHandler = () => {
    dispatch(
      __sendComment({
        postId: findPost.postId,
        contents : comment,
      })
    );
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StComment
        type="text"
        maxLength={30}
        value={contents}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 달아주세요😀"
      />
      <Button variant="secondary" onClick={addCommentHandler}>
          작성
      </Button>
      </Container>
      <Container style ={{marginTop:"15px"}}>
          {
            contents?.map((el) => {
              return (
              <Card key={el.commentId} style ={{marginTop:"15px"}}>
                <Card.Body>{el.contents}</Card.Body>
              </Card>
              )
            })
          }
          
      </Container>
    </>
  );
}

export default Comment;

const StComment = styled.input`
  width: 90%;
`;

