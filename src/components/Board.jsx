import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { __getPosts } from '../redux/modules/postModule';
import { useNavigate } from 'react-router-dom';

function Board() {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
  
    useEffect(()=>{
      dispatch(__getPosts());
    },[]);

  return (
    <Container>
        <Container style={{
            marginTop: "3rem"}}>
            <Stack direction="horizontal" gap={2}>
                <h2>게시판</h2>
                <Button variant="dark" className='ms-auto' onClick={()=>{navi("/chitchat/post")}}>글쓰기</Button>
            </Stack>
        </Container>
        <Container style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            border: "1px solid black",
            borderRadius: "10px"
        }}>
            <Row>
            <Col>글 번호</Col>
            <Col xs={8} style={{ textAlign: "center" }}>글 제목</Col>
            <Col style={{ textAlign: "end" }}>아이디</Col>
            </Row>
        </Container>
        <Container style={{
            marginTop: "1rem"}}>
            {posts.slice(0).reverse().map((item) =>
                <Rows style={{ marginBottom: "0.5rem" }} onClick={()=>{navi(`/chitchat/post/${item.post_Id}`)}}>
                  <Col style={{ paddingLeft: "1.4rem" }}>{item?.post_Id}</Col>
                  <Col>{item?.title}</Col>
                  <Col style={{ textAlign: "end" }}>{item?.userId}</Col>
                </Rows>
            )}
        </Container>
        <hr />
        <Container style={{
            marginTop: "2rem",
        }}>
            <Pagination style={{
            alignItems: "center"
            }}>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
            </Pagination>
        </Container>
    </Container>
  )
}


const Rows = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  padding: 1rem 0rem 1rem 0rem;
  &:hover {
    background: #efefef;
    transition: 0.1s;
    opacity: 90%;
  }
`

export default Board