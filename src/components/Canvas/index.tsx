import React, { useRef } from "react";
import { IUseDrawShape } from "../../typings/interfaces";
import { TypesShape } from "../../typings/types";

import * as S from "./styled";

interface IProps {
  shapeType: TypesShape;
  shapes: IUseDrawShape[];
  currentShape: IUseDrawShape;
  setShapes: React.Dispatch<React.SetStateAction<IUseDrawShape[]>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<IUseDrawShape>>;
}

const Canvas: React.FC<IProps> = ({
  shapeType,
  shapes,
  currentShape,
  setShapes,
  setCurrentShape,
}: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 도형 시작 좌표 지정 / 도형 타입 선정
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!shapeType) {
      return;
    }
    setCurrentShape({
      isDrawing: true,
      zIndex: 0,
      shapeType,
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY,
    });
  };

  /**
   * 도형 끝 좌표 지정
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!currentShape.isDrawing) {
      return;
    }
    setCurrentShape((prev) => ({
      ...prev,
      endX: e.clientX,
      endY: e.clientY,
    }));
  };

  /**
   * 캔버스 내 도형 좌표 지정
   */
  const handleMouseUp = () => {
    if (!containerRef.current || !currentShape.isDrawing) {
      return;
    }
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const { startX, startY, endX, endY } = currentShape;
      const shapeArea = {
        left: Math.min(startX, endX),
        right: Math.max(startX, endX),
        top: Math.min(startY, endY),
        bottom: Math.max(startY, endY),
      };
      const isInnerContainer =
        shapeArea.left >= containerRect.left &&
        shapeArea.right <= containerRect.right &&
        shapeArea.top >= containerRect.top &&
        shapeArea.bottom <= containerRect.bottom;
      if (isInnerContainer) {
        setShapes((prevShapes) => {
          const zIndex = prevShapes.length + 1;
          const newShape = { ...currentShape, zIndex };
          const newShapes = [...prevShapes, newShape];
          return newShapes;
        });
      }
    }
    setCurrentShape((prev) => ({
      ...prev,
      isDrawing: false,
    }));
  };

  /**
   * 도형 그리기
   * @param payload 도형 좌표
   * @returns 도형 스타일
   */
  const getShapeStyle = (payload: IUseDrawShape) => {
    const { shapeType: type, startX, startY, endX, endY, zIndex } = payload;
    let left = 0;
    let top = 0;
    let width = 0;
    let height = 0;

    // Circle
    if (type === "circle") {
      const centerX = (startX + endX) / 2;
      const centerY = (startY + endY) / 2;
      const radius =
        Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / 2;

      left = centerX - radius;
      top = centerY - radius;
      width = 2 * radius;
      height = 2 * radius;
    }
    // Box
    else if (type === "box") {
      left = Math.min(startX, endX);
      top = Math.min(startY, endY);
      width = Math.abs(startX - endX);
      height = Math.abs(startY - endY);
    }

    const borderRadius = type === "circle" ? "50%" : "none";

    return {
      zIndex,
      borderRadius,
      border: "1px solid black",
      position: "absolute" as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <S.Container
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {shapes?.map((shape, index) => (
        <div key={`${index}`} style={getShapeStyle(shape)} />
      ))}
      {currentShape?.isDrawing && <div style={getShapeStyle(currentShape)} />}
    </S.Container>
  );
};

export default Canvas;
