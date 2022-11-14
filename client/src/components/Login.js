import React, {useEffect, useRef, useState} from 'react'

const Login = ({login, error}) => {
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

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <h2>Rapptr Labs</h2>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                value={userInfo.email}
                placeholder="test@rapptrlabs.com" 
                type="email" name="email" 
                id="email" 
                ref={inputRef}></input>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                value={userInfo.password}
                placeholder="Must be at least 4 characters" 
                type="password" 
                name="password" 
                id="password"></input>
            </div>
            <button>Login</button>
                
        </div>

    </form>
  )
}

export default Login