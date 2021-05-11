import React from "react";
import { useTranslation } from "react-i18next";
import { YOUTUBE_HOME_PAGE } from "help/constants";

function CoverHeader({ title, coverPhoto }) {
  let pageHeader = React.createRef();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        if (pageHeader.current) {
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        }
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header vlog-header-cover">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${coverPhoto})`,
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <div className="row">
            <div className="col-sm-6 vlog-right-block">
              <div className="vlog-right-block--title">
                {t("vlogsQuestionTitle")}
              </div>
              {t("vlogsDescription")}
              <div>
                <img
                  src={require("assets/img/icons/youtube.png")}
                  alt="youtube"
                  className="youtube-cover-icon"
                  onClick={() => window.open(YOUTUBE_HOME_PAGE, "_blank")}
                />
              </div>
            </div>
            <div className="col-sm-6 vlog-left-block">
              <img
                src={require("assets/img/vlog-laptop.png")}
                alt="vlog-cover"
                className="vlog-left-block--image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoverHeader;
