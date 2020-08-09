


import React,{useState} from "react";
import "./auth.css";
import {Link,useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import M from "materialize-css"
import { userState } from "../../Redux/actions";

const Styles = {
  navigate:{
    color:"#423F40",
    fontWeight:500
  }
}

const SignIn = ()=>{


  const [password,setPassword] = useState("")
  const history = useHistory()

  const updatePassword=()=>{

    if(!password){

      return M.toast({html: "please enter password",classes:"teal lighten-2"})
    }
    // signin request to server
    fetch("https://instacalm-server.herokuapp.com/set-password",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({password})
    })
    .then(data=>data.json())
    .then(result=>{
      console.log(result)

        if(result.error){
          return M.toast({html: result.error,classes:"teal lighten-2"})
        }
        else{
          M.toast({html: "signed in",classes:"teal lighten-2"})
          history.push("/signin")
        }
    })
    .catch(err=>{
       console.log(err,"error")
       return
    })

    // reset form value
    setPassword("")
  }


  return(
    <>
      <p className="center">please enter your password</p>
       <div className="container">
        <div className="box">
          <h1 className="header">Instacalm</h1>


          <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input  value={password} onChange={(e)=>setPassword(e.target.value)}
               id="icon_prefix" type="text"/>
              <label htmlFor="icon_prefix">Enter Password</label>
          </div>
          
         <button onClick={updatePassword} className="signBtn margin">Set Password</button>

        </div>
      </div>
    </>
  )
}


export default SignIn

