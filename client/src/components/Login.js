import React, {useEffect, useRef, useState} from 'react'

const Login = ({login, error, setError}) => {
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
    <form onSubmit={handleSubmit}>
        <div>
            <h2>Rapptr Labs</h2>
            <div>
                <label htmlFor='email'>Email</label>
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
                <label htmlFor='password'>Password</label>
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