import React, { useCallback } from "react";
import { IUseDrawShape } from "../../typings/interfaces";
import { TypesTabs } from "../../typings/types";

import * as S from "./styled";

interface IProps {
  shapeType: TypesTabs;
  shapes: IUseDrawShape[];
  currentShape: IUseDrawShape;
  setShapes: React.Dispatch<React.SetStateAction<IUseDrawShape[]>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<IUseDrawShape>>;
}

const Canvas: React.FC<IProps> = ({
  shapes,
  currentShape,
  setShapes,
  setCurrentShape,
}: IProps) => {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setCurrentShape({
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY,
      isDrawing: true,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!currentShape.isDrawing) return;
      setCurrentShape((prev) => ({
        ...prev,
        endX: e.clientX,
        endY: e.clientY,
      }));
    },
    [currentShape.isDrawing]
  );

  const handleMouseUp = useCallback(() => {
    if (!currentShape.isDrawing) return;
    setCurrentShape((prev) => {
      const newShapes = [...shapes, prev];
      // localStorage.setItem("rectangles", JSON.stringify(newRects));
      setShapes(newShapes);
      return {
        ...prev,
        isDrawing: false,
      };
    });
  }, [currentShape.isDrawing]);

  const getShapeStyle = (payload: IUseDrawShape) => {
    const { startX, startY, endX, endY } = payload;
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);

    return {
      position: "absolute" as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: "1px solid black",
    };
  };

  // const renderShapes = () => {
  //   return (
  //     <>
  //       {ellipses.map((ellipse, index) => (
  //         <div
  //           key={index}
  //           style={{
  //             position: "absolute",
  //             left: ellipse.x - ellipse.rx,
  //             top: ellipse.y - ellipse.ry,
  //             width: ellipse.rx * 2,
  //             height: ellipse.ry * 2,
  //             backgroundColor: "transparent",
  //             border: "1px solid black",
  //             borderRadius: "50%",
  //           }}
  //         />
  //       ))}
  //     </>
  //   );
  // };

  return (
    <S.Container
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {shapes?.map((rect, index) => (
        <div key={`${index}`} style={getShapeStyle(rect)} />
      ))}
      {currentShape?.isDrawing && <div style={getShapeStyle(currentShape)} />}
      {/* {currentEllipse && (
        <div
          style={{
            position: "absolute",
            left: currentEllipse.x - currentEllipse.rx,
            top: currentEllipse.y - currentEllipse.ry,
            width: currentEllipse.rx * 2,
            height: currentEllipse.ry * 2,
            border: "1px solid black",
            borderRadius: "50%",
            backgroundColor: "transparent",
          }}
        />
      )} */}
    </S.Container>
  );
};

export default Canvas;
