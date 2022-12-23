import Link from "next/link";
import { useRouter } from "next/router";
import Gallery from "../../components/gallery";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Projects = () => {
  const router = useRouter();
  const { project } = router.query;

  const FetchProject = () => {
    const router = useRouter();
    const { project } = router.query;
    const [notion, setNotion] = useState(undefined);
    const [filtered, setfiltered] = useState(undefined);
    var block = "44e4a7c1092e47388808691851330933";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      var config = {
        method: "get",
        url: `https://notion-api-teal.vercel.app/getblock/${block}`,
        headers: {},
      };

      axios(config)
        .then((response) => {
          var filteredArr = response.data.results.filter((proj) => {
            return proj.child_page.title === project;
          });

          filteredArr.length
            ? axios
                .get(
                  `https://notion-api-teal.vercel.app/getblock/${filteredArr[0].id}`
                )
                .then((children) => {
                  setNotion(children.data);
                  setLoading(false);
                })
                .catch((err) => {
                  setNotion(err);
                  setLoading(false);
                })
            : null;
        })
        .catch((error) => {
          setNotion(error);
        });
    }, []);

    const NotionRender = () => {
      if (notion.status <= 400) {
        return <p>server error</p>;
      }
      if (notion !== undefined && loading === false) {
        let image_array = JSON.parse(notion.results[0].code.text[0].plain_text);
        let text = notion.results[1].code.text[0].plain_text;

        function createMarkup() {
          return { __html: text };
        }

        return (
          <div>
            <div id="carousel" className="">
              <Link className="justLinks" href={"/"}>
                {"<--Back"}
              </Link>
              <Gallery img={image_array} />
            </div>
            <div
              id="about"
              className="coolBorders tb-Margins"
              dangerouslySetInnerHTML={createMarkup()}
            ></div>
          </div>
        );
      }
    };

    return loading === false ? (
      <NotionRender />
    ) : (
      <div className="spinner-border text-light mx-5" role="status"></div>
    );
  };

  return (
    <div>
      <h1 className="workTitle">{project}</h1>
      <FetchProject
        notionBlock={"44e4a7c1092e47388808691851330933"}
        project={project}
      />
    </div>
  );
};

export default Projects;
