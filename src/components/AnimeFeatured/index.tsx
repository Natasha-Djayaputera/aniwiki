import React from "react";
import { TitleType } from "../../enum/titles";
import { anime } from "../../generated/jikan";
import { getFirstTitleOfType } from "../../helpers/title";

export interface AnimeFeaturedProps {
  animeFeaturedData: anime | undefined;
}

const AnimeFeatured: React.FC<AnimeFeaturedProps> = ({ animeFeaturedData }) => {
  if (animeFeaturedData === undefined) {
    return null;
  }

  const defaultTitle = getFirstTitleOfType(
    animeFeaturedData.titles,
    TitleType.DEFAULT
  );

  return (
    <div className="featured">
      <img
        src={`${animeFeaturedData.images!.jpg!.large_image_url}`}
        alt="featured-background"
        className="featured-background "
      />
      <div className="featured-body">
        <h1>{`${defaultTitle.title}`}</h1>
        <p className="ellipsis-multiline">{`${animeFeaturedData.synopsis}`}</p>
        <a href={`/anime/${animeFeaturedData.mal_id}`}>
          <i className="fa-solid fa-circle-info more-info-icon"></i>More Info
        </a>
      </div>
      <div className="featured-bottom-border"></div>
    </div>
  );
};

export default AnimeFeatured;
