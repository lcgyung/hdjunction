import styled from "styled-components";
import { TypesShape } from "../../typings/types";

interface IPropShapeItem {
  $shapeType: TypesShape;
  $startX: number;
  $startY: number;
  $endX: number;
  $endY: number;
  $zIndex: number;
}

const createRadius = (
  $startX: number,
  $startY: number,
  $endX: number,
  endY: number
) => {
  return (
    Math.sqrt(Math.pow($endX - $startX, 2) + Math.pow(endY - $startY, 2)) / 2
  );
};

export const Container = styled.div`
  border: 1px solid black;
  width: 800px;
  height: 600px;
  margin-top: 10px;
  overflow: hidden;
`;

export const ShapeItem = styled.div<IPropShapeItem>`
  ${({ $shapeType, $startX, $startY, $endX, $endY, $zIndex }) => {
    if ($shapeType === "circle") {
      return `
      position: absolute;
      z-index: ${$zIndex};
      border-radius: 50%;
      border: 1px solid black;
      left: ${
        ($startX + $endX) / 2 - createRadius($startX, $startY, $endX, $endY)
      }px;
      top: ${
        ($startY + $endY) / 2 - createRadius($startX, $startY, $endX, $endY)
      }px;
      width: ${2 * createRadius($startX, $startY, $endX, $endY)}px;
      height: ${2 * createRadius($startX, $startY, $endX, $endY)}px;
  `;
    } else if ($shapeType === "box") {
      return `
      position: absolute;
      z-index: ${$zIndex};
      border: 1px solid black;
      left: ${Math.min($startX, $endX)}px;
      top: ${Math.min($startY, $endY)}px;
      width: ${Math.abs($startX - $endX)}px;
      height: ${Math.abs($startY - $endY)}px;
    `;
    }
  }}
`;
