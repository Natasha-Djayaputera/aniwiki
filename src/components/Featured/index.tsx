import React from "react";
import { anime } from "../../generated/jikan";

export interface FeaturedProps {
  featuredData: anime;
}

const Featured: React.FunctionComponent<FeaturedProps> = ({ featuredData }) => {
  return (
    <div className="featured">
      <img
        src={`${featuredData.images!.jpg!.large_image_url}`}
        alt="featured-background"
        className="featured-background "
      />
      <div className="featured-body">
        <h1>{`${featuredData.title_english}`}</h1>
        <p className="ellipsis-multiline">{`${featuredData.synopsis}`}</p>
        <a href={`/anime/${featuredData.mal_id}`}>
          <i className="fa-solid fa-circle-info more-info-icon"></i>More Info
        </a>
      </div>
      <div className="featured-bottom-border"></div>
    </div>
  );
};

export default Featured;
