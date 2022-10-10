import axios from "axios";
import { localServ } from "./localServices";
// tạo biến chứa URL của api
export const BASE_URL = "https://movienew.cybersoft.edu.vn";
// tạo biến chứa token mở api
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNCIsIkhldEhhblN0cmluZyI6IjIwLzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3Njg1MTIwMDAwMCIsIm5iZiI6MTY1NDEwMjgwMCwiZXhwIjoxNjc2OTk4ODAwfQ.QYLXMgjth5hQh9opZbNS7JEDPZGWA3o_95kR_VyLix8";
// gọi api qua axios bằng cú pháp axios.create
// tạo biến https chứa thông tin api
export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    // kiểm tra accessToken
    // Authorization: "bearer " + localServ.user.get()?.accessToken,
    Authorization: "Bearer " + localServ.user.get()?.accessToken,
  },
});
