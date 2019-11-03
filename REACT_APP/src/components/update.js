import React,{useState, useEffect} from 'react'
import axios from 'axios'

const Update = () => {

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfig, setPasswordConfig] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        setLogin(window.sessionStorage.getItem('user'))
        setToken(window.sessionStorage.getItem('token'))
        setName(window.sessionStorage.getItem('name'))
        setEmail(window.sessionStorage.getItem('email'))
    },[])

    const update = () => {
        axios({
            method: 'POST',
            url: `/api/changedata?token=${token}`,
            data:{
              login: login,
              name: name,
              email: email
            }
          }
        ).then((response) => {
            // console.log(response.data);
            // console.log(response.data.success);
            if(response.data.success === true){
                alert('資料修改完成')
                window.sessionStorage.setItem('name',name)
                window.sessionStorage.setItem('email',email)
                window.location.href = `${window.location.origin}`
            }
        })
    }
    const updatePassword = () => {
        // if(password === passwordConfig){
        //     alert('請確認好密碼')
        // } else {
            axios({
                method: 'POST',
                url: `/api/changepassword?token=${token}`,
                data:{
                  login: login,
                  password: password
                }
              }
            ).then((response) => {
                // console.log(response.data);
                // console.log(response.data.success);
                if(response.data.success === true){
                    alert('密碼修改完成')
                    window.location.href = `${window.location.origin}`
                }
            })
        // }
    }
    return (
        <div className='main'>
            <div className="loginForm">
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Login</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputLogin" placeholder="Login" value={login}  disabled="disabled"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName" placeholder="name" value={name} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                </div>
                <div className='loginBtn'>
                    <div className="btn btn-primary" onClick={update}>修改資料</div>
                </div>
                <hr />
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">config</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword2" placeholder="Password" value={passwordConfig} onChange={(e) => {setPasswordConfig(e.target.value)}} />
                    </div>
                </div>
                <div className='loginBtn'>
                    <div className="btn btn-primary" onClick={updatePassword}>修改密碼</div>
                </div>
            </div>
        </div>
    )
}
export default Update