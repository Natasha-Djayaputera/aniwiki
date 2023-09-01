import React, { MouseEvent, TouchEvent, useRef, useState } from "react";
import { anime } from "../../generated/jikan";
import AnimeImage from "../AnimeImage";

export interface AnimeCarouselProps {
  animesData: anime[] | undefined;
  onSelectItem?: (id: string) => void;
}

const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  animesData = [],
  onSelectItem,
}) => {
  const animeCarouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragStart, setIsDragStart] = useState<boolean>(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);

  const dragStart = (e: TouchEvent<HTMLDivElement>): void => {
    // updating global variables value on mouse down event
    setIsDragStart(true);
    setPrevPageX(e.changedTouches[0].pageX);
    setPrevScrollLeft(e.currentTarget.scrollLeft);
  };

  const dragging = (e: TouchEvent<HTMLDivElement>): void => {
    // scrolling images/carousel to the left according to the mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    const positionDiff = e.changedTouches[0].pageX - prevPageX;
    const target = animeCarouselRef.current;
    if (target) {
      target.scrollLeft = prevScrollLeft - positionDiff;
    }
  };

  const dragStop = (): void => {
    setIsDragStart(false);
  };

  const slideLeft = (e: MouseEvent<HTMLDivElement>) => {
    const target = animeCarouselRef.current;
    if (target) {
      target.scrollLeft += -target.offsetWidth;
    }
  };

  const slideRight = (e: MouseEvent<HTMLDivElement>) => {
    const target = animeCarouselRef.current;
    if (target) {
      target.scrollLeft += target.offsetWidth;
    }
  };

  const carouselItemMap = animesData.map((carouselItem) => {
    let currentCarouselItem = carouselItem;
    return (
      <AnimeImage
        key={currentCarouselItem.mal_id}
        animeData={currentCarouselItem}
        onSelectItem={onSelectItem}
        preview
      />
    );
  });

  return (
    <div className="wrapper">
      <div className="slider" onClick={slideLeft}>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div
        className={`carousel ${isDragStart ? "dragging" : ""}`}
        ref={animeCarouselRef}
        onTouchStart={dragStart}
        onTouchMove={dragging}
        onTouchEnd={dragStop}
      >
        {carouselItemMap}
      </div>
      <div className="slider" onClick={slideRight}>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default AnimeCarousel;
