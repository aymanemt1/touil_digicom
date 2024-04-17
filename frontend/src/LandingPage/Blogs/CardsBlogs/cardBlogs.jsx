import React, { Fragment, useState } from "react";
import "./cardBlogs.css";
import { blogsData } from "../blogsData";
import ModalBlogs from "./ModalBlogs/modalBlogs";

export default function CardsBlogs() {
  const [showModal, setShowModal] = useState(false); 
  const [selectedBlog, setSelectedBlog] = useState(null); 

  const BlogsOld = [blogsData.blogs[0], blogsData.blogs[1], blogsData.blogs[2]];
  const BlogsNew = [blogsData.blogs[3], blogsData.blogs[4], blogsData.blogs[1]];

  const handleShowDetails = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  return (
    <Fragment>
      <div className="parentCardsOfBlogs">
        <h1 className="h1Blogs">BLOGUES</h1>
        <div className="parentCardBlogs">
          {BlogsOld.map((item, index) => (
            <div className="cardBlog" key={index}>
              <img src={item.img} alt={item.title} />
              <div className="btnCardBlogs">
                <button onClick={() => handleShowDetails(item)}>afficher les détails</button>
              </div>
              <div className="lineInfoCard">
                <div>
                  <i className="bx bx-user"></i> {item.postOwner}
                </div>
                <div>
                  <i className="bx bx-calendar-alt"></i> {item.date}
                </div>
              </div>
              <h6 className="h6Card">{item.title}</h6>
            </div>
          ))}
        </div>
        <h1 className="h1BlogsNew">BLOGUES RECENTS</h1>
        <div className="parentCardBlogs">
          {BlogsNew.map((item, index) => (
            <div className="cardBlog" key={index}>
              <img src={item.img} alt={item.title} />
              <div className="btnCardBlogs">
                <button onClick={() => handleShowDetails(item)}>afficher les détails</button>
              </div>
              <div className="lineInfoCard">
                <div>
                  <i className="bx bx-user"></i> {item.postOwner}{" "}
                </div>
                <div>
                  <i className="bx bx-calendar-alt"></i> {item.date}{" "}
                </div>
              </div>
              <h6 className="h6Card">{item.title}</h6>
            </div>
          ))}
        </div>
      </div>
      {showModal && <ModalBlogs blog={selectedBlog} onClose={() => setShowModal(false)} />}
    </Fragment>
  );
}
