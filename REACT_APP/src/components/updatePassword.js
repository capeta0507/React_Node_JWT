import React,{useEffect, useState} from 'react'
import axios from 'axios'

const UpdatePassword = (props) => {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        setLogin(window.sessionStorage.getItem('myLogin'))
        setEmail(window.sessionStorage.getItem('myEmail'))
    })
    const submit = () => {
        console.log(login, email, 'submit')
        axios({
            method: 'POST',
            url: '/newpassword',
            headers: { 'Content-Type': 'application/json' },
            data:{
                login: login,
                email: email
            }
          }).then((response) => {
              console.log(response.data)
            if(response.data.success === true){
                alert('新密碼已成功寄到您註冊的信箱了，請去接收喔！！')
                props.onHistory.push('/login')
                window.sessionStorage.clear()
            }
            if(response.data.success === false){
                alert(response.data.message)
            }
          })
    }
    return (
        <div className='main'>
            <div className="loginForm">
                <h1>修改密碼</h1>
                <hr />
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Login</label>
                    <div className="col-sm-10">
                        {login}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        {email}
                    </div>
                </div>
                <div className='loginBtn'>
                    <div className="btn btn-primary" onClick={submit}>確認修改</div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
