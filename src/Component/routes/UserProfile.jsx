
import React,{useEffect, useState} from "react";
import "./profile.css"
import {useParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import Preloader from "./Preloader";

const UserProfile = () => {

  const [userProfile,setUserProfile] = useState("")
  const [showFollow, setFollow] = useState(true)
  const {id}  = useParams()
  const dispatch = useDispatch()

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

  const handleFollowUser = followId=>{
    console.log(followId)
    fetch(`https://sqtis.sse.codesandbox.io/follow`,{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({followId:followId})
    })
    .then(data=>data.json())
    .then(data=>{
      
      console.log(data)
      
      localStorage.setItem("user",JSON.stringify(data.loggedUser))
      dispatch({type:"UPDATE",payload:data.loggedUser})
      
      setUserProfile(prevState=>{
        return{
          ...prevState,
          user:data.profileUser
        }
      })
      setFollow(false)
    })
    .catch(err=>{
       console.log(err,"error")
    })
    
  }


  const handleUnfollowUser = unfollowId=>{
    console.log(unfollowId)
    fetch(`https://sqtis.sse.codesandbox.io/unfollow`,{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({unfollowId:unfollowId})
    })
    .then(data=>data.json())
    .then(data=>{
      
      console.log(data)
      
      dispatch({type:"UPDATE",payload:data.loggedUser})
      localStorage.setItem("user",JSON.stringify(data.loggedUser))
      
      setUserProfile(prevState=>{
        return{
          ...prevState,
          user:data.profileUser
        }
      })
      setFollow(true)
    })
    .catch(err=>{
       console.log(err,"error")
    })
    
  }
 
  return (
    <>
      {
        userProfile?(
          <div>
          <div className="container2">
              <div>
                <img className="userImg" src="https://images.unsplash.com/photo-1552794972-34a0dbd0a523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profile"/>
              </div>
            
               <div className="">
                 <h2>{userProfile.user.name}</h2>
                <h5>{userProfile.user.email}</h5> 
                <div className="containerLike">
                <span className="margin">{userProfile.post.length} posts </span>
                <span className="margin">{userProfile.user.follower.length} followers</span>
                <span className="margin">{userProfile.user.following.length} followings</span>
                </div>
                <div className="center">
                  {
                    showFollow? <button onClick={()=>handleFollowUser(userProfile.user._id)} className="followBtn">FOLLOW</button>:
                    <button onClick={()=>handleUnfollowUser(userProfile.user._id)} className="followBtn">UNFOLLOW</button>
                  }
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