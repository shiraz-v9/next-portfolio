import Link from "next/link";
import { useState, useEffect } from "react";
import { Fade, Slide } from "react-awesome-reveal";
interface props {
  notionBlock: string;
  loop?: number;
  RenderJSON?: boolean;
  linkFormatting?: boolean;
  sessionSave?: boolean;
  sessionName?: string;
}
export function Fetch({
  notionBlock,
  loop,
  RenderJSON,
  linkFormatting,
  sessionSave,
  sessionName,
}: props) {
  const [notion, setNotion] = useState<null | []>(null);
  const [loading, setLoading] = useState(true);

  const doNotFetch = () => {
    if (sessionName !== undefined) {
      return sessionStorage.getItem(sessionName) !== undefined ? true : false;
    }
  };

  const saveToSS = (name: string, data: any) => {
    if (sessionStorage.getItem(name) == undefined) {
      sessionStorage.setItem(name, JSON.stringify(data));
    }
  };

  const getParsedData = () => {
    if (
      sessionName !== undefined &&
      sessionName !== null &&
      sessionStorage.getItem(sessionName) !== undefined &&
      sessionStorage.getItem(sessionName) !== null
    ) {
      return sessionStorage.getItem(sessionName);
    }
  };

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://notion-api-teal.vercel.app/getblock/${notionBlock}`,
      headers: {},
    };

    doNotFetch() === true
      ? (setNotion(JSON.parse(getParsedData())),
        setLoading(false),
        console.log("do not fetch running!", doNotFetch()))
      : axios(config)
          .then(function (response: any) {
            setNotion(response.data);
            console.log("axios runniong");

            sessionSave && sessionName
              ? saveToSS(sessionName, response.data)
              : null;
            setLoading(false);
          })
          .catch(function (error: any) {
            setNotion(error);
          });
  }, []);

  const notionRender = () => {
    if (notion.status <= 400) {
      return <p>server error</p>;
    } else if (RenderJSON === true) {
      const folders: any = [];
      var parsedObj: any[] = JSON.parse(
        notion.results[0].paragraph.text[0].plain_text
      );

      for (var key in parsedObj[0]) {
        folders.push(key);
      }

      return folders.map((folder: string, index: number) => {
        const ExtractSkills = ({ JSONkey }: any) => {
          return (
            <span className="d-flex flex-wrap flex-row">
              {parsedObj[0][JSONkey].map((x: string, num: number) => {
                return (
                  <p className="skills" key={num}>
                    {x}
                  </p>
                );
              })}
            </span>
          );
        };

        return (
          <div key={index}>
            <h5>{folder}</h5>
            <ExtractSkills JSONkey={folder} />
          </div>
        );
      });
    } else if (linkFormatting === true) {
      return (
        <a
          href={notion.results[0].code.text[0].plain_text}
          target="_blank"
          className="justLinks"
        >
          cv.pdf
        </a>
      );
    } else {
      var results = notion.results.map((res: any, index: number) => {
        return (
          <div key={index}>
            {res.paragraph.text[0].plain_text}
            <br />
          </div>
        );
      });
      return (
        <div>
          <Fade cascade triggerOnce>
            {results}
          </Fade>
        </div>
      );
    }
  };

  function fancySkeletonLoad() {
    switch (loop) {
      case 1:
        return (
          <div>
            <div className="skeleton appearance">
              <p className="skeletonTxt">Fetching from notion...</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="skeleton appearance"></div>
            <div className="skeleton appearance">
              <p className="skeletonTxt">Fetching from notion...</p>
            </div>
            <div className="skeleton appearance"></div>
          </div>
        );

      default:
        return (
          <div>
            <div className="skeleton appearance">
              <p className="skeletonTxt">Fetching from notion...</p>
            </div>
          </div>
        );
    }
  }

  return <div>{loading ? fancySkeletonLoad() : notionRender()}</div>;
}

