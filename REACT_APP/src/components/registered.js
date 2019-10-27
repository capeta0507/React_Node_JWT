import React,{ useState } from 'react'
import axios from 'axios'

const Registered = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const send = () => {
    if(name === '' || email === '' || login === '' || password === '' || passwordCheck === ''){
      alert('欄位不能為空白')
      return false
    } else if (password !== passwordCheck){
      alert('密碼與密碼確認不相符！！')
      return false
    } else {
      axios({
        method: 'POST',
        url: '/adduser',
        data:{
          name: name,
          email: email,
          login: login,
          password: password
        }
      }).then((response) => {
        console.log(response.data);
        console.log(response.data.success);
        if(response.data.success){
          alert('註冊成功')
          window.location.href = `${window.location.origin}`
        }
      })
    }
  }
  return (
    <div className='main'>
      <div className="loginForm">
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="regName" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="regEmail" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Login</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="regLogin" placeholder="Login" value={login} onChange={(e) => {setLogin(e.target.value)}} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="regPassword" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password確認</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="regPassword2" placeholder="Password" value={passwordCheck} onChange={(e) => {setPasswordCheck(e.target.value)}} />
          </div>
        </div>
        <div className="btn btn-primary" onClick={send}>送出</div>
      </div>
    </div>
  )
}

export default Registered