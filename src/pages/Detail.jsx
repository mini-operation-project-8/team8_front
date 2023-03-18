import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'

export default function Detail() {
  const params = useParams();
  const navi = useNavigate();
  const dispatch = useDispatch();
  // const post = useSelector((state)=>{state.comments});

  // useEffect(()=>{
  //   dispatch(__getPosts());
  //   dispatch(__getComment());
  // },[]);

  return (
    <div>
      <HeaderNav />
      <Container>
        <h1>하이</h1>
      </Container>
    </div>
  )
}