import React, { useEffect } from "react";
import {useHistory} from "react-router-dom"
import "./styles.css";
import Screens from "./Component/Screens"
import Navigate from "./Component/Navigate"
import { useDispatch } from "react-redux";


const Routing = ()=>{

  // const history = useHistory()
  // const dispatch = useDispatch()

  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   dispatch({type:"USER",payload:user})
    
  //   if(user){
  //     console.log(user)
  //   }
  //   else{
  //     history.push("/signin")
  //   }
  // },[])

  return(
    <>
      <Navigate/>
      <Screens/>
    </>
  )
}

export default function App() {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch({type:"USER",payload:user})
    
    if(user){
      console.log(user)
    }
    else{
      history.push("/signin")
    }
  },[])
 
  return (
    <>
        
          <Routing/>
    </>
     
  );
}
