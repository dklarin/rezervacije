import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader-spinner"></div>
    <div className="loader-text">Učitavanje...</div>
  </div>
);

export default Loader;
