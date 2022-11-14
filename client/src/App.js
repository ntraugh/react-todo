import React, {useState} from "react"
import './App.css';
import Login from "./components/Login";
import axios from "axios"

function App() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })


  const [error, setError] = useState(null)


  const login = async (userDetails) => {
    const response = await axios.post("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", userDetails)
      .then(userData => setUserInfo({email: userData.email, password: userData.password}))
      .catch(err => console.log(err))

    console.log(response?.data)
    console.log(userDetails)
  }

  const logout = () => {
    setUserInfo({
      email: "",
      password: "",
    })
  }
  
  return (
    <div className="App">
      <Login login={login} error={error} setError={setError}/>
    </div>
  );
}

export default App;
