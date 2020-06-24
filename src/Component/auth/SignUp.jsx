
import React,{useState, useEffect} from "react";
import "./auth.css";
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"
import firebase from "../routes/config"

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
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)
  const history = useHistory()
  
  useEffect(()=>{
    if(url){
      console.log(url)
      postData()
    }
  },[url])

  const postData=()=>{
    // signup request to server
    fetch("https://sqtis.sse.codesandbox.io/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password,img:url})
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
  
  const handlePostImage =()=>{

    const storageRef = firebase.storage().ref("images/"+image.name)

    const upload = storageRef.put(image)

    upload.on("state_changed",
    (snapshot)=>{
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
    console.log(progress)
    },
    (err=>console.log(err.message)),
    
    ()=>{
      upload.snapshot.ref.getDownloadURL()
      .then(url=>{
        setUrl(url)
      })
    }
    )

  }

// to handle image available or not
  const handleSignup=()=>{
    if(image){
      handlePostImage()
    }
    else{
      postData()
    }
  }

  return(
    <>
      <div className="container">
        <div className="box">
          <h1 className="header">Instacalm</h1>

          <div className="input-field col s6">
            <input id="name" 
            value={name} onChange={(e)=>setName(e.target.value)}
            type="text" className="validate"/>

            <label htmlFor="name">Username</label>
          </div>

          <div className="input-field col s6">
            <input id="email1" 
            value={email} onChange={(e)=>setEmail(e.target.value)}
            type="text" className="validate"/>
            <label htmlFor="email1">Email</label>
          </div>

          <div className="input-field col s6">
            <input id="password"
             value={password} onChange={(e)=>setPassword(e.target.value)}
             type="password" className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
          <div class="file-field input-field">
                <div class="btn #448aff blue accent-2">
                  <span>Upload Profile</span>
                  <input type="file" 
                  onChange={e=>setImage(e.target.files[0])}
                   />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
              </div>

        
         <button onClick={handleSignup} className="btn #448aff blue accent-2">SIGN UP</button>
          <h6><Link style={Styles.navigate} to="/signin">Already have an account?</Link></h6>
        </div>
      </div>
    </>
  )
}


export default SignUp

