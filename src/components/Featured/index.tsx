import React from "react";
import { titles } from "../../enum/titles";
import { anime } from "../../generated/jikan";
import { getFirstTitleOfType } from "../../helpers/title";

export interface FeaturedProps {
  featuredData: anime | undefined;
}

const Featured: React.FC<FeaturedProps> = ({ featuredData }) => {
  if (featuredData === undefined) {
    return null;
  }

  const defaultTitle = getFirstTitleOfType(
    featuredData.titles,
    titles.type.DEFAULT
  );

  return (
    <div className="featured">
      <img
        src={`${featuredData.images!.jpg!.large_image_url}`}
        alt="featured-background"
        className="featured-background "
      />
      <div className="featured-body">
        <h1>{`${defaultTitle.title}`}</h1>
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
