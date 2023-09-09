import React, { TouchEvent, useRef, useState } from "react";
import { anime } from "../../generated/jikan";
import { useFlipFlop } from "../../hooks/useFlipFlop";
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
  const [isDragStarted, startDrag, stopDrag] = useFlipFlop(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);

  const dragStart = (e: TouchEvent<HTMLDivElement>): void => {
    // updating global variables value on mouse down event
    startDrag();
    setPrevPageX(e.changedTouches[0].pageX);
    setPrevScrollLeft(e.currentTarget.scrollLeft);
  };

  const dragging = (e: TouchEvent<HTMLDivElement>): void => {
    // scrolling images/carousel to the left according to the mouse pointer
    if (!isDragStarted) return;
    e.preventDefault();
    const positionDiff = e.changedTouches[0].pageX - prevPageX;
    const target = animeCarouselRef.current;
    if (target) {
      target.scrollLeft = prevScrollLeft - positionDiff;
    }
  };

  const slide = (direction: "left" | "right") => () => {
    const target = animeCarouselRef.current;
    if (target) {
      target.scrollLeft += target.offsetWidth * (direction === "left" ? -1 : 1);
    }
  };

  const carouselItemMap = animesData.map((currentCarouselItem) => {
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
      <div className="slider" onClick={slide("left")}>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div
        className={`carousel ${isDragStarted ? "dragging" : ""}`}
        ref={animeCarouselRef}
        onTouchStart={dragStart}
        onTouchMove={dragging}
        onTouchEnd={stopDrag}
      >
        {carouselItemMap}
      </div>
      <div className="slider" onClick={slide("right")}>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default AnimeCarousel;
