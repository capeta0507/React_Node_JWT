# Node.js JWT 認證機制 API

### 參考文件
> [Node 實作 jwt 驗證 API](https://andyyou.github.io/2016/06/09/implement-jwt-with-understanding/)

>[SON Web Token Authentication in React and react-router](https://hptechblogs.com/using-json-web-token-react/)

> [Node.js API Authentication With JWT](https://www.youtube.com/watch?v=7nafaH9SddU)

> [Node.JS REST API Auth using JWTs - Tutorial](https://www.youtube.com/watch?v=0g0Of8jlhN8)

> [Build A Node.js API Authentication With JWT Tutorial](https://www.youtube.com/watch?v=2jqok-WgelI)

> [Authentication For Your React and Express Application w/ JSON Web Tokens](https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0)

> [A guide for adding JWT token-based authentication to your single page Node.js applications](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)

> [Handling Authentication and Authorization with Node](https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8)

> [A Practical Guide for JWT Authentication using Nodejs and Express](https://medium.com/swlh/a-practical-guide-for-jwt-authentication-using-nodejs-and-express-d48369e7e6d4)

> [Securing your Node js api with JSON Web Token](https://dev.to/medaymentn/securing-your-node-js-api-with-json-web-token-5o5)

### 設計說明
系統主要是要表現以下功能：
1. 客戶註冊
2. 登入，JWT授權
3. JWT安全認證，可以查看敏感資料
4. 忘記密碼處理流程
5. 客戶資料維護

### 系統架構
1. 前端：React.js
2. 後端：Node.js + Express
3. 資料庫：MongoDB
4. 安全認證：jsonwebtoken(JWT)

使用者 名單
```json=
"_id": "5d8f8728039f33014029d984"
"name": "詹森安"
"email": "davidtpe@seed.net.tw"
"login": "davidtpe"
"password": "8xK9Yr4Wh"
```
```json=
"_id": "5d8f875b3a4040098cdfa65c"
"name": "詹政勳"
"email": "nintendof1@gmail.com"
"login": "nintendof1"
"password": "1xK3Yr2Wh"
```

