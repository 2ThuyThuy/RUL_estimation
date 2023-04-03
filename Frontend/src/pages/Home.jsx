import React, { useState } from "react";
import Header from "../components/Header/Header";
import Introcuction from "../components/Introduction/Introduction";

const Home = () => {
  const [backgroundHeader, setBackgroundHeader] = useState("");
  return (
    <>
      <Header backgroundHeader={backgroundHeader} />
      <Introcuction />
      <div className="home"></div>
    </>
  );
};

export default Home;
