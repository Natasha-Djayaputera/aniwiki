import React, { MouseEvent } from "react";
import Cover from "../../assets/placeholders/cover-mockup_1.jpg";
import { AnimeData } from "../../services/jikanService";

export interface CarouselItemProps {
  animeData: AnimeData | null;
}

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  animeData,
}) => {
  //TODO make a preview for anime's details
  const previewDetailPage = (e: MouseEvent<HTMLImageElement>) => {
    console.log(`${animeData?.title_english}`);
  };

  if (animeData) {
    return (
      <img
        id={`${animeData.mal_id}`}
        key={animeData.mal_id}
        src={animeData.images.jpg.image_url}
        alt={animeData.title_english}
        onMouseOver={previewDetailPage}
      ></img>
    );
  } else {
    return (
      <img
        id="placeholder"
        key="placeholder"
        src={Cover}
        alt="placeholder"
      ></img>
    );
  }
};

export default CarouselItem;
