import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import SignupSection from "./SignupSection";
import Contact from "./Contact";
import '../App.css'; 

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [HeroSection, FeaturesSection, TestimonialsSection, SignupSection, Contact]; // Ordem das seções

  useEffect(() => {
    const handleWheel = (event) => {
      // Evitar rolagem múltipla enquanto a transição estiver acontecendo
      if (event.deltaY > 0) {
        // Rolando para baixo (próxima seção)
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
        }
      } else {
        // Rolando para cima (seção anterior)
        if (currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection]);

  useEffect(() => {
    // Scroll para a seção atual com transição suave
    const sectionElement = document.getElementById(sections[currentSection].name);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentSection]);

  return (
    <div>
      <div id="HeroSection">
        <HeroSection />
      </div>
      <div id="FeaturesSection">
        <FeaturesSection />
      </div>
      <div id="TestimonialsSection">
        <TestimonialsSection />
      </div>
      <div id="SignupSection">
        <SignupSection />
      </div>
      <div id="Contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
