import React, {useState} from "react"
import './App.css';
import Login from "./components/Login";


function App() {

  const [error, setError] = useState("")


  const login = (userDetails) => {
    
    console.log(userDetails)
  }

  const logout = () => {
    console.log("logout")
  }
  
  return (
    <div className="App">
      <Login login={login} error={error}/>
    </div>
  );
}

export default App;
