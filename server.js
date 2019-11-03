// 載入 server 程式需要的相關套件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Send eMail
// 載入模組並設定使用的服務、帳號、密碼。這裡使用方便的 Gmail 寄信
// 設定
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'davidtpe99@gmail.com',
    pass: 'vsvahllcjjfpwyni' // 認證密碼
  }
});

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

// NOTE:提供靜態檔案顯示
app.use('/html', express.static(__dirname + '/html'));
// 提供React build 靜態檔案顯示
// app.use('/', express.static(__dirname + '/REACT_APP/build'));

app.get('/', function (req, res) {
  res.send('Hi, The API is at http://localhost:' + PORT + '/api')
});

// 建立使用者 (註冊)
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

// NOTE:忘記密碼處理
// 取得使用者所傳送過來的 Login，取得使用者的eMail，回傳 eMail 
// 如果沒有 Login 資料，傳回錯誤訊息，讓使用者去註冊
// 如果有 Login 資料，回傳 eMail 帳號
app.post('/getemail',(req,res)=>{
  console.log("LOGIN : ",req.body.login);
  // MongoDB 找尋使用者r
  User.findOne({
    login:req.body.login
  },(err,loginUser)=>{
    if (err){
      res.json({
        success:false,
        message:"MongoDB Error ..."
      })
      return false;
    }
    if (!loginUser){
      res.json({
        success:false,
        message:"Login使用者不存在，建議使用者進行註冊"
      })
    }else{
      res.json({
        success:true,
        message:"Login使用者存在，建議使用者進行新的密碼寄送",
        login : loginUser.login,
        name : loginUser.name,
        email:loginUser.email
      })
    }
  })
})

// 忘記密碼 -> 產生新密碼
// 系統根據Login & eMail 產生新的密碼
// 密碼根據亂數計算，產生6位數字密碼
// 密碼寫回資料庫，並要求使用者以新密碼登入&立即修改密碼
app.post('/newpassword',(req,res)=>{
  console.log("LOGIN : ",req.body.login);
  console.log("eMail : ",req.body.email);
  let myRandom = ['xK','Yr','Wh']
  // 產生新的密碼
  let newPassword = '';
  for(x=0;x<3;x++){
    newPassword += Math.floor(Math.random() * Math.floor(10));
    newPassword += myRandom[x];
  }

  // 新密碼寫回資料庫
  User.findOneAndUpdate({
    login:req.body.login
  },
  {
    $set: {password: newPassword}
  },(err,doc)=>{
    if (err){
      res.json({
        success:false,
        message:"新密碼資料庫寫回錯誤",
        error:err
      })
    }else{
      // 寄信
      mailTransport.sendMail(
        {
          from: 'David 詹 <davidtpe99@gmail.com>',
          to: req.body.email,
          subject: "JWT 使用者新密碼",
          html: `<h1>${req.body.login}</h1><p>您的在網站上申請新的密碼...</p><p>密碼如下 : ${newPassword}</p>`
        },(err)=>{
          if (err){
            // console.log('nodemailer 寄送錯誤');
            // console.log(err);
            res.json({
              success:false,
              message:"nodemailer 寄送錯誤",
              error:err
            })
          }else {
            // console.log(`nodemailer 寄送成功，請 ${req.body.email} 收信看看`);
            // console.log('nodemailer ... 程式完成...');
            res.json({
              success:true,
              message:`新密碼寄送成功，請 ${req.body.email} 收信看看`,
              password:newPassword,
              data:doc
            })
          }
        }
      );
    }
  })
})

// 實做 api route
var api = express.Router()

// API 根目錄，不須 middleware驗證token
api.get('/',(req,res)=>{
  res.json({
    success: true,
    message: 'This is API Route ...'
  })
});

// 使用者登入，傳送前端驗證Token , 不須 middleware驗證token
// (POST) http://localhost:5000/api/login 
api.post('/login',(req,res)=>{
  console.log(req.body.login);
  console.log(req.body.password);
  // res.json({
  //   success: true,
  //   message: 'Login',
  //   login: req.body.login,
  //   password: req.body.password
  // });

  // MongoDB 找尋使用者
  User.findOne({
    login: req.body.login
  },(err,loginUser)=>{
    // 處理錯誤訊息
    if (err) {
      res.json({
        success: false,
        error: err,
        message: 'MongoDB 資料庫 錯誤 ...'
      })
    }
    // res.json(loginUser);
    if (!loginUser){
      res.json({
        success: false,
        login_check: false,
        password_check: false,
        message: 'Login User 帳密不存在，請建立新使用者'
      })
      return false;
    }
    // 判斷密碼是否正確
    if(loginUser.password != req.body.password){
      res.json({
        success: false,
        login_check: true,
        password_check: false,
        message: 'Login User 帳密驗證錯誤',
        token: ""
      })
      return false;
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
        login_check: true,
        password_check: true,
        message: '認證成功...',
        token: token,
        login : loginUser.login,
        name: loginUser.name,
        email: loginUser.email
      })
    }
  });
})
// 顯示所有使用者，要 middleware 驗證 JWT Token，
api.get('/users', verifyToken , (req, res)=> {
  User.find({}, function (err, users) {
    res.status(200).json({
      success: true,
      message: 'All Users',
      data : users
    })
  })
});

// NOTE:修改使用者資料
// 方法 POST
// 收到資料：req.body -> login,name,email
// 要 middleware 驗證 JWT Token
api.post('/changedata',verifyToken ,(req,res) =>{
  console.log('api/changedata...(POST)')
  console.log("login : ",req.body.login);
  console.log("name : ",req.body.name);
  console.log("eMail : ",req.body.email);
  // 新資料寫回資料庫
  User.findOneAndUpdate(
  {
    login:req.body.login
  },
  {
    $set: {
      name: req.body.name,
      email:req.body.email
    }
  },(err,doc)=>{
    if(err){
      console.log('新資料寫回錯誤');
      res.json({
        success:false,
        message:"新資料庫寫回錯誤",
        error:err
      })
    }else{
      console.log('新資料寫回 OK');
      res.json({
        success:true,
        message:`${req.body.name},${req.body.email} 新資料寫回 OK`,
        data:doc
      })
    }
  })
})
// NOTE:修改使用者密碼
// 方法 POST
// 收到資料：req.body -> lobin,newpassword,confirmpassword
// 要 middleware 驗證 JWT Token
api.post('/changepassword',verifyToken ,(req,res) =>{
  console.log('api/changepassword...(POST)')
  console.log("login : ",req.body.login);
  console.log("newpassword : ",req.body.password);
  // console.log("confirmpassword : ",req.body.confirmpassword);
  // 新資料寫回資料庫
  User.findOneAndUpdate(
  {
    login:req.body.login
  },
  {
    $set: {
      password: req.body.password
    }
  },(err,doc)=>{
    if(err){
      console.log('新密碼寫回錯誤');
      res.json({
        success:false,
        message:"新密碼庫寫回錯誤",
        error:err
      })
    }else{
      console.log('新密碼寫回 OK');
      res.json({
        success:true,
        message:`${req.body.login} 新密碼寫回 OK`,
        data:doc
      })
    }
  })
})

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