export function Mywork() {
  return (
    <div className="d-flex flex-nowrap mb-3">
      <a href="https://github.com/shiraz-v9" className="justLinks mx-auto">
        See more on GitHub
      </a>
    </div>
  );
}

export function ListProjects() {
  interface workInt {
    React?: string[];
    React_Native?: string[];
    Back_end?: string[];
    PHP?: string[];
    JavaScript?: string[];
  }

  var works: any = [
    {
      React: [
        "HTML Tutor",
        "DSU Portal",
        "Tasks & Calendar",
        "Sneaker shop",
        "Spotify API",
        "e-Portfolio",
      ],
      React_Native: ["February Apps", "Coffi-da Reviews app"],

      Back_end: ["HTML Tutor backend", "Notion API", "Java Movies DB"],
      PHP: ["Games reviews PHP", "PHP Survey"],
      JavaScript: ["Local Mosque IOT", "Out Of The Loop game"],
    },
  ];

  const ExtractProjects = ({ JSONkey }: any) => {
    var proj = works[0][JSONkey].map((x: string, num: number) => {
      return (
        <Link key={num} className="btns" href={"/work/" + x}>
          {x}
        </Link>
      );
    });
    return <span className="d-flex flex-wrap flex-row">{proj}</span>;
  };

  const DropProjects = () => {
    var stack = [];

    for (var key in works[0]) {
      stack.push(key);
    }
    for (var i = 0; i < stack.length; i++) {
      var folders = stack.map((folder: string, index: number) => {
        return (
          <div key={index}>
            <h5>{folder}</h5>
            <ExtractProjects JSONkey={folder} />
          </div>
        );
      });
    }
    return <>{folders}</>;
  };

  return (
    <div className="coolBorders">
      <h1 className="h1Title">Work</h1>
      <DropProjects />
      <Mywork />
    </div>
  );
}

export function Skills() {
  return (
    <div className="coolBorders">
      <h1 className={`mb-3 h1Title`}>Technical Skills</h1>
      <Fetch notionBlock="19d18d7e46c340e498c2cea7a2199ff6" RenderJSON={true} />
    </div>
  );
}

export function Education() {
  var qualifications = [
    {
      title: "BSc Software Engineering",
      grade: "First Class Honours 🎓",
      uni: "Manchester Metropolitan University",
    },
    {
      title: "HNC Computing",
      grade: "Distinction 🎓",
      uni: "Salford City College",
    },
    {
      title: "L3 Computing & ICT",
      grade: "Pass 🎓",
      uni: "Salford City College",
    },
  ];

  var arr = qualifications.map((x, index) => {
    return (
      <p className="me-4" key={index}>
        {x.title} - {x.grade} <br />{" "}
        <span className="uniFontcolor">{x.uni}</span>
      </p>
    );
  });

  return (
    <div className="coolBorders">
      <h1 className="mb-3 h1Title">Achievements</h1>
      {arr}
      <h3 className="h1Title">Personal learning</h3>

      <div className="fetch mb-4">
        <Fetch notionBlock="56fea52db8b84262b6b3cdfa6ef3a34c" loop={3} />
      </div>
    </div>
  );
}

export function CV() {
  return (
    <div className="coolBorders">
      <h1 className="h1Title">CV</h1>
      <p className="me-4">CV can be downloaded at:</p>
      <Fetch
        notionBlock="a4e4d7e9c80b48508c5580d34369053b"
        linkFormatting={true}
      />
    </div>
  );
}

export function Contact({ auto }: any) {
  return (
    <div className="mb-3 coolBorders">
      <h1 className="mb-3 h1Title">Contact</h1>
      <p className="me-4 ">My contacts and socials! </p>
      <div className={`d-flex flex-row ${auto} my-3 me-3`}>
        <p>
          <a href="mailto:shiraz.xt@gmail.com" className="contactLinks">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
            </svg>
          </a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/shiraz-tauseef-42268a1a0/"
            className="contactLinks"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="navbar nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home
        </a>
      </div>
    </nav>
  );
}
