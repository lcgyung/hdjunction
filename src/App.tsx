import React, { useEffect, useState } from "react";
import { Canvas, Tabs } from "./components";
import { TypesShape } from "./typings/types";
import { IUseDrawShape } from "./typings/interfaces";

import * as S from "./styled";

const CONSTANTS = {
  STORAGE_KEY_SAVED_SHAPES: "STORAGE_KEY_SAVED_SHAPES",
};

const initShape: IUseDrawShape = {
  isDrawing: false,
  shapeType: "",
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  zIndex: 0,
};

const App: React.FC = () => {
  const [shapeType, setShapeType] = React.useState<TypesShape>("");
  const [shapes, setShapes] = useState<IUseDrawShape[]>([]);
  const [currentShape, setCurrentShape] = useState<IUseDrawShape>(initShape);

  const savedShapes = localStorage.getItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES);

  useEffect(() => {
    if (savedShapes && !shapes?.length) {
      const loadedRects = JSON.parse(savedShapes);
      setShapes(loadedRects);
    }
  }, [savedShapes, shapes]);

  useEffect(() => {
    if (shapes?.length) {
      const savedNewShapes = JSON.stringify(shapes);
      localStorage.setItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES, savedNewShapes);
    }
  }, [shapes]);

  const clearShapes = () => {
    localStorage.removeItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES);
    setCurrentShape(initShape);
    setShapes([]);
  };

  return (
    <S.Container>
      <Tabs clearShapes={clearShapes} setShapeType={setShapeType} />
      <Canvas
        shapeType={shapeType}
        shapes={shapes}
        currentShape={currentShape}
        setShapes={setShapes}
        setCurrentShape={setCurrentShape}
      />
    </S.Container>
  );
};

export default App;
