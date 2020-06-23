
import React from "react";

const PostList = (props)=>{
  return(
    <>
    <div key={ele.image} className="container4">
        <div className="postHeader">
          <Link to={ele.postedBy._id !== state._id?`/profile/${ele.postedBy._id}`:"/profile"} style={styles}>{ele.postedBy.name}</Link>
          {
            ele.postedBy._id === state._id &&
            <i onClick={()=>hanldeDeletePost(ele._id)} class="material-icons" style={{color:"#DF0152",float:"right"}}>delete</i>
          }
        </div>
      
        <div className="postMain">

          <img className="responsive-img" src={ele.image} alt="posts"/>
          <div className="margin">
              <i class="material-icons" style={{color:"red"}}>favorite</i>
            {/* to show like and unlike */}
            {
             ele.likes.includes(state._id)?
             <i onClick={()=>handleUnlikePost(ele._id)} class="material-icons pointer">thumb_down</i>:
            <i onClick={()=>handleLikePost(ele._id)} class="material-icons pointer">thumb_up</i>
            }

              <h6>{ele.likes.length} Likes</h6>
              <h6>{ele.title}</h6>
              <h6>{ele.body}</h6>
              {
                ele.comment.map(ele=>(
                  <h6 key={ele._id}><b>{ele.postedBy.name}</b>: {ele.text}</h6>
              ))
              }
          </div>
              
        </div>
        
        <div className="postFooter">
          {/* to get comment input */}
          <form onSubmit={e=>{
            e.preventDefault()
            // console.log(e.target[0].value)
            handleComment(e.target[0].value,ele._id)
            e.target[0].value=""
          }}>
            <div class="input-field col s6">
              <i class="material-icons prefix" style={{color:"#2E7FFB"}}>account_circle</i>
              <input id="icon_prefix1" type="text"/>
              <label for="icon_prefix1">Add the comments *</label>
            </div>
          </form>
        </div>
    </div>
      </>
  )
}

export default PostList