import React, { useEffect, useState } from "react";
import { Canvas, Tabs } from "./components";
import { TypesTabs } from "./typings/types";
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
  const [tab, setTab] = React.useState<TypesTabs>("");
  const [shapes, setShapes] = useState<IUseDrawShape[]>([]);
  const [currentShape, setCurrentShape] = useState<IUseDrawShape>(initShape);

  useEffect(() => {
    const savedShapes = localStorage.getItem(
      CONSTANTS.STORAGE_KEY_SAVED_SHAPES
    );
    if (savedShapes) {
      const loadedRects = JSON.parse(savedShapes);
      setShapes(loadedRects);
    }
  }, []);

  useEffect(() => {
    if (shapes?.length) {
      const savedNewShapes = JSON.stringify(shapes);
      localStorage.setItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES, savedNewShapes);
    } else {
      localStorage.removeItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES);
    }
  }, [shapes]);

  const clearShapes = () => {
    localStorage.removeItem(CONSTANTS.STORAGE_KEY_SAVED_SHAPES);
    setCurrentShape(initShape);
    setShapes([]);
  };

  return (
    <S.Container>
      <Tabs handleClickClear={clearShapes} handleClickTab={setTab} />
      <Canvas
        tab={tab}
        shapes={shapes}
        currentShape={currentShape}
        setShapes={setShapes}
        setCurrentShape={setCurrentShape}
      />
    </S.Container>
  );
};

export default App;
