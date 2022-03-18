import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  let navigate = useNavigate()
    const [credentials, setCredentials] = useState({email: "", password: ""})


    const handleSubmit = async (e)=>{
        e.preventDefault();
        // using API call
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNThiYWE3YjJlNDYwZmUxZDkzYWY3In0sImlhdCI6MTY0NTU3OTIyOX0.IrUSv8QHkH1KvZX2bIRMWRzF4VO3zmINEXnSCOFCQcE'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      
        body: JSON.stringify({email: credentials.email, password: credentials.password}) // body data type must match "Content-Type" header
      });
      const json = await  response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      if(json.success){
          // Save the authtoken and redirect
          localStorage.setItem('token',json.authtoken)
          navigate("/")
          props.showAlert("LoggedIn successfully", "success")
      }else{
        props.showAlert("Invalid credentials", "danger")
      }
    }


    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})

    }

  return (
<div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Enter E-mail</label>
    <input type="email" className="form-control" value={credentials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  value={credentials.password} onChange={onChange} name='password' id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
</form>
</div>
  )
}

export default Login