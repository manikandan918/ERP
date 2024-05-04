import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";




function Signup () {

    // post method

const [inputs, setInputs] = useState({ username: "", password: ""});

const handleChange = (event) => {
  setInputs({ ...inputs, [event.target.name]: event.target.value });
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  let data = {
    password: inputs.password,
    username: inputs.username
    
  };

  axios.post('http://127.0.0.1:8000/api/posts', data)
    .then(response => {
      console.log('Response:', response);
      alert("username and password have been submitted to the server.");
    })
    .catch(error => {
      console.error('Error:', error.response); // Log the full error response
      alert("There was an error processing your request. Please check the connection.");
    });
};

    return(  

<div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <center>
                    <div>
                        <h3 className="text-primary">Sign up</h3>
                    </div></center>
                    <form onSubmit={handleFormSubmit}>
                    <div className="form-floating mb-3"  >
                        <input type="text" className="form-control" id="username" name="username" value={inputs.username} onChange={handleChange} placeholder="name" />
                        <label htmlFor="floatingText">Username</label>
                    </div>
                    
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control"  placeholder="Password" id="password" name="password" value={inputs.password} onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    </form>
                        
                        
                    <Link to={"/Main"} type="submit" className="btn btn-primary py-3 w-100 mb-4">Log in</Link>
                        
                </div>
            </div>
        </div>
    </div>
    );
}

    export default Signup;

    