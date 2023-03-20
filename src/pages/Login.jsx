import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/api";
import { cookies } from "../shared/cookie";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] =useState({
    userId : "",
    password : "",
  });

  const changeInputHandler = (e)=> {
    const {value, name} = e.target;
    setUser((old)=> {
      return {...old, [name] : value}
    });
  };

  const submitLoginBtnHadler = async(e) => {
    e.preventDefault();
    
    api.post("/chitchat/login", user).then((result) => {
    });
    try { 
      const result = await api.post("/chitchat/login", user)
      console.log(result.headers.authorization);
      // document.cookie = "token=" + result.headers.authorization + "; path=/";
      cookies.set("token", result.headers.authorization, {path : "/"});
      navigate ("/")
      alert("Welcome to Chit Chat")
    } catch (e) {
      alert("아이디와 비밀번호를 확인하세요")
    }
  };

  // 로그인하고 나서는 login page 못 가게 설정
  useEffect(() => {
    const token = cookies.get("token");
    if(token) {
      navigate ("/")
    }
  }, []);
  
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <img src="/chitchatlogo.png"/>
      <Form style={{ width: "300px" }}>
        <Form.Label
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          Login
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Id</Form.Label>
            <Form.Control 
            type="text" name="userId"
            placeholder="4자~10자 이하 소문자, 숫자" 
            maxLength={10}
            value={user.userId} onChange={changeInputHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" name="password"
          placeholder="8자~15자 이하 대소문자, 숫자, 특수문자"
          maxLength={15}
          value={user.password} onChange={changeInputHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button
          variant="dark"
          type="submit"
          style={{ width: "300px", marginTop: "30px"}}
          onClick={submitLoginBtnHadler}
        >
          Login
        </Button>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center", 
          marginTop :"15px"
          }}>
          <Button
            variant="outline-dark"
            type="button"
            style={{ width: "140px", marginRight : "15px"}}
            onClick={()=> {
              navigate('/');
            }}
          >
            Cancle
          </Button>
          <Button
          variant="outline-dark"
          type="button"
          style={{ width: "140px"}}
          onClick={()=> {
            navigate('/chitchat/signup');
          }}
        >
          Sign
        </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;