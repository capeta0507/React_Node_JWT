import React,{ useState } from 'react'
import UpdatePassword from './updatePassword'
import axios from 'axios'

const Forget = (props) => {
    const [login, setLogin] = useState('')

    const submit = () => {
        if(login === ''){
            alert('請輸入帳號')
            return false
        } else {
            axios({
                method: 'POST',
                url: '/getemail',
                data:{
                  login: login
                }
              }).then((response) => {
                  console.log(response.data)
                  if(response.data.success === true){
                    window.sessionStorage.setItem('myLogin',response.data.login)
                    window.sessionStorage.setItem('myEmail',response.data.email)
                    props.onHistory.push('/UpdatePassword')
                  }
                  if(response.data.success === false){
                      alert(response.data.message)
                      props.onHistory.push('/registered')
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
                <div className='loginBtn'>
                    <div className="btn btn-primary" onClick={submit}>送出</div>
                </div>
            </div>
        </div>
    )
}

export default Forget