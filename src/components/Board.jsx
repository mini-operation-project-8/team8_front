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
import { __getPostCount } from '../redux/modules/countModule';
import { useNavigate } from 'react-router-dom';

function Board() {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    const count = useSelector((state) => state.count.count);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const numPages = Math.ceil((count.totalPosts || 0)/limit);
    const offset = (page - 1) * limit;
    
    useEffect(()=>{
      dispatch(__getPosts(page));
    },[JSON.stringify(posts), page]);

    useEffect(()=>{
      dispatch(__getPostCount());
    },[JSON.stringify(count)]);

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
      <Container style={{marginTop: "1rem"}}>
          {Array.isArray(posts) && posts?.map((item) =>
            <Rows style={{ marginBottom: "0.5rem" }} key={item.postId} onClick={()=>{navi(`/chitchat/detail/${item?.postId}`)}}>
              <Col style={{color: "#767676"}}>{item?.postId}</Col>
              <Col xs={9}>{item?.title}</Col>
              <Col style={{color: "#767676", textAlign: "end"}}>{item?.userId}</Col>
            </Rows>
          )}
          {/* .slice(offset, offset + limit) */}
      </Container>
      <hr />
        <Container style={{ marginTop: "2rem" }}>
          <PnBtn>
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
          </PnBtn>
        </Container>
      </Container>
    
  )
}

const Rows = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  padding: 1rem 0rem 1rem 0rem;
  &:hover {
    border-radius: 5px;
    background: #efefef;
    transition: 0.1s;
    opacity: 90%;
  }
`

const PnBtn = styled.div`
  display: flex;
  justify-content: center;
`

export default Board