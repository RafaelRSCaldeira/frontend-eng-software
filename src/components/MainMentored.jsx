import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import MainSection from "./MainSection";
import MentorList from "./MentorList";
import NavbarMentored from "./NavbarMentored";

function MainMentored() {

  return (
    <>
        <NavbarMentored />
        <MainSection />
        <MentorList />
    </>
  );
}

export default MainMentored;
