import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { __getPosts } from '../redux/modules/postModule';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(()=>{
    dispatch(__getPosts());
  },[]);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ChitChat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/chitchat/login" onClick={()=>{navi("/chitchat/login")}}>로그인</Nav.Link>
              <Nav.Link eventKey={2} href="/chitchat/signup" onClick={()=>{navi("/chitchat/signup")}}>
                회원가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{
        marginTop: "3rem"}}>
          <Stack direction="horizontal" gap={2}>
            <h1>ChitChat 게시판</h1>
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
            <Row style={{
              marginBottom: "0.5rem"}} onClick={()=>{navi(`/chitchat/Detail/${item.id}`)}}>
              <Col style={{ paddingLeft: "1.4rem" }}>{item?.id}</Col>
              <Col>글 제목</Col>
              <Col style={{ textAlign: "end" }}>아이디</Col>
            </Row>
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
    </div>
  )
}

// const Rows = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 8fr 2fr;
//   padding: 1rem 0rem 1rem 0rem;
//   &:hover {
//     background: #efefef;
//     transition: 0.1s;
//     opacity: 90%;
//   }
// `

export default Home