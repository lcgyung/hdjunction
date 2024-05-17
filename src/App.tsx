import React, { useState } from "react";
import { Canvas, Tabs } from "./components";
import { TypesTabs } from "./typings/types";
import { IUseDrawShape } from "./typings/interfaces";

import * as S from "./styled";

const initShape = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  isDrawing: false,
};

const App: React.FC = () => {
  const [shapeType, setShapeType] = React.useState<TypesTabs>("");
  const [shapes, setShapes] = useState<IUseDrawShape[]>([]);
  const [currentShape, setCurrentShape] = useState<IUseDrawShape>(initShape);

  // const savedShapes = localStorage.getItem(shapeType);

  // useEffect(() => {
  //   if (savedShapes && !shapes?.length) {
  //     const loadedRects = JSON.parse(savedShapes);
  //     setShapes(loadedRects);
  //   }
  // }, [savedShapes, shapes]);

  const clearShapes = () => {
    // localStorage.removeItem("rectangles");
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
