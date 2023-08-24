import React, { MouseEvent } from "react";

export interface CarouselItemProps {
  animeId: string;
  src: string;
  alt: string;
}

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  animeId,
  src,
  alt,
}) => {
  //TODO make a preview for anime's details
  const previewDetailPage = (e: MouseEvent<HTMLImageElement>) => {
    console.log("animeId");
  };

  return (
    <img
      id={animeId}
      key={animeId}
      src={src}
      alt={alt}
      onMouseOver={previewDetailPage}
    ></img>
  );
};

export default CarouselItem;
