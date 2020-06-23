
import React,{useState} from "react";
import "./auth.css";
import {Link,useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import M from "materialize-css"

const Styles = {
  navigate:{
    color:"#423F40",
    fontWeight:500
  }
}

const SignIn = ()=>{


  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()

  const postSignin=()=>{

    // signin request to server
    fetch("https://sqtis.sse.codesandbox.io/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    .then(data=>data.json())
    .then(result=>{
        localStorage.setItem("jwt",result.token)
        localStorage.setItem("user",JSON.stringify(result.user))

        dispatch({type:"USER",payload:result.user}) 

        if(result.error){
          return M.toast({html: result.error,classes:"teal lighten-2"})
        }
        else{
          M.toast({html: "signed in",classes:"teal lighten-2"})
          history.push("/")
        }
    })
    .catch(err=>{
       console.log(err,"error")
       return
    })

    // reset form value
    setEmail("")
    setPassword("")
  }


  return(
    <>
      <div className="container">
        <div className="box">
          <h1 className="header">Instacalm</h1>


          <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input  value={email} onChange={(e)=>setEmail(e.target.value)}
               id="icon_prefix" type="text"/>
              <label htmlFor="icon_prefix">Email</label>
          </div>

          <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input   value={password} onChange={(e)=>setPassword(e.target.value)}
                id="icon_prefix" type="password"/>
              <label htmlFor="icon_prefix">Password</label>
          </div>

          

         <button onClick={postSignin} className="signBtn">SIGN IN</button>
        
         <h6><Link style={Styles.navigate} to="/signup">Don't have an account?</Link></h6>

        </div>
      </div>
    </>
  )
}


export default SignIn

