import React from "react";
import './Video.css';

const Video = () => {
    // ependency array means this effect runs once on mount

    return (
        <div className="parentvideo">


        <div className="video">
            <video
                loop
                muted
                autoPlay
                playsInline
            >
                <source src="assets/video/V2.mp4" type="video/mp4" />
            </video>
            {/* <div class="containerv">
                <div class="circlev"></div>
            </div> */}


        </div>
        </div>
    )
};

export default Video;
