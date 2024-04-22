import React from "react";
import "./Video.css";

const Video = () => {
  return (
    <div className="parentVideo" data-aos="fade-up">
      <div className="video">
        <video loop muted autoPlay playsInline>
          <source src="assets/video/V2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Video;
