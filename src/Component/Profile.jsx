
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
              <img className="userImg" src="https://images.unsplash.com/photo-1552794972-34a0dbd0a523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profile"/>
            </div>
            <div>
              <h2>{state?state.name:"loading"}</h2>
              <div className="containerLike">
              <span className="margin">{mypost.length} posts</span>
              <span className="margin">40 likes</span>
              <span className="margin">40 following</span>
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
        </div>
      </div>
    </>
  );
};

export default Profile;