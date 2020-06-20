
import React,{useEffect, useState} from "react";
import "./profile.css"
import {useParams} from "react-router-dom"
import Preloader from "./Preloader";

const UserProfile = () => {

  const [userProfile,setUserProfile] = useState("")
  const {id}  = useParams()

  useEffect(()=>{
    // to get all posts
    fetch(`https://sqtis.sse.codesandbox.io/user/${id}`,{
      method:"get",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(data=>data.json())
    .then(result=>{
      console.log(result)
     setUserProfile(result)

    })
    .catch(err=>{
       console.log(err,"error")
       return
    })
    
    
  },[])

  return (
    <>
      {
        userProfile?(
          <div>
          <div className="container2">
              <div>
                <img className="userImg" src="https://images.unsplash.com/photo-1552794972-34a0dbd0a523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profile"/>
              </div>
            
               <div>
                 <h2>{userProfile.user.name}</h2>
                <h5>{userProfile.user.email}</h5> 
                <div className="containerLike">
                <span className="margin">{userProfile.post.length} posts </span>
                <span className="margin">40 likes</span>
                <span className="margin">40 following</span>
                </div>
                <div className="center">
                  <button className="followBtn">Follow</button>
                </div>
              </div> 
              
          </div>
          <div style={{margin:30}}>
             <hr/>
          </div>
          <div className="gallery">
            {
              userProfile.post && userProfile.post.map(ele=>(
                <img key={ele.image} className="galleryImg" src={ele.image} alt="profile post"/>
              ))
            }
          </div>
        </div> 
        ):(
          <>
          <h2 className="center">Loading..</h2>
          <Preloader/>
          </>
        )
      }
     
    </>
  );
};

export default UserProfile;