import React from "react";
import "./VideoBackground.css";

const VideoBackground = () => (
  <video
    className="video-background"
    autoPlay
    loop
    muted
    playsInline
    src={require("../../media/espacio.mp4")}
  />
);

export default VideoBackground;
