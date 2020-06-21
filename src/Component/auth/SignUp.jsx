
import React,{useState, useEffect} from "react";
import "./auth.css";
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const Styles = {
  navigate:{
    color:"#423F40",
    fontWeight:500
  }
}

const SignUp = (props)=>{

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // const [profile,setProfile] = useState("")
  // const [url,setUrl] = useState("")
  const history = useHistory()
  const postData=()=>{


    // signup request to server
    fetch("https://sqtis.sse.codesandbox.io/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password})
    })
    .then(data=>data.json())
    .then(result=>{
      if(result.error){
       return M.toast({html: result.error,classes:"teal lighten-2"})
      }
      else{
        M.toast({html: "singup successfully",classes:"teal lighten-2"})
        history.push("/signin")
      }
      
    })
    .catch(err=>console.log(err))
    // reset form value
    setName("")
    setEmail("")
    setPassword("")
  }
  
  // const handlePostImage =()=>{
    
  //   if(!profile){
  //    return M.toast({html:"image not selected",classes:"teal lighten-2"})
      
  //   }
  //   const storageRef = firebase.storage().ref("images/"+profile.name)

  //   const upload = storageRef.put(profile)

  //   upload.on("state_changed",
  //   (snapshot)=>{
  //   const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
  //   console.log(progress)
  //   },
  //   (err=>console.log(err.message)),
    
  //   ()=>{
  //     upload.snapshot.ref.getDownloadURL()
  //     .then(url=>{
  //       setUrl(url)
  //     })
  //   }
  //   )
  // }

  return(
    <>
      <div className="container">
        <div className="box">
          <h1 className="header">Instacalm</h1>

          <div class="input-field col s6">
            <input id="name" 
            value={name} onChange={(e)=>setName(e.target.value)}
            type="text" class="validate"/>

            <label for="name">Username</label>
          </div>

          <div class="input-field col s6">
            <input id="email1" 
            value={email} onChange={(e)=>setEmail(e.target.value)}
            type="text" class="validate"/>
            <label for="email1">Email</label>
          </div>

          <div class="input-field col s6">
            <input id="password"
             value={password} onChange={(e)=>setPassword(e.target.value)}
             type="password" class="validate"/>
            <label for="password">Password</label>
          </div>

          {/* <div class="file-field input-field ">
            <div class="btn #64b5f6 blue lighten-2">
              <span>Profile imgage</span>
              <input type="file" onChange={e=>setProfile(e.target.files[0])}/>
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text"/>
            </div>
          </div> */}

         <button onClick={postData} className="signBtn">SIGN UP</button>
          <h6><Link style={Styles.navigate} to="/signin">Already have an account?</Link></h6>
        </div>
      </div>
    </>
  )
}


export default SignUp

