import React, { useState, useRef } from "react";
import Contact from "../components/Contact/Contact";
import Definition from "../components/Definition/Definition";
import Header from "../components/Header/Header";
import Introcuction from "../components/Introduction/Introduction";
import Reason from "../components/Reason/Reason";

const Home = () => {
  const [backgroundHeader, setBackgroundHeader] = useState("");
  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    if (scrollTop >= 720) {
      setBackgroundHeader("#3C6DCD");
    } else {
      setBackgroundHeader("");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <Header backgroundHeader={backgroundHeader} />
      <Introcuction />
      <Definition />
      <Reason />
      <Contact />
      <div className="home"></div>
    </>
  );
};

export default Home;
