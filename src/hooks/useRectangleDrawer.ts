import { useState, useCallback, useEffect } from "react";

interface UseDrawRect {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isDrawing: boolean;
}

const initRectangle = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  isDrawing: false,
};

const useRectangleDrawer = () => {
  const savedRects = localStorage.getItem("rectangles");
  const [rectangles, setRectangles] = useState<UseDrawRect[]>([]);
  const [currentRectangle, setCurrentRectangle] =
    useState<UseDrawRect>(initRectangle);

  useEffect(() => {
    if (savedRects && !rectangles?.length) {
      const loadedRects = JSON.parse(savedRects);
      setRectangles(loadedRects);
    }
  }, [savedRects, rectangles]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setCurrentRectangle({
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY,
      isDrawing: true,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!currentRectangle.isDrawing) return;
      setCurrentRectangle((prev) => ({
        ...prev,
        endX: e.clientX,
        endY: e.clientY,
      }));
    },
    [currentRectangle.isDrawing]
  );

  const handleMouseUp = useCallback(() => {
    if (!currentRectangle.isDrawing) return;
    setCurrentRectangle((prev) => {
      const newRects = [...rectangles, prev];
      localStorage.setItem("rectangles", JSON.stringify(newRects));
      setRectangles(newRects);
      return {
        ...prev,
        isDrawing: false,
      };
    });
  }, [currentRectangle.isDrawing]);

  const getRectStyle = (payload: UseDrawRect) => {
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

  const clearRects = () => {
    localStorage.removeItem("rectangles");
    setCurrentRectangle(initRectangle);
    setRectangles([]);
  };

  return {
    rectangles,
    currentRectangle,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getRectStyle,
    clearRects,
    isDrawing: currentRectangle.isDrawing,
  };
};

export default useRectangleDrawer;
