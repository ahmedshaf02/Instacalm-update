import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <div
        className="displayFormat"
        style={{ height: "85vh", width: "100%", backgroundColor: "#e1b382" }}
      >
        <img
          style={{ borderTopLeftRadius: 20, boxShadow: "1px 1px 2px black" }}
          src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln"
          alt="error page"
        />
      </div>
    </>
  );
};

export default NotFoundPage;
