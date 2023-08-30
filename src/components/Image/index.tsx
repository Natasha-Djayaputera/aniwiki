import React, { MouseEvent } from "react";
import Cover from "../../assets/placeholders/cover-mockup_1.jpg";
import { anime } from "../../generated/jikan";

export interface ImageProps {
  animeData: anime | undefined;
  preview?: boolean;
}

const Image: React.FC<ImageProps> = ({ animeData, preview = false }) => {
  const showPreview = (e: MouseEvent<HTMLImageElement>) => {
    window.location.href = `/anime/${animeData?.mal_id}`;
  };

  if (typeof animeData?.images?.jpg?.image_url === "string") {
    return (
      <img
        id={`${animeData.mal_id}`}
        key={animeData.mal_id}
        src={animeData.images.jpg.image_url}
        alt={animeData.title_english ?? ""}
        onMouseDown={preview ? showPreview : undefined}
      />
    );
  } else {
    return (
      <img id="placeholder" key="placeholder" src={Cover} alt="placeholder" />
    );
  }
};

export default Image;
