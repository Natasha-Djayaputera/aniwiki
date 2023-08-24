import React from "react";
import Background from "../../assets/placeholders/background.jpg";
import Carousel from "../Carousel";

const Page: React.FunctionComponent = () => {
  return (
    <main className="">
      <div className="featured">
        <img
          src={Background}
          alt="featured-background"
          className="background"
        />
        <div className="featured-body">
          <h3>Genre</h3>
          <h1>TOP AIRING ANIME TITLE</h1>
          <p>
            Nostrud laboris fugiat dolore voluptate excepteur consectetur veniam
            velit sit. Consectetur dolor ad quis consectetur fugiat id pariatur
            commodo sunt adipisicing pariatur eiusmod. Eu irure sunt do
            reprehenderit commodo ut magna est ad elit tempor.
          </p>
        </div>
        <div className="featured-bottom-border"></div>
      </div>
      <div className="content">
        <div className="content-item">
          <h3>Top Airing Anime</h3>
          <Carousel />
        </div>
        <div className="content-item">
          <h3>Current Season Anime</h3>
          <div className="carousel"></div>
        </div>
        <div className="content-item">
          <h3>Top Upcoming Anime</h3>
          <div className="carousel"></div>
        </div>
      </div>
    </main>
  );
};

export default Page;
