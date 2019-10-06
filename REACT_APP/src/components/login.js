import React,{ useState } from 'react'

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
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
            <div className="btn btn-primary">登入</div>
        </div>
    )
}

export default Login