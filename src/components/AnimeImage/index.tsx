import React, { MouseEvent } from "react";
import Cover from "../../assets/placeholders/cover-mockup_1.jpg";
import { anime } from "../../generated/jikan";
import { validateNumberInput } from "../../helpers/number";
import { formatStringInput } from "../../helpers/string";

export interface AnimeImageProps {
  animeData: anime | undefined;
  preview?: boolean;
  onSelectItem?: (id: string) => void;
}

const AnimeImage: React.FC<AnimeImageProps> = ({
  animeData,
  preview = false,
  onSelectItem,
}) => {
  const showPreview = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    // navigate(`/?id=${animeData!.mal_id}`);
    onSelectItem?.(formatStringInput(validateNumberInput(animeData?.mal_id)));
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

export default AnimeImage;
