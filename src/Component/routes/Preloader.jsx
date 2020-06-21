
import React from "react"
import "./home.css"

const Preloader=()=>{
  return(
    <div className="centerflex">
      <div className="progress center">
        <div className="indeterminate"></div>
      </div>
    </div>
  )
}

export default Preloader