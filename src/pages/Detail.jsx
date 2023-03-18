import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'

import { __getPosts } from '../redux/modules/postModule';

export default function Detail() {
  const params = useParams();
  // const navi = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state)=>state.posts.posts);
  const [findPost, setFindPost] = useState({});

  useEffect(()=>{
    dispatch(__getPosts());
    setFindPost(post.find((item) => {
      return item?.id === parseInt(params.id);
    }))
  },[JSON.stringify(post)]);

  return (
    <div>
      <HeaderNav />
      <Container>
        <h1>{findPost?.id}</h1>
        <p>{findPost?.title}</p>
        <p>{findPost?.content}</p>
      </Container>
    </div>
  )
}