import React, { useState } from "react";
import { useEllipseDrawer, useRectangleDrawer } from "./hooks";

interface ITab {
  id: number;
  label: string;
}

const TABS = [
  { id: 1, label: "Box" },
  { id: 2, label: "Circle" },
  { id: 3, label: "Clear" },
];

const ShapeDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const {
    rectangles,
    currentRectangle,
    getRectStyle,
    clearRects,
    handleMouseDown: handleRectMouseDown,
    handleMouseUp: handleRectMouseUp,
    handleMouseMove: handleRectMouseMove,
  } = useRectangleDrawer();

  const {
    ellipses,
    currentEllipse,
    clearEllipses,
    handleMouseDown: handleEllipseMouseDown,
    handleMouseUp: handleEllipseMouseUp,
    handleMouseMove: handleEllipseMouseMove,
  } = useEllipseDrawer();

  const [shapeType, setShapeType] = React.useState<"rectangle" | "ellipse">(
    "rectangle"
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (shapeType === "rectangle") {
      handleRectMouseDown(e);
    } else {
      handleEllipseMouseDown(e);
    }
  };

  const handleMouseUp = () => {
    if (shapeType === "rectangle") {
      handleRectMouseUp();
    } else {
      handleEllipseMouseUp();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shapeType === "rectangle") {
      handleRectMouseMove(e);
    } else {
      handleEllipseMouseMove(e);
    }
  };

  const handleClickTab = (o: ITab) => {
    const { id, label } = o;
    if (label === "Box" || label === "Circle") {
      setActiveTab(id);
    }
    switch (label) {
      case "Box":
        setShapeType("rectangle");
        break;
      case "Circle":
        setShapeType("ellipse");
        break;
      default:
        clearEllipses();
        clearRects();
        setActiveTab(null);
        break;
    }
  };

  const renderShapes = () => {
    return (
      <>
        {rectangles.map((rect, index) => (
          <div key={`${index}`} style={getRectStyle(rect)} />
        ))}
        {ellipses.map((ellipse, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: ellipse.x - ellipse.rx,
              top: ellipse.y - ellipse.ry,
              width: ellipse.rx * 2,
              height: ellipse.ry * 2,
              backgroundColor: "transparent",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "150px",
          justifyContent: "space-between",
        }}
      >
        {TABS.map((o) => (
          <button
            key={o.id}
            style={{ fontWeight: activeTab === o.id ? "bold" : "normal" }}
            onClick={() => handleClickTab(o)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          border: "1px solid black",
          marginTop: "10px",
          overflow: "hidden",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {renderShapes()}
        {currentRectangle?.isDrawing && (
          <div style={getRectStyle(currentRectangle)} />
        )}
        {currentEllipse && (
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
        )}
      </div>
    </div>
  );
};

export default ShapeDrawer;
