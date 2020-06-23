import React from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchUserList = props => {
  const { name, email, _id } = props.user;
  const state = useSelector(state => state);
  return (
    <>
      <div className="searchUserBox">
        <div className="searchDisplay">
          <div className="searchImg">
            <img
              width="60"
              src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/19339625881548233621-512.png"
              alt="user"
            />
          </div>

          <div>
            <h6>
              <Link to={_id !== state._id ? `/profile/${_id}` : "/profile"}>
                {name}
              </Link>
            </h6>
            <h6>{email}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUserList;
