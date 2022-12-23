import { useState, useEffect } from "react";
import background from "../media/stars.png";

export default function ThemeSelector({ visibility }) {
  return <AdjustTheme visibility={visibility} />;
}

const setDark = () => {
  document.documentElement.style.setProperty("--font", "#FFFFFF");
  document.documentElement.style.setProperty("--background", "#202124");
  document.documentElement.style.setProperty(
    "--borderColor",
    "rgba(48, 49, 52, 0.3)"
  );
  document.documentElement.style.setProperty("--accentFont", "#aaaaaa");
  document.body.style.backgroundImage = `url(${background})`;
};

const setLight = () => {
  document.documentElement.style.setProperty("--font", "#000000");
  document.documentElement.style.setProperty("--background", "#f3f2ef");
  document.documentElement.style.setProperty("--borderColor", "#ffffff");
  document.documentElement.style.setProperty("--accentFont", "black");
  document.body.style.backgroundImage = `none`;
};

export function AdjustTheme({ visibility }) {
  const [theme, setTheme] = useState(undefined);
  const [button, setButton] = useState("light");

  const applyTheme = () => {
    if (
      localStorage.getItem("theme") !== undefined ||
      localStorage.getItem("theme") !== null
    ) {
      if (localStorage.getItem("theme") === "light") {
        setLight();
        setButton("dark");
      } else {
        setDark();
        setButton("light");
      }
    } else {
      setDark();
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme();
  }, [theme]);

  const toggler = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    if (button === "light") {
      setButton("dark");
    } else {
      setButton("light");
    }
  };
  const Adapt = () => {
    if (visibility === true) {
      return (
        <div className="themeDiv">
          <button className="theme" onClick={() => toggler()}>
            <p className="mt-1 mb-1">switch to {button}</p>
          </button>
        </div>
      );
    } else if (visibility === false) {
      return <div className="themeDiv"></div>;
    }
  };

  return;
}
