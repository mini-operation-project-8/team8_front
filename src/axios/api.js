// import axios from "axios";
// import { getCookie } from "./cookies";

// const token = getCookie("token");

// export const api = axios.create({
// baseURL: `${process.env.REACT_APP_SERVER_URL}`,
//     headers: {
//     "Access-Control-Allow-Origin": "*",
//     },
// });

// export const api_token = axios.create({
// baseURL: `${process.env.REACT_APP_SERVER_URL}`,
//     headers: {
//     "Access-Control-Allow-Origin": "*",
//     Authorization: token,
//     },
// });

import axios from 'axios';
import { cookies } from '../shared/cookie';

const token = cookies.get("token")

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers : {
        "Access-Control-Allow-Origin": "*",
    },
});

// console.log(api)

api.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = `${token}`;
        // config.headers["authorization"] = `Berer ${token}`;
        console.log('인터셉터 요청 성공!')
        // alert(config.headers.authorization)
        return config
      },
    
      // 오류 요청을 보내기 전 수행되는 함수
      function (error) {
        console.log('인터셉터 요청 오류')
        return Promise.reject(error)
      },
)

api.interceptors.request.use(
    function (config) {
        const token = cookies.get("token") ? cookies.get("token") : cookies.get("token")
        config.headers["authorization"] = `${token}`;
        // config.headers["authorization"] = `Berer ${token}`;
        console.log('인터셉터 요청 성공!')
        // alert(config.headers.authorization)
        return config
      },
    
      // 오류 요청을 보내기 전 수행되는 함수
      function (error) {
        console.log('인터셉터 요청 오류')
        return Promise.reject(error)
      },
)

api.interceptors.response.use(
    function(response){
        console.log("리스폰스 요청 성공!");
        return response;
    },

    function(error){
        console.log("리스폰스 요청 오류!");
        return Promise.reject(error);
    },
)

export default api;