import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Home() {

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
              <Nav.Link href="/chitchat/login">로그인</Nav.Link>
              <Nav.Link eventKey={2} href="/chitchat/signup">
                회원가입
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "5rem"}}>
        <h1>게시판</h1>
        <Button variant="dark">글쓰기</Button>
      </Container>
      <hr />
      <Container style={{marginTop: "5rem"}}>

      </Container>
    </div>
  )
}

export default Home