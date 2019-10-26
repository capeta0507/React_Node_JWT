import React,{ useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Login = (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const submit = () => {
        // console.log(login,password,'登入');
        if(login === ''){
            alert('請輸入帳號')
            return false
        } else if(password === ''){
            alert('請輸入密碼')
            return false
        } else {
            axios({
                method: 'POST',
                url: '/api/login',
                data:{
                  login: login,
                  password: password
                }
              }
              ).then((response)=>{
                console.log(response.data);
                console.log(response.data.success);
                if(response.data.success === true){
                    window.sessionStorage.setItem('name',response.data.name)
                    window.sessionStorage.setItem('token',response.data.token)
                    window.sessionStorage.setItem('user',response.data.login)
                    window.sessionStorage.setItem('res',response.data.success)
                    // props.onHistory.push('/')
                    // 跳轉
                    alert('登入成功')
                    window.location.href = `${window.location.origin}`
                }
                // if(response.data.success === false){
                //     alert('帳號或密碼有誤')
                //     return false
                // }
                if(response.data.login_check === false){
                    alert('帳號有誤')
                    return false
                }
                if(response.data.password_check === false){
                    alert('密碼有誤')
                    return false
                }
              })
        }
    }
    return (
        <div className='main'>
            <div className="loginForm">
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Login</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputLogin" placeholder="Login" value={login} onChange={(e) => {setLogin(e.target.value)}} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                </div>
                <div className='loginBtn'>
                    <div className="btn btn-primary" onClick={submit}>登入</div>
                    <Link to='/registered' className="btn btn-info reBtn">註冊</Link>
                    <Link to='/forget' className="btn btn-warning reBtn">忘記密碼</Link>
                </div>
            </div>
        </div>
    )
}

export default Login