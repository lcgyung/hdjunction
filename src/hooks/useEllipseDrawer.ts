import { useState, useCallback, useEffect } from "react";

interface Ellipse {
  x: number;
  y: number;
  rx: number;
  ry: number;
}

const useEllipseDrawer = () => {
  const savedElipses = localStorage.getItem("ellipses");
  const [ellipses, setEllipses] = useState<Ellipse[]>([]);
  const [currentEllipse, setCurrentEllipse] = useState<Ellipse | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (savedElipses && !ellipses?.length) {
      const loadedElipses = JSON.parse(savedElipses);
      setEllipses(loadedElipses);
    }
  }, [savedElipses, ellipses]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setCurrentEllipse({ x, y, rx: 0, ry: 0 });
    setIsDrawing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentEllipse) {
      const newEllipses = [...ellipses, currentEllipse];
      localStorage.setItem("ellipses", JSON.stringify(newEllipses));
      setEllipses(newEllipses);
      setIsDrawing(false);
      setCurrentEllipse(null);
    }
  }, [isDrawing, currentEllipse, ellipses]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing || !currentEllipse) return;

      const x = e.clientX;
      const y = e.clientY;
      const rx = Math.abs(x - currentEllipse.x);
      const ry = Math.abs(y - currentEllipse.y);

      setCurrentEllipse({
        ...currentEllipse,
        rx,
        ry,
        x: currentEllipse.x,
        y: currentEllipse.y,
      });
    },
    [isDrawing, currentEllipse]
  );

  const clearEllipses = () => {
    localStorage.removeItem("ellipses");
    setCurrentEllipse(null);
    setEllipses([]);
  };

  return {
    ellipses,
    currentEllipse,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    clearEllipses,
  };
};

export default useEllipseDrawer;
