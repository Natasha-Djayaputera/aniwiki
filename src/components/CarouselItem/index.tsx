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
  const openDetailPage = (e: MouseEvent<HTMLImageElement>) => {
    console.log("animeId");
  };

  return (
    <img
      id={animeId}
      key={animeId}
      src={src}
      alt={alt}
      onMouseOver={openDetailPage}
    ></img>
  );
};

export default CarouselItem;
