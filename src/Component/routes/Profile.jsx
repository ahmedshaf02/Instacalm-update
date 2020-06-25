
import React,{useEffect, useState} from "react";
import "./profile.css"
import {useSelector,useDispatch} from "react-redux"
import firebase from "../routes/config"
import { updateImageState } from "../../Redux/actions";
import M from "materialize-css";


const Profile = () => {

  const [mypost,setMypost] = useState([])
  const [image,setImage] = useState("")
  const state = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    // to get all posts
    fetch("https://sqtis.sse.codesandbox.io/mypost",{
      method:"get",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(data=>data.json())
    .then(result=>{
      console.log(result)
      setMypost(result.mypost)
    })
    .catch(err=>{
       console.log(err,"error")
       return
    })
    
    
  },[])

  useEffect(()=>{
    // console.log(image)
    if(image){
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
          console.log(url)
          setImage("")
          updateImageServer(url)
        })
      }
      )
    }
  },[image])

  const updateImageServer=(url)=>{
    fetch("https://sqtis.sse.codesandbox.io/updateimage",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({image:url})
    })
    .then(data=>data.json())
    .then(result=>{
      // console.log(result)
      M.toast({html: "image updated",classes:"teal lighten-2"})
      dispatch(updateImageState(result.image))
      localStorage.setItem("user",JSON.stringify({...state}))
      
    })
    .catch(err=>{
      M.toast({html: err,classes:"teal lighten-2"})
       console.log(err,"error")
       return
    })
    
  }
 
  const handleUpdateImage=(file)=>{
    setImage(file)
  }

  return (
    <>
      <div>
        <div className="container2">
            <div>
              <img className="userImg" src={state?state.image:"loading"} alt="profile"/>
              {/* update image code */}
            <div class="file-field input-field">
                  <div class="btn #448aff blue accent-2">
                    <span><i class="material-icons">camera_alt</i></span>
                    
                    <input type="file" 
                    onChange={e=>{
                      handleUpdateImage(e.target.files[0])
                      e.target.current = ""
                    }}
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Update image"/>
                  </div>
            </div>
            </div>
            <div className="center">
              <h2>{state?state.name:"loading"}</h2>
              <h5>{state?state.email:"loading"}</h5>
              <div className="containerLike">
              <span className="margin">{mypost.length} posts</span>
              <span className="margin">{state?state.follower.length:0} follower</span>
              <span className="margin">{state?state.following.length:0}  following</span>
              </div>
             
            </div>
            
        </div>
        <div style={{margin:30}}>
           <hr/>
        </div>
        <div className="gallery">
          {
            mypost?(

              mypost && mypost.map(ele=>(
                <img key={ele.image} className="galleryImg" src={ele.image} alt="profile post"/>
              ))
            ):<h2>No Post yet!</h2>
          }
          {
          mypost.length === 0?<h2>No Post yet!</h2>:""
          }
        </div>
      </div>
    </>
  );
};

export default Profile;