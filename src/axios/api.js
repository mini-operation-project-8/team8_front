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

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers : {
        "Access-Control-Allow-Origin": "*",
    },
});

// console.log(api)

api.interceptors.request.use(
    function(config){
        console.log("인터셉터 요청 성공!");
        //get.cookie를 넣어주면 헤더에 넣어서 보내줌
        return config;
    },
    function(error){
        console.log("인터셉터 요청 오류!");
        return Promise.reject(error);
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