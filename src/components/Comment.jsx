import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComments, __sendComment } from "../redux/modules/commentModule";
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap'

function Comment() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const {comments} = useSelector((state) => state.comments);
  // console.log(comments)

  const addCommentHandler = async () => {
    await dispatch(__sendComment({
        postId: id,
        contents: comment,
      })
    );
    setComment("");
    dispatch(__getComments({ postId: id }));
  };
  
  useEffect(() =>{
    dispatch(__getComments({ postId: id }))
  }, [])

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
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
      <Container style ={{marginTop:"15px", display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"}}>
        {
          comments?.map((el) => {
            return (
              <Card key={el.id} style={{ marginTop: "15px" }}>
                <Card.Body>{el.userId}&nbsp;&nbsp;&nbsp;{el.contents}</Card.Body>
                <Button variant="danger">
                삭제
              </Button>
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