import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComments, __sendComment } from "../redux/modules/commentModule";
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap'

function Comment({posts}) {
  const { id, commentId } = useParams();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.posts.commentList);
  console.log(comments)

  const addCommentHandler = () => {
    dispatch(
      __sendComment({
        postId: id,
        contents : comment,
      })
    );
    setComment("");
  };

  useEffect(() =>{
    dispatch(__getComments({
      postId : id,
      commentId : comments.commentId,
    }))
  }, [dispatch, id, comments.commentId])

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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 달아주세요😀"
      />
      <Button variant="secondary" onClick={addCommentHandler}>
          작성
      </Button>
      </Container>
      <Container style ={{marginTop:"15px"}}>
        {comments
          .filter((el) => el && el.postId === id)
          .map((el) => {
            return (
              <Card style={{ marginTop: "15px" }}>
                <Card.Body>{el.contents}</Card.Body>
              </Card>
            );
          })}
      </Container>
    </>
  );
}

export default Comment;

const StComment = styled.input`
  width: 90%;
`;

