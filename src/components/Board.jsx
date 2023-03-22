import React, { useEffect, useState } from 'react'
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
    // console.log("posts", posts);

    const [page, setPage] = useState(3);
    const [limit, setLimit] = useState(10);
    const numPages = Math.ceil(posts.length/limit);
    const offset = (page - 1) * limit;
    // console.log(numPages);
    
    useEffect(()=>{
      dispatch(__getPosts(page));
    },[page]);

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
            {/* 서버 통신용 코드 */}
            {posts.map((item) =>
                <Rows style={{ marginBottom: "0.5rem" }} onClick={()=>{navi(`/chitchat/detail/${item.postId}`)}}>
                  <Col style={{ paddingLeft: "1.4rem", color: "#767676" }}>{item?.postId}</Col>
                  <Col>{item?.title}</Col>
                  <Col style={{ textAlign: "end", color: "#767676" }}>{item?.userId}</Col>
                </Rows>
            )}
            {/* .slice(offset, offset + limit) */}

            {/* 로컬 통신용 코드 */}
            {/* {posts.slice(0).reverse().map((item) =>
              <Rows style={{ marginBottom: "0.5rem" }} onClick={()=>{navi(`/chitchat/detail/${item.postId}`)}}>
                <Col style={{ paddingLeft: "1.4rem", color: "#767676" }}>{item?.postId}</Col>
                <Col>{item?.title}</Col>
                <Col style={{ textAlign: "end", color: "#767676"}}>{item?.userId}</Col>
              </Rows>
            )} */}
        </Container>
        <hr />
        <Container style={{ marginTop: "2rem" }}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}/>
            {/* <Pagination.Item>{1}</Pagination.Item> */}
            {Array(numPages)
              .fill()
              .map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : null}
                >
                  {i + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === numPages}/>
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