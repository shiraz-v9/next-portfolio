import React from "react";

import Image from "next/image";
import { Inter } from "@next/font/google";
const inter = Inter();

import { useState, useEffect } from "react";
import {
  ListProjects,
  Skills,
  Education,
  CV,
  Contact,
  Fetch,
} from "../components/functions";
import LandingPics from "../components/landingPics";
import { saveData, getTime } from "./notion";

const Homepage = () => {
  const [fontSize, setFontSize] = useState({});
  const [justify, setJustify] = useState("");
  var style = {
    marginTop: window.innerHeight / 2 - 100,
    marginBottom: window.innerHeight / 2 - 100,
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 420) {
        setFontSize({ fontSize: 30 });
        setJustify("justify-content-evenly");
      } else {
        setFontSize({ fontSize: 40 });
        setJustify("justify-content-start");
      }
    }

    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(function persistForm() {
    if (sessionStorage.getItem("accessed") == undefined) {
      sessionStorage.setItem("accessed", `${getTime()}`);
      saveData();
    }
  });
  return (
    <>
      <div className={inter.className}>
        <div
          style={style}
          className="d-flex flex-column align-items-center intro"
        >
          <div className="name mb-4" style={fontSize}>
            <Fetch
              notionBlock="cdc47159b76744a19cdba0166ee0153d"
              loop={1}
              sessionName="name"
              sessionSave={true}
            />
          </div>
          <div className="fetch mb-4 mx-3">
            <Fetch
              notionBlock="914037e1fa8d497c8b153c972eed593e"
              loop={3}
              sessionName="intro"
              sessionSave={true}
            />
          </div>
          <div />
          {/* <LandingPics /> */}

          <svg
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-arrow-down-circle arrow"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
            />
          </svg>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <section id="sectionL">
            <ListProjects />

            <Skills />

            <Education />

            <CV />

            <Contact auto={justify} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Homepage;
