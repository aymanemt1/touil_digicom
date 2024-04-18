import React, { Fragment, useContext, useEffect, useState } from "react";
import { LangueContext } from "../../../../Context/LangueContext";

import "./modalBlogs.css";

export default function ModalBlogs({ blogs, onClose }) {

  const [blog, setBlogs] = useState(blogs);

  const { langue } = useContext(LangueContext);

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
      <div
        className={
          closed
            ? "parentModalBlogs parentModalBlogsClosed"
            : "parentModalBlogs"
        }
      >
        <div className={ langue == 'fr' ? "ModalBlogs" : "ModalBlogs ModalBlogsAr" } >
          <div className="colImageModalBlogs">
            <img src={blog.img} />
          </div>
          <div className="colTextModalBlogs">
            <div className={langue == 'fr' ? "Close" : "Close CloseAr"} >
              <button onClick={handleClose}>
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className={langue == 'fr' ? "titleModal" : "titleModal titleModalAr"}>
              <h2>{blog.title}</h2>
            </div>
            <div className={langue == 'fr' ? "infoOwner" : "infoOwner infoOwnerAr"}>
              <div className={langue == 'fr' ? "ownerblog" : "ownerblog ownerblogAr"}>
                <img src="./assets/Team/Pic/Omar TL.jpg" />
                <h6>{blog.postOwner}</h6>
              </div>
              <div className="dateBlogs">
                <h6>{blog.date}</h6>
              </div>
            </div>
            <div className={langue == 'fr' ? "descriptionModelBlog" : "descriptionModelBlog descriptionModelBlogAr"}>
              <div className="lineDesign"></div>
              <p>{blog.description}</p>
            </div>
            <div className="listBlogDetails">
              <ul className={langue == 'fr' ? "ulBlogsDetails" : "ulBlogsDetails ulBlogsDetailsAr"}>
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
