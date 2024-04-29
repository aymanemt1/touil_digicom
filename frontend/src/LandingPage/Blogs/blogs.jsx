import React, { Fragment } from "react";
import ImagesBlogFirstSection from "./imagesSectionBlogs/imagesSectionBlogs";
import CardsBlogs from "./CardsBlogs/cardBlogs";
import CardsPress from "./CardsPress/cardsPress";
import SectionText from "./SectionText/sectionText";
import FormBlogs from "./FormBlogs/formBlogs";
import { Footer } from "../Footer/footer";

import "./blogs.css";

export default function Blogs() {

  document.body.style.overflowX = 'hidden';
  document.title = 'Touil digicom - Blogs'


  return (
    <Fragment>
      <div className="blogs">
        <ImagesBlogFirstSection />
        <CardsBlogs />
        <SectionText />
        <CardsPress />
        {/* <FormBlogs /> */}
      </div>
    </Fragment>
  );
}
