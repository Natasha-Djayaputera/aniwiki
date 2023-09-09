import React, { MouseEvent } from "react";
import { TitleType } from "../../enum/TitleType";
import { anime } from "../../generated/jikan";
import { validateNumberInput } from "../../helpers/number";
import { formatStringInput } from "../../helpers/string";
import { getFirstTitleOfType } from "../../helpers/title";
import { IMAGE_PLACEHOLDER_URL } from "../AnimeCharacterItem";

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
    onSelectItem?.(formatStringInput(validateNumberInput(animeData?.mal_id)));
  };

  const defaultTitle = getFirstTitleOfType(
    animeData?.titles,
    TitleType.DEFAULT
  );

  if (typeof animeData?.images?.jpg?.image_url !== "string") {
    return (
      <img
        id="placeholder"
        key="placeholder"
        src={IMAGE_PLACEHOLDER_URL}
        alt="placeholder"
      />
    );
  }

  return (
    <img
      id={`${animeData.mal_id}`}
      key={animeData.mal_id}
      src={animeData.images.jpg.image_url}
      alt={defaultTitle.title}
      title={defaultTitle.title}
      onMouseDown={preview ? showPreview : undefined}
    />
  );
};

export default AnimeImage;
