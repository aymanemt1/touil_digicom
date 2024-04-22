import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { Contact } from "../LandingPage/Contact/Contact";
import Navbar from "../LandingPage/Navbar/navbar";
import { Servicedetail } from "../LandingPage/ServiceDetail/Servicedetail";
import Blog from "../LandingPage/Blogs/blogs";
import { Footer } from "../LandingPage/Footer/footer";
import ScrollToTopButton from "../Components/ScrollTopButton/scrolTopBtn";
import ProgressScrollBar from "../Components/ProgressBar/progressBar";
import TeamDev from "../LandingPage/teamDev/teamDev";
import NotFound from "../Components/notFoundPage/notFound";
import { References } from "../LandingPage/References/References";

export default function RouterApp() {
  return (
    <>
      {/* <ProgressScrollBar /> */}
      <Navbar />
      <ScrollToTopButton />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <LandingPage />
            </Fragment>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/service/:id" element={<Servicedetail />} />
        <Route path="team-dev" element={<TeamDev />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
