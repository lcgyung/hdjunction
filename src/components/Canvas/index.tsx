import React, { useRef } from "react";
import { IUseDrawShape } from "../../typings/interfaces";
import { TypesShape, TypesTabs } from "../../typings/types";

import * as S from "./styled";

interface IProps {
  tab: TypesTabs;
  shapeType: TypesShape;
  shapes: IUseDrawShape[];
  currentShape: IUseDrawShape;
  setShapes: React.Dispatch<React.SetStateAction<IUseDrawShape[]>>;
  setCurrentShape: React.Dispatch<React.SetStateAction<IUseDrawShape>>;
}

const Canvas: React.FC<IProps> = ({
  tab,
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
   * 도형 삭제, 도형 순서 변경
   * @param o
   */
  const handleClick = (o: IUseDrawShape) => {
    // 선택기능 : 도형 삭제
    if (tab === "delete") {
      const isDeleteShapeConfirm = confirm(
        "선택하신 도형을 삭제 하시겠습니까?"
      );
      if (isDeleteShapeConfirm) {
        const newShapes = shapes
          .filter((o1) => o1 !== o)
          .map((o1, index) => {
            return { ...o1, zIndex: index + 1 };
          });
        setShapes(newShapes);
      }
    }
    // 선택기능: 도형 표시 순서 변경
    else if (tab === "change") {
      const changeIndex = prompt(
        `변경하고자 하는 위치 순서 값을 입력해주세요.\n- 선택한 도형 인덱스 : (${o.zIndex})\n- 현재 인덱스를 제외한 다른 수\n- 선택 가능한 숫자 범위(1 ~ ${shapes.length})`
      );
      if (changeIndex && Number(changeIndex) <= shapes.length) {
        const { zIndex: originIndex } = o;
        const newArray: IUseDrawShape[] = JSON.parse(JSON.stringify(shapes));
        const originTargetIndex = newArray.findIndex(
          (o1) => o1.zIndex === Number(originIndex)
        );
        const changeTarget = newArray.find(
          (o1) => o1.zIndex === Number(changeIndex)
        );
        const changeTargetIndex = newArray.findIndex(
          (o1) => o1.zIndex === Number(changeIndex)
        );
        if (changeTarget && o) {
          newArray[originTargetIndex] = { ...o, zIndex: Number(changeIndex) };
          newArray[changeTargetIndex] = {
            ...changeTarget,
            zIndex: Number(originIndex),
          };
          setShapes(newArray);
        }
      }
    }
  };

  return (
    <S.Container
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {shapes?.map((shape, index) => (
        <S.ShapeItem
          $shapeType={shape.shapeType}
          $startX={shape.startX}
          $startY={shape.startY}
          $endX={shape.endX}
          $endY={shape.endY}
          $zIndex={shape.zIndex}
          key={`${index}`}
          onClick={() => handleClick(shape)}
        />
      ))}
      {currentShape?.isDrawing && (
        <S.ShapeItem
          $shapeType={shapeType}
          $startX={currentShape.startX}
          $startY={currentShape.startY}
          $endX={currentShape.endX}
          $endY={currentShape.endY}
          $zIndex={currentShape.zIndex}
        />
      )}
    </S.Container>
  );
};

export default Canvas;
