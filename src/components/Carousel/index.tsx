import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { AnimeData } from "../../services/jikanService";
import CarouselItem from "../CarouselItem";

export interface CarouselProps {
  itemData: AnimeData[] | null;
}

const Carousel: React.FunctionComponent<CarouselProps> = ({ itemData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDragStart, setIsDragStart] = useState<boolean>(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);
  const [carouselItemData, setCarouselItemData] = useState<AnimeData[]>([]);

  useEffect(() => {
    if (itemData) {
      setCarouselItemData(itemData);
    }
  }, [itemData]);

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

  const mapCarouselItem = carouselItemData!
    .slice(0, carouselItemData!.length)
    .map((carouselItem) => {
      let currentCarouselItem = carouselItem;
      return <CarouselItem animeData={currentCarouselItem} />;
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
        {carouselItemData && mapCarouselItem}
      </div>
      <div className="slider" onClick={slideRight}>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
