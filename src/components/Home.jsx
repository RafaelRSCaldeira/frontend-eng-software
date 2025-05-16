import React, { useEffect, useState, useRef } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import SignupSection from "./SignupSection";
import Contact from "./Contact";
import '../App.css';

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [HeroSection, FeaturesSection, TestimonialsSection, SignupSection, Contact];

  const isScrollingRef = useRef(false); // Evita scrolls repetidos

  useEffect(() => {
    const handleWheel = (event) => {
      // Limita rolagens sucessivas
      if (isScrollingRef.current) return;

      const threshold = 0;
      if (Math.abs(event.deltaY) < threshold) return;

      isScrollingRef.current = true;

      if (event.deltaY > 0) {
        // Scroll para baixo
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
        }
      } else {
        // Scroll para cima
        if (currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
        }
      }

      // Tempo de espera antes de permitir novo scroll
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 200); // ajuste conforme necessário
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection]);

  useEffect(() => {
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
