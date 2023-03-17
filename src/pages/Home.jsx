import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { __getPosts } from '../redux/modules/postModule';

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  console.log("여기에 들어와야 되는데?", posts);

  useEffect(()=>{
    dispatch(__getPosts());
  },[]);

  return (
    <div>
      {posts.title}
      {posts.content}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ChitChat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/chitchat/login">로그인</Nav.Link>
              <Nav.Link eventKey={2} href="/chitchat/signup">
                회원가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{
        marginTop: "5rem"}}>
          <Stack direction="horizontal" gap={2}>
            <h1>게시판</h1>
            <Button variant="dark" className='ms-auto'>글쓰기</Button>
          </Stack>
      </Container>
      <Container style={{marginTop: "1rem"}}>
        <Card style={{ width: '100%' }}>
          <Card.Header>Featured</Card.Header>
          <ListGroup variant="flush">
            <p>{posts.id}</p>
            <ListGroup.Item>{posts?.id}</ListGroup.Item>
            <ListGroup.Item>{posts?.title}</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  )
}

export default Home