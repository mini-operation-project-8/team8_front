import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __signupUser } from "../redux/modules/userModule";
import { cookies } from "../shared/cookie";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const submitBtnHadler =(e) => {
    e.preventDefault();
    const { userId, password } = user;
    const userIdRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,10}$/;
    const passwordRegex = /^(?=.*[a=zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,15}$/;
    if (!userIdRegex.test(userId)) {
      alert('영문 소문자, 숫자 조합으로 4-10이하로 입력해주세요');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('영문 대소문자, 숫자, 특수문자 조합으로 8-15자 이하로 입력해주세요');
      return;
    }
    dispatch(__signupUser(user));
    navigate ("/chitchat/login")
  };

  // 로그인하고 나서는 signup page 못 가게 설정
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
        style={{fontSize: "30px",fontWeight: "bold",
          display: "flex",justifyContent: "center",
          marginBottom: "30px"}}
      >Sign</Form.Label>
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
        <Form.Control type="password" name="password"
        maxLength={15} placeholder="8자~15자 이하 대소문자, 숫자, 특수문자" 
        value={user.password} onChange={changeInputHandler}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password Check</Form.Label>
        <Form.Control 
        type="password" placeholder="Password Check"
        maxLength={15}
        value={user.passwordCheck} onChange={changeInputHandler}/>
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      <div style={{ display: "flex", flexDirection: "row",
          justifyContent: "center", alignItems: "center", 
          marginTop :"15px"
      }}>
          <Button variant="outline-dark" type="submit"
            style={{ width: "140px", marginRight : "15px"}}
            onClick={()=> {
              navigate('/');
            }}
          >Cancle</Button>
          <Button variant="outline-dark" type="button"
          style={{ width: "140px"}} onClick={submitBtnHadler}
          >Sign</Button>
        </div>
    </Form>
  </Container>
  )
}

export default SignUp