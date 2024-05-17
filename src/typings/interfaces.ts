import { TypesShape } from "./types";

export interface IStringKeyAndValue {
  [key: string]: string;
}

export interface IUseDrawShape {
  shapeType: TypesShape;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isDrawing: boolean;
  zIndex: number;
}
