import React,{ useState } from 'react'
import axios from 'axios'

const Login = (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        // console.log(login,password,'登入')
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
                window.sessionStorage.setItem('user',response.data.name)
                window.sessionStorage.setItem('token',response.data.token)
                window.sessionStorage.setItem('user',response.data.login)
                props.onHistory.push('/')
            } else if(response.data.success === false){
                return false
            }
          })
    }
    return (
        <div className="loginForm">
            <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Login" value={login} onChange={(e) => {setLogin(e.target.value)}} />
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
            </div>
            <div className="btn btn-primary" onClick={submit}>登入</div>
        </div>
    )
}

export default Login