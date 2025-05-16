import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import MentorList from "./MentorList";

function Main() {

  return (
    <>
        <Navbar />
        <MainSection />
        <MentorList />
    </>
  );
}

export default Main;
