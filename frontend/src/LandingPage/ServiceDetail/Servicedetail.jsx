import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Servicedetail.css";
import { servicedata } from "./ServicesData";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { FormationCard } from "./FormationCard/FormationCard";
import { BottomService } from "./BottomService/BottomService";
import { LangueContext } from "../../Context/LangueContext";

export const Servicedetail = () => {
  const { id } = useParams();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (description, maxLength) => {
    if (!showFullDescription && description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  useEffect(() => {
    console.clear();

    gsap.registerPlugin(ScrollTrigger);

    const images = gsap.utils.toArray("#service-img");

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "none",
      },
      scrollTrigger: {
        end: () => `+=${images[0].offsetWidth * (images.length - 1)}`,
        pin: true,
        scrub: true,
        snap: {
          duration: { min: 0.1, max: 0.3 },
          snapTo: 1 / (images.length - 1),
        },
        trigger: ".parent-imagesService",
        start: "top 20%",
      },
    });

    images.slice(1).forEach((image) => {
      tl.to(image, { scale: 1 });
    });

    tl.to(
      images,
      {
        duration: images.length - 1,
        xPercent: -260 * (images.length - 1),
      },
      0
    );

    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        { opacity: 0.7 },
        {
          duration: 0.8,
          ease: "none",
          opacity: 1,
          scrollTrigger: {
            end: `${index * 20}%+=1 top`,
            start: `${index * 20 - 20}% top`,
            toggleActions: "play reverse play reverse",
            trigger: ".pin-spacer",
            start: "top 20%",
            end: "top 20%",
          },
        }
      );
    });
  }, []);


const { langue } = useContext(LangueContext)

let filteredServices = [];

Object.keys(servicedata).forEach(serviceKey => {
  const service = servicedata[serviceKey];
  const foundLang = service.langs.find(langObj => langObj.lang === langue);
  if (foundLang) {
    filteredServices.push(foundLang);
  }
});

const service = filteredServices.find(service => service.id == id);

  return (
    <div className="servicedetail">
      <div
        className="servicedetailheader"
        style={{
          width: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "50vh",
          opacity: 0.8,
          color: "white",
          backgroundImage: `
          repeating-linear-gradient(157.5deg, rgba(77,77,77, 0.07) 0px, rgba(77,77,77, 0.07) 0px,transparent 0px, transparent 1px,rgba(77,77,77, 0.07) 1px, rgba(77,77,77, 0.07) 4px,transparent 4px, transparent 5px,rgba(77,77,77, 0.07) 5px, rgba(77,77,77, 0.07) 8px),repeating-linear-gradient(90deg, rgba(77,77,77, 0.07) 0px, rgba(77,77,77, 0.07) 0px,transparent 0px, transparent 1px,rgba(77,77,77, 0.07) 1px, rgba(77,77,77, 0.07) 4px,transparent 4px, transparent 5px,rgba(77,77,77, 0.07) 5px, rgba(77,77,77, 0.07) 8px),linear-gradient(135deg, rgba(255,255,255, 0.34),rgb(232,69,30)), 
    url("/assets/bgServices/${service.cover}")
  `,
        }}
      >
            <h1 className="covertitle">{service.name}</h1>
      </div>

      <div className="servicedetailcontent">
        <div className="detail-top">
          <div className="left-detail">

            <p className="servicedetailtext">
              {truncateDescription(service.description, 172)}

              {!showFullDescription ? (
                <i
                  onClick={toggleDescription}
                  id="arrow"
                  className="bx bx-chevron-down"
                ></i>
              ) : (
                <i
                  onClick={toggleDescription}
                  id="arrow"
                  className="bx bx-chevron-up"
                ></i>
              )}
            </p>
            <div className="parent-imagesService">
              <div id="flex">
                <img
                  id="service-img"
                  className="service-img1"
                  src={`/assets/DetailService/${service.images[0]}.jpg`}
                  alt="service-Image"
                />
                <img
                  id="service-img"
                  className="service-img2"
                  src={`/assets/DetailService/${service.images[1]}.jpg`}
                  alt="service-Image"
                />
                <img
                  id="service-img"
                  className="service-img3"
                  src={`/assets/DetailService/${service.images[2]}.jpg`}
                  alt="service-Image"
                />
              </div>
            </div>
          </div>
          <div className="right-detail">
            {service.name === "KAFAAT"
              ? service.type.slice(0, 5).map((dep) => (
                  <div className="servicedetail-types" key={dep.title}>
                    <div className="title">
                      <div className="parent-icon">
                        <img
                          id="service-icon"
                          src={`/assets/DetailService/${dep.icon}.png`}
                          alt="service-Image"
                        />
                      </div>
                      <h4>{dep.title}</h4>
                    </div>
                    <p>{dep.content}</p>
                  </div>
                ))
              : service.type.slice(0, 6).map((dep) => (
                  <div className="servicedetail-types" key={dep.title}>
                    <div className="title">
                      <div className="parent-icon">
                        <img
                          id="service-icon"
                          src={`/assets/DetailService/${dep.icon}.png`}
                          alt="service-Image"
                        />
                      </div>
                      <h4>{dep.title}</h4>
                    </div>
                    <p>
                      <i className="bx bxs-info-circle"></i> {dep.content}
                    </p>
                  </div>
                ))}
          </div>
        </div>
        {service.id != 2 ? <BottomService /> : <FormationCard />}
      </div>
    </div>

  );
};
