import React, { Fragment, useEffect, useState } from "react";
import "./modalBlogs.css";

export default function ModalBlogs({ blog, onClose }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const [closed, setClosed] = useState(false);

  const handleClose = () => {
      setClosed(true);
      setTimeout(() => {
        onClose();
    }, 1500); 
};
  return (
    <Fragment>
      <div className={closed ? "parentModalBlogs parentModalBlogsClosed" : "parentModalBlogs"} >
        <div className="ModalBlogs" >
          <div className="colImageModalBlogs">
            <img src={blog.img} />
          </div>
          <div
            className="colTextModalBlogs" >
            <div className="Close">
              <button onClick={handleClose}>
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className="titleModal">
              <h2>{blog.title}</h2>
            </div>
            <div className="infoOwner">
              <div className="ownerblog">
                <img src="./assets/Team/Pic/Omar TL.jpg" />
                <h6>{blog.postOwner}</h6>
              </div>
              <div className="dateBlogs">
                <h6>{blog.date}</h6>
              </div>
            </div>
            <div className="descriptionModelBlog">
              <div className="lineDesign"></div>
              <p>{blog.description}</p>
            </div>
            <div className="listBlogDetails">
              <ul className="ulBlogsDetails">
                {blog.ul.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}