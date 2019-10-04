// 載入 server 程式需要的相關套件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 載入 jwt 函式庫協助處理建立/驗證 token
var jwt = require('jsonwebtoken');
// 載入設定
var config = require('./config');
// 載入資料模型
var User = require('./app/models/user');
console.log(User);

var PORT = process.env.PORT || 5000
mongoose.connect(config.database , { useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if (err) {
    console.log("mongoose connect error ...")
  }else {
    console.log("mongoose 連線成功 ...")
  }
});
app.set('secret', config.secret);

// 套用 middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hi, The API is at http://localhost:' + PORT + '/api')
});

// 建立使用者
app.post('/adduser', function (req, res) {
  // 解析 req.body 所傳送過來的資料 (必須全部存在) 
  if (!req.body.name || !req.body.email || !req.body.login || !req.body.password) {
    res.json({
      success : false,
      message : "傳送過來的資料不完整 ...",
    });
  } else {
    // New 一個 User，填入資料
    // password 以明碼寫入，方便測試
    // 可安裝 bcrypt.js 套件來處理資料 加密/解密 程序
    // 或者用內建的 crypto 來 加密/解密
    var newUser = new User({
      name: req.body.name,
      email:req.body.email,
      login: req.body.login,
      password: req.body.password,
    });
    // console.log(newUser);
    // 寫回 MongoDB
    newUser.save(function (err,result) {
      if (err) {
        res.json({
          success: false,
          message: "Add User 新增錯誤",
          result : err
        })
      } else {
        // console.log('User saved successfully')
        // 寫入成功，傳回結果
        res.json({
          success: true,
          result
        })
      }
    })
  }
})

// 實做 api route
var api = express.Router()

// 使用者驗證 , 不須 middleware驗證token
api.post('/login',(req,res)=>{
  console.log(req.body.login);
  console.log(req.body.password);
  // res.json({
  //   success: true,
  //   message: 'Login',
  //   login: req.body.login,
  //   password: req.body.password
  // });

  User.findOne({
    login: req.body.login
  },(err,loginUser)=>{

    if (err) throw err;
    // res.json(loginUser);
    if (!loginUser){
      res.json({
        success: false,
        message: 'Login User 帳密不存在，請建立新使用者'
      })
    }
    if(loginUser.password != req.body.password){
      res.json({
        success: false,
        message: 'Login User 帳密驗證錯誤',
        token: "error"
      })
    }else {
      // console.log('loginUser');
      // console.log(loginUser);
      let setToken = {
        login : loginUser.login,
        name : loginUser.name,
        email : loginUser.email
      }
      let token = jwt.sign(
        JSON.parse(JSON.stringify(setToken)), 
        app.get('secret'),
        {expiresIn: 60*60*24}
      )
      // 回傳認證成功 JWT Token
      res.json({
        success: true,
        message: '認證成功...',
        token: token
      })
    }
  });
})
// API 根目錄，不須 middleware驗證token
api.get('/',(req,res)=>{
  res.json({
    success: true,
    message: 'This is API Route ...'
  })
});

// 顯示所有使用者，要 middleware驗證toke，
api.get('/users', verifyToken , (req, res)=> {
  User.find({}, function (err, users) {
    res.status(200).json({
      success: true,
      message: 'All Users',
      data : users
    })
  })
});

app.use('/api', api);

// 以下是 驗證token (middleware)
// Verify Token
// Token Format : header:Authorization , Token:Bearer <access_token>
function verifyToken(req,res,next){
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  console.log("verify Token" , token);
  if (token) {
    jwt.verify(token, app.get('secret'),(err,decoded)=>{
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'token 認證錯誤'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).json({
      success: false,
      message: '沒有提供 token 做驗證'
    });
  }
}

app.listen(PORT, function () {
  console.log('The server is running at http://localhost:' + PORT)
});
