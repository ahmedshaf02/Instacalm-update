import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector } from "react-redux";
import Preloader from "./Preloader";
import M from "materialize-css";
import { Link } from "react-router-dom";

const styles = { fontSize: 18 };

const MyFollowingPost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const state = useSelector(state => state);
  // console.log(state)
  useEffect(() => {
    fetch("https://sqtis.sse.codesandbox.io/followingpost", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(post => post.json())
      .then(result => {
        setLoading(true);
        // console.log(result.posts)
        setPost(result.posts);
      })
      .catch(err => {
        setLoading(true);
        console.log(err, "error home");
      });
    // cleanup code
    return () => {
      return;
    };
  }, []);

  const handleLikePost = id => {
    console.log(id);
    fetch("https://sqtis.sse.codesandbox.io/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(post => post.json())
      .then(result => {
        // to update like
        console.log(result);
        const newPostData = post.map(ele => {
          if (ele._id === result._id) {
            return result;
          }
          return ele;
        });

        setPost(newPostData.reverse());
      })
      .catch(err => {
        console.log(err, "error");
        return;
      });
  };

  const handleUnlikePost = id => {
    console.log(id);
    fetch("https://sqtis.sse.codesandbox.io/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(post => post.json())
      .then(result => {
        console.log(result);
        // to update unlike
        const newPostData = post.map(ele => {
          if (ele._id === result._id) {
            return result;
          }
          return ele;
        });
        setPost(newPostData.reverse());
      })
      .catch(err => {
        console.log(err, "error");
      });
  };

  const hanldeDeletePost = postId => {
    console.log(postId);
    fetch(`https://sqtis.sse.codesandbox.io/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(post => post.json())
      .then(result => {
        console.log(result);
        const newDeleteData = post.filter(ele => {
          return ele._id !== result._id;
        });
        setPost(newDeleteData.reverse());
        M.toast({
          html: "deleted post successfully",
          classes: "teal lighten-2"
        });
      })
      .catch(err => {
        console.log(err, "error");
      });
  };

  const handleComment = (text, id) => {
    console.log(id);
    fetch("https://sqtis.sse.codesandbox.io/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id, text })
    })
      .then(post => post.json())
      .then(result => {
        console.log(result);

        const newCommentData = post.map(ele => {
          if (ele._id === result._id) {
            return result;
          }
          return ele;
        });
        setPost(newCommentData.reverse());
      })
      .catch(err => {
        console.log(err, "error");
      });
  };

  return (
    <>
      <h4 className="margin"> {!state ? "Loading..." : `${state.name}'s follwed post`}</h4>
      {/* loading code */}
      {!loading ? <Preloader /> : false}

      <div className="margin">
        {/* to get all post */}
        {post ? (
          post &&
          post.reverse().map(ele => (
            <>
              <div key={ele.image} className="container4">
                <div className="postHeader">
                  <Link
                    to={
                      ele.postedBy._id !== state._id
                        ? `/profile/${ele.postedBy._id}`
                        : "/profile"
                    }
                    style={styles}
                  >
                    {ele.postedBy.name}
                  </Link>
                  {ele.postedBy._id === state._id && (
                    <i
                      onClick={() => hanldeDeletePost(ele._id)}
                      className="material-icons"
                      style={{ color: "#DF0152", float: "right" }}
                    >
                      delete
                    </i>
                  )}
                </div>

                <div className="postMain ">
                  <img className="responsive-img" src={ele.image} alt="posts" />
                  <div className="margin">
                    <i className="material-icons" style={{ color: "red" }}>
                      favorite
                    </i>
                    {/* to show like and unlike */}
                    {ele.likes.includes(state._id) ? (
                      <i
                        onClick={() => handleUnlikePost(ele._id)}
                        className="material-icons pointer black"
                      >
                        thumb_down
                      </i>
                    ) : (
                      <i
                        onClick={() => handleLikePost(ele._id)}
                        className="material-icons pointer"
                      >
                        thumb_up
                      </i>
                    )}

                    <h6>{ele.likes.length} Likes</h6>
                    <h6>{ele.title}</h6>
                    <h6>{ele.body}</h6>
                    {ele.comment.map(ele => (
                      <h6 key={ele._id}>
                        <b>{ele.postedBy.name}</b>: {ele.text}
                      </h6>
                    ))}
                  </div>
                </div>

                <div className="postFooter">
                  {/* to get comment input */}
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      // console.log(e.target[0].value)
                      handleComment(e.target[0].value, ele._id);
                      e.target[0].value = "";
                    }}
                  >
                    <div className="input-field col s6">
                      <i
                        className="material-icons prefix"
                        style={{ color: "#2E7FFB" }}
                      >
                        account_circle
                      </i>
                      <input id="icon_prefix1" type="text" />
                      <label for="icon_prefix1">Add the comments *</label>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="center">
            {/* no post image */}
            <img
              className="responsive-imgage"
              src="data:image/png;base64,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"
              alt="no post"
            />
          </div>
        )}
        {!post.length && (
          <div className="center">
            {/* no post image */}
            <img
              className="responsive-imgage"
              src="data:image/png;base64,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"
              alt="no post"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyFollowingPost;
