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
    // id : "",
    // password : "",
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
    dispatch(__signupUser(user));
    // api.post("/register", user);
    // api.post("/chitchat/signup", user);
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
    style={{ display: "flex",flexDirection: "row",
      justifyContent: "center",alignItems: "center",
      marginTop: "350px"}}
    >
    <Form style={{ width: "300px" }}>
      <Form.Label
        style={{fontSize: "30px",fontWeight: "bold",
          display: "flex",justifyContent: "center",
          marginBottom: "30px"}}
      >Sign</Form.Label>
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
        <Form.Control type="password" name="password"
        maxLength={15} placeholder="Password" 
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
              navigate('/chitchat/login');
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