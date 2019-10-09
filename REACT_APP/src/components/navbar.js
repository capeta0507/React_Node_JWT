import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    const [loginStatus, setLoginStatus] = useState(false)
    const [userName, setUserName] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const LStatus = window.sessionStorage.getItem('res')
            const name = window.sessionStorage.getItem('name')
            setLoginStatus(!!LStatus)
            setUserName(name)
        }
    }, [])
    console.log('loginStatus', loginStatus)
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
                        <a className="nav-link" href="#">資料</a>
                    </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            {(() => {
                                if(loginStatus === true){
                                    return(
                                        <>
                                            <NavLink to='/login' className="nav-link">
                                            {userName}/Logout
                                            </NavLink>
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
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar