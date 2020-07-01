
import React,{useState,useEffect} from "react";
import "./home.css";
import {useHistory} from "react-router-dom"
import firebase from "./config";
import M from "materialize-css"


const CreatePost = () => {

  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  const history = useHistory()

useEffect(()=>{

    if(url){
      fetch("https://sqtis.sse.codesandbox.io/createpost",{
        method:"post",
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt"),
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title,body,image:url})
      })
      .then(data=>data.json())
      .then(post=>{
        if(post.error){
           M.toast({html:post.error ,classes:"teal lighten-2"})
        }
        else{
          M.toast({html:"created post successfully",classes:"teal lighten-2"})
          history.push("/")
        }
      }).catch(err=>{
        console.log(err,"error") 
      })
    }

    return () => {
      return;
    };
  
},[url,])

 const handlePost =()=>{

    if(!title || !body || !image){
      return
    }
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
  // console.log(url) 

  return (
    <>

      

      <h1>CreatePost page</h1>
        <div style={{margin:10}}>

         <div className="container3">
            <div className="cardHeader">Create Post</div>
           
            <div className="cardMain">
              <input value={title}
              onChange={e=>setTitle(e.target.value)}
              placeholder="title"/>

              <input value={body}
              onChange={e=>setBody(e.target.value)}
              placeholder="body"/>

              {/* file  */}
              <div className="file-field input-field">
                <div className="btn">
                  <span>Image Upload</span>
                  <input type="file" 
                   onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
              </div>
            </div>
            
            <div className="cardFooter">
              <button onClick={handlePost} className="postBtn">Post</button>
            </div>

         </div>
        </div>


    </>
  );
};

export default CreatePost;
