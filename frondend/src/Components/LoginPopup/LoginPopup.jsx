import React, {  useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
const{url,setToken}=useContext(StoreContext)

  const [curState, setCurState] = useState("login");
  const [data,setData]=useState({
    name:' ',
    email:'',
    password:''
  })
  const onChangeHandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData(data=>({...data,[name]:value}))
  }
  const onLogin=async(event)=>{
    event.preventDefault()
    let newUrl=url;
    if(curState==="login"){
     newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response= await axios.post(newUrl,data)
    if(response.data.success){
      setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }

    }

  


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {curState === "login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="your name" required />
          )}

          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="password" required />
        </div>
        <button type="submit">{curState === "sign Up" ? "create account" : "login"}</button>
        <div className="lgin-popup-condition">
          <input type="checkbox" />
          <p>By continuing,i agrree to the terms of use & privacy policy.</p>
        </div>
        {curState === "login" ? (
          <p>
            create a new account?<span onClick={()=>setCurState("sign Up")} >Click here</span>
          </p>
        ) : (
          <p>
            already have an account?<span onClick={()=>setCurState("login")}>login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
