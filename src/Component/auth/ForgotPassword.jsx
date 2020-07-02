

import React,{useState} from "react";
import "./auth.css";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css"
import { userState } from "../../Redux/actions";

const Styles = {
  navigate:{
    color:"#423F40",
    fontWeight:500
  }
}

const SignIn = ()=>{


  const [email,setEmail] = useState("")
  const history = useHistory()

  const resetPassword=()=>{
    console.log(email)
    // signin request to server
    if(!email){
      
      return M.toast({html:"please enter email",classes:"teal lighten-2"})
    }
    fetch("https://sqtis.sse.codesandbox.io/password-reset",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    })
    .then(data=>data.json())
    .then(result=>{
      console.log(result)

        if(result.error){
          return M.toast({html: result.error,classes:"teal lighten-2"})
        }
        else{
          M.toast({html: result.message,classes:"teal lighten-2"})
          history.push("/")
        }
    })
    .catch(err=>{
       console.log(err,"error")
       return
    })

    // reset form value
    setEmail("")
  }


  return(
    <>
      <p className="center">please enter email to reset your password</p>
      <div className="container">
        <div className="box">
          <h1 className="header">Instacalm</h1>


          <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input  value={email} onChange={(e)=>setEmail(e.target.value)}
               id="icon_prefix" type="text"/>
              <label htmlFor="icon_prefix">Enter Your Email</label>
          </div>
          
         <button onClick={resetPassword} className="signBtn margin">Send Link</button>

        </div>
      </div>
    </>
  )
}


export default SignIn

