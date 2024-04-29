import React, { Fragment, useContext, useState } from "react";
import "./cardBlogs.css";
import { blogsDataAr, blogsDataFr } from "./blogsData";
import ModalBlogs from "./ModalBlogs/modalBlogs";
import { LangueContext } from "../../../Context/LangueContext";

export default function CardsBlogs() {

  const {langue} = useContext(LangueContext);

  const blogsData = langue == 'fr' ? blogsDataFr : blogsDataAr;



  const [showModal, setShowModal] = useState(false); 
  const [selectedBlog, setSelectedBlog] = useState(null); 

  const BlogsOld = [blogsData.blogs[0], blogsData.blogs[1], blogsData.blogs[2]];
  const BlogsNew = [blogsData.blogs[3], blogsData.blogs[4], blogsData.blogs[5]];

  const handleShowDetails = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  return (
    <Fragment>
      <div className="parentCardsOfBlogs">
        <h1 className={langue == 'fr' ? "h1Blogs" : "h1Blogs h1BlogsAr"} data-aos="fade-right">{blogsData.title1}</h1>
        <div className="parentCardBlogs">
          {BlogsOld.map((item, index) => (
            <div className="cardBlog"  data-aos="fade-left" key={index}>
              <img src={item.img} alt={item.title} />
              <div className="btnCardBlogs">
                <button onClick={() => handleShowDetails(item)}>
                  <i className='bx bxs-detail' ></i> {blogsData.buttonDetail}
                </button>
              </div>
              <div className="lineInfoCard">
                <div>
                  <i className="bx bx-user"></i> {item.postOwner}
                </div>
                <div>
                  <i className="bx bx-calendar-alt"></i> {item.date}
                </div>
              </div>
              <h6 className={langue == 'fr' ? "h6Card" : "h6CardAr"}>{item.title}</h6>
            </div>
          ))}
        </div>
        <h1 className="h1BlogsNew">{blogsData.title2}</h1>
        <div className="parentCardBlogs">
          {BlogsNew.map((item, index) => (
            <div className="cardBlog"  key={index} data-aos="fade-right">
              <img src={item.img} alt={item.title} />
              <div className="btnCardBlogs">
                <button onClick={() => handleShowDetails(item)}>
                <i className='bx bxs-detail' ></i> {blogsData.buttonDetail}
                </button>
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
      </div>
      {showModal && <ModalBlogs blogs={selectedBlog} onClose={() => setShowModal(false)} />}
    </Fragment>
  );
}
