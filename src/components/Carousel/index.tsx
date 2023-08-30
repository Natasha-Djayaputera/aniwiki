import React, { MouseEvent, useRef, useState } from "react";
import { anime } from "../../generated/jikan";
import Image from "../Image";

export interface CarouselProps {
  itemData: anime[] | undefined;
}

const Carousel: React.FC<CarouselProps> = ({
  itemData: carouselItemData = [],
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragStart, setIsDragStart] = useState<boolean>(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);

  const dragStart = (e: MouseEvent<HTMLDivElement>): void => {
    // updating global variables value on mouse down event
    setIsDragStart(true);
    setPrevPageX(e.pageX);
    setPrevScrollLeft(e.currentTarget.scrollLeft);
  };

  const dragging = (e: MouseEvent<HTMLDivElement>): void => {
    // scrolling images/carousel to the left according to the mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    const positionDiff = e.pageX - prevPageX;
    const target = carouselRef.current;
    if (target) {
      target.scrollLeft = prevScrollLeft - positionDiff;
    }
  };

  const dragStop = (): void => {
    setIsDragStart(false);
  };

  const slideLeft = (e: MouseEvent<HTMLDivElement>) => {
    const target = carouselRef.current;
    if (target) {
      target.scrollLeft += -target.offsetWidth;
    }
  };

  const slideRight = (e: MouseEvent<HTMLDivElement>) => {
    const target = carouselRef.current;
    if (target) {
      target.scrollLeft += target.offsetWidth;
    }
  };

  const carouselItemMap = carouselItemData.map((carouselItem) => {
    let currentCarouselItem = carouselItem;
    return (
      <Image
        key={currentCarouselItem.mal_id}
        animeData={currentCarouselItem}
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
        ref={carouselRef}
        onMouseDown={dragStart}
        onMouseMove={dragging}
        onMouseUp={dragStop}
      >
        {carouselItemMap}
      </div>
      <div className="slider" onClick={slideRight}>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
