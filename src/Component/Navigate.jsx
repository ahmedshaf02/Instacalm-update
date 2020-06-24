
import React, { useState } from "react";
import {useSelector,useDispatch} from "react-redux"
import "./auth/auth.css"
import {Link,useHistory} from "react-router-dom"

const Styles = {
  navigate:{
    color:"black"
  }
}

const Navigate = ()=>{

  const state  = useSelector(state=>state)
  const dispatch = useDispatch()
  const history  = useHistory()
  
  
  const handleLogout=()=>{
      localStorage.clear()  
      dispatch({type:"CLEAR"})
      history.push("/signin") 
  }
  
  const renderNav=()=>{
    if(state){
      return(
        <>
          <li><Link style={Styles.navigate} to="/myfollowingpost">My Follwing Post</Link></li>,
          <li><Link style={Styles.navigate} to="/profile">Profile</Link></li>,
          <li><Link style={Styles.navigate} to="/createpost">Create Post</Link></li>,
          <button onClick={handleLogout} className="logoutBtn">Logout</button>
        </>
      )
    }
    else{
     return(
       <>
        <li><Link style={Styles.navigate} to="/signin">Sign In</Link></li>,
        <li><Link style={Styles.navigate} to="/signup">Sign Up</Link></li>
       </>
     )
    }
  }

  return(
    <>
  
      <nav>
      <div className="nav-wrapper white" >
        <Link style={Styles.navigate} to={state?"/":"/signin"} className="brand-logo-left logo">Instacalm</Link>
        <ul id="nav-mobile" className="right">
            {renderNav()}
        </ul>
      </div>
      </nav>
    </>
  )
}


export default Navigate
