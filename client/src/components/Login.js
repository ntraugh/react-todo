import React, {useEffect, useRef} from 'react'

const Login = () => {
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("logged in")
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <h2>Rapptr Labs</h2>
            <div>
                <label htmlFor='email'>Email</label>
                <input placeholder="test@rapptrlabs.com" type="email" name="email" id="email" ref={inputRef}></input>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input placeholder="Must be at least 4 characters" type="password" name="password" id="password"></input>
            </div>
            <button>Login</button>
                
        </div>

    </form>
  )
}

export default Login