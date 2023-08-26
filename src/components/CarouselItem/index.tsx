import React, { MouseEvent } from "react";
import Cover from "../../assets/placeholders/cover-mockup_1.jpg";
import { anime } from "../../generated/jikan";

export interface CarouselItemProps {
  animeData: anime | undefined;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ animeData }) => {
  //TODO make a preview for anime's details
  const previewDetailPage = (e: MouseEvent<HTMLImageElement>) => {
    console.log(`${animeData?.title_english}`);
  };

  if (typeof animeData?.images?.jpg?.image_url === "string") {
    return (
      <img
        id={`${animeData.mal_id}`}
        key={animeData.mal_id}
        src={animeData.images.jpg.image_url}
        alt={animeData.title_english ?? ""}
        onMouseOver={previewDetailPage}
      />
    );
  } else {
    return (
      <img id="placeholder" key="placeholder" src={Cover} alt="placeholder" />
    );
  }
};

export default CarouselItem;
