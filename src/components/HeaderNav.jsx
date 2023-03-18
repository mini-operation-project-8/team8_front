import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { cookies } from "../shared/cookie";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function HeaderNav() {
  const navi = useNavigate();

  useEffect(() => {
    const token = cookies.get("token");
    if(token) {
      navi("/")
    }
  }, []);

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height:"10vh"}}>
            <Container>
            <Navbar.Brand href="/"><h1>ChitChat</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    {/* {token == null ? 
                        <Nav.Link href="/chitchat/login" onClick={()=>{navi("/chitchat/login")}}>로그인</Nav.Link>
                    :
                        <Nav.Link onClick={() => {
                            cookies.remove("token");
                            navi("/chitchat/login")
                        }}>로그아웃</Nav.Link>
                    } */}
                <Nav.Link eventKey={2} href="/chitchat/signup" onClick={()=>{navi("/chitchat/signup")}}>
                    회원가입
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default HeaderNav