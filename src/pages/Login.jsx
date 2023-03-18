import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/api";
import { cookies } from "../shared/cookie";

function Login() {
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

  const submitLoginBtnHadler = async(e) => {
    e.preventDefault();
    api.post("/chitchat/login", user).then((result) => {
    });
    //test
    // try { 
    //   const result = await api.post("/login", user)
    //   // console.log(result.data.token);
    //   cookies.set("token", result.data.token, {path : "/"});
    //   navigate ("/")
    // } catch (e) {
    //   alert("아이디와 비밀번호를 확인하세요")
    // }
    //협업
    try { 
      const result = await api.post("/chitchat/login", user)
      // console.log(result.data.token);
      cookies.set("token", result.data.token, {path : "/"});
      navigate ("/")
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "350px",
      }}
    >
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
            {/* Test */}
            {/* <Form.Control 
            type="text" name="userId"
            placeholder="Enter ID" 
            maxLength={10}
            value={user.id} onChange={changeInputHandler}/> */}
            {/* 협업 */}
            <Form.Control 
            type="text" name="userId"
            placeholder="Enter ID" 
            maxLength={10}
            value={user.userId} onChange={changeInputHandler}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" name="password"
          placeholder="Password"
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