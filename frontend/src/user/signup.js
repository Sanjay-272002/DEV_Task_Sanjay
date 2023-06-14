import React, { useState } from "react";
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from "../auth/helper";

const Signup = ()=>{
    const [values,setValues] =useState({
        name:"",
        email:"",
        password:"",
        gender:"",
        phone:"",
        error:"",
        success:false,
    })
    const {name,email,password,phone,gender,error,success}=values
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setValues({...values,error:false})
        console.log(gender)
        signup({name,email,password,gender,phone}).then(data=>{
            console.log("Data",data)
            if(data.email===email){
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    gender:"",
                    phone:"",
                    error:"",
                    success:true
                })
            }else{
                setValues({
                    ...values,
                    error:true,
                    success:false
                })
            }
        }).catch(err=>{console.log(err)})
    }

    const successMessage =()=>{
        return(
          <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
              <div className=" alert alert-success"
              style={{display:success?"":"none"}}>
                  New account created successfully.Please 
                  <Link to="/signin">Login now.</Link>
              </div>
          </div>
      </div>
        )
    }
    const errorMessage =()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className=" alert alert-danger"
                    style={{display:error?"":"none"}}>
                        Check all fields again
                    </div>
                </div>
            </div>
        )
    }
    const signindisplay=()=>{
      return(
      <div className="row">
              <div className="col-md-6 mt-4 offset-sm-3 text-left">
                  <div className=" alert alert-danger"
                  >
                      Having an account.Pls
                      <Link to="/signin">Signin.</Link>
                  </div>
              </div>
          </div>
      )
    }
    const siginUpForm =()=>{
        return (
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                <form>
                  <div className="form-group">
                    <label className="text-secondary">Name</label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={handleChange("name")}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Email</label>
                    <input
                      className="form-control"
                      value={email}
                      onChange={handleChange("email")}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Password</label>
                    <input
                      className="form-control"
                      value={password}
                      onChange={handleChange("password")}
                      type="password"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Phone</label>
                    <input
                      className="form-control"
                      value={phone}
                      onChange={handleChange("phone")}
                      type="tel"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Gender:</label>
                    <select
                          className="form-control"
                          value={gender}
                          onChange={handleChange("gender")}
                          >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    </select>
                  </div>
                  <button
                    onClick={onSubmit}
                    className="btn btn-success btn-block"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          );
    }
    return(
        <Base title="Sign Up Page" description="A signup for Flight App" >
            {successMessage()}
            {errorMessage()}
            {siginUpForm()}
            {signindisplay()}
        </Base> 
          )
}

export default Signup;