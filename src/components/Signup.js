import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        // using API call
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNThiYWE3YjJlNDYwZmUxZDkzYWY3In0sImlhdCI6MTY0NTU3OTIyOX0.IrUSv8QHkH1KvZX2bIRMWRzF4VO3zmINEXnSCOFCQcE'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      
        body: JSON.stringify({name, email, password}) // body data type must match "Content-Type" header
      });
      const json = await  response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      if(json.success){
          // Save the authtoken and redirect
          localStorage.setItem('token',json.authtoken)
          navigate("/")
          props.showAlert("Succesfully SignedUp", "success")
      }else{
        props.showAlert("Ivalid credentials", "danger")
      }
    }


    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})

    }

  return (
    <div>
        <h1>SignUp for creating an account</h1>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" minLength={5} required onChange={onChange} id="password" name='password'/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" minLength={5} required onChange={onChange} id="cpassword" name='cpassword'/>
    </div>
   
    <button type="submit" className="btn btn-primary">Sign Up</button>
  </form></div>
  )
}

export default Signup