
import React,{useEffect, useState} from "react";
import "./profile.css"
import {useSelector} from "react-redux"


const Profile = () => {

  const [mypost,setMypost] = useState([])
  const state = useSelector(state=>state)

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

  

  return (
    <>
      <div>
        <div className="container2">
            <div>
              <img className="userImg" src={state?state.image:"loading"} alt="profile"/>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Image Upload</span>
                  <input type="file" 
                   />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
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