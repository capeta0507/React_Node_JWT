import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [userName, setUserName] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const LoginStatus = window.sessionStorage.getItem('res')
            const name = window.sessionStorage.getItem('name')
            setIsLogin(!!LoginStatus)
            setUserName(name)
        }
    }, [])
    // console.log('isLogin', isLogin)
    const logout = () => {
        window.sessionStorage.clear()
        window.location.href = `${window.location.origin}`
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src="https://www.thedesignfrontier.com/wp-content/uploads/2019/05/f1-logo-big.png" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/' className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/about' className="nav-link" href="#">About</NavLink>
                    </li>
                    <li className="nav-item">
                        {(() => {
                            if(isLogin === true){
                                return(
                                    <>
                                        <NavLink to='/data' className="nav-link" href="">資料</NavLink>
                                    </>
                                )
                            } else {
                                return(
                                    <NavLink to='/login' className="nav-link">
                                        資料(請先登入)
                                    </NavLink> 
                                ) 
                            }
                        })()}
                        
                    </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {(() => {
                                if(isLogin === true){
                                    return(
                                        <>
                                            <div className="nav-link myLogout" onClick={logout}>
                                                {userName}/Logout
                                            </div>
                                        </>
                                    )
                                } else {
                                    return(
                                        <NavLink to='/login' className="nav-link">
                                             Login
                                         </NavLink> 
                                     ) 
                                }
                            })()}
                        </li>
                        <li className="nav-item">
                            {(() => {
                                if(isLogin === true){
                                    return(
                                        <>
                                            <NavLink to='/update' className="btn btn-warning">
                                                修改個人資料
                                            </NavLink> 
                                        </>
                                    )
                                }
                            })()}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar