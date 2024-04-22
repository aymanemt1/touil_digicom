import React, { useContext, useEffect } from "react";
import "./HowItWorks.css";
import { Translate } from "./HowItworksTrasnlate";
import { LangueContext } from "../../Context/LangueContext";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import gsap, { Power2 } from "gsap";

export const HowItWorks = () => {
  const { langue } = useContext(LangueContext);

  const HowItWorks = Translate.HowItWorks.find((lang) => lang.id == langue);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let revealContainers = document.querySelectorAll(".reveal");

    revealContainers.forEach((container) => {
      let image = container.querySelector(".image-comment");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "restart none none reset",
        },
      });

      tl.set(container, { autoAlpha: 1 });
      tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });
    });
  }, []);

  return (
    <div className="coomment">
      <div className="entite">
        <div className="reveal">
          <img
            src="assets/WhyUs/how1.png"
            className="image-comment"
            id="Comment-image1"
          />
        <div className="patternHowITWorkReveal"></div>
        <div className="circleHowItWorkPattern"></div>
        </div>

        <div className={langue == "fr" ? "topEtapes" : "topEtapesAr"}>
          <h1>{HowItWorks.title}</h1> <br />
          <div id="etape" className="etape1" data-aos="fade-up">
            <div className="pattermHowItWork"></div>
            <span className="number-etape">01.</span>
            <div className="circleHowItWork"></div>
            <h3 className="title-etape">{HowItWorks.blogs.blog1} </h3>
          </div>
          <div id="etape" className="etape2" data-aos="fade-up">
            <div className="pattermHowItWork"></div>

            <span className="number-etape">02.</span>
            <div className="circleHowItWork"></div>
            <h3 className="title-etape">{HowItWorks.blogs.blog2}</h3>
          </div>
        </div>
      </div>

      <div className="bottomEtapes">
        <div className="etapes">
          <div id="etape" className="etape3" data-aos="fade-up">
            <div className="pattermHowItWork"></div>

            <span className="number-etape">03.</span>
            <div className="circleHowItWork"></div>
            <h3 className="title-etape">{HowItWorks.blogs.blog3}</h3>
          </div>

          <div id="etape" className="etape4" data-aos="fade-up">
            <div className="pattermHowItWork"></div>

            <span className="number-etape">04.</span>
            <div className="circleHowItWork"></div>
            <h3 className="title-etape">{HowItWorks.blogs.blog4}</h3>
          </div>

          <div id="etape" className="etape5" data-aos="fade-up">
            <div className="pattermHowItWork"></div>

            <span className="number-etape">05.</span>
            <div className="circleHowItWork"></div>
            <h3 className="title-etape">{HowItWorks.blogs.blog5} </h3>
          </div>
        </div>
        <div className="reveal">
          <img
            src="assets/WhyUs/how2.png"
            className="image-comment"
            id="Comment-image2"
          />
        <div className="patternHowITWorkReveal"></div>
        <div className="circleHowItWorkPattern"></div>
        </div>
      </div>
      <div className="TextHow" data-aos="zoom-in">
        <p>{HowItWorks.sous_title}</p>
        <Link to="/blogs">
          <button className="btnSeeMoreServices btnToBlogs">
            {HowItWorks.btn}
          </button>
        </Link>
      </div>
    </div>
  );
};
