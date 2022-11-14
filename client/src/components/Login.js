import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {FaUserAlt, FaLock} from "react-icons/fa"

const Login = ({login, error, setError}) => {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
      })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login(userInfo)
        navigate("todo")
    }

    const handleChange =(e) => {
        e.preventDefault()
        setUserInfo({...userInfo, email: e.target.value})
        if (!validateEmail(e.target.value)) {
            setError('Email is invalid');
          } else {
            setError(null);
          }
    }

    function validateEmail(email){
        return /\S+@\S+\.\S+./.test(email)
    }

  return (
    <form onSubmit={handleSubmit} className="form">
        <div className='center-form'>
            <h2>Rapptr Labs</h2>
            <div>
                <label htmlFor='email' style={{"fontWeight": "bold"}}>Email: </label>
                <FaUserAlt style={{paddingRight: ".5rem"}}/>
                <input 
                required
                onChange={handleChange}
                value={userInfo.email}
                placeholder="test@rapptrlabs.com" 
                type="email" name="email" 
                id="email" 
                ref={inputRef}></input>
                {error && <p style={{"color": "red"}}>{error}</p>}
            </div>
            <div>
                <label htmlFor='password' style={{"fontWeight": "bold"}}>Password: </label>
                <FaLock style={{paddingRight: ".5rem"}}/>
                <input 
                required
                onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                value={userInfo.password}
                placeholder="Must be at least 4 characters" 
                type="password" 
                name="password" 
                id="password"></input>
            </div>
            {!error && <button>Login</button>}
                
        </div>

    </form>
  )
}

export default Login