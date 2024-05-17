import React, { useState } from "react";
import { TypesShape, TypesTabs } from "../../typings/types";

import * as S from "./styled";

interface ITab {
  id: number;
  label: string;
  value: TypesTabs;
}

interface IProps {
  clearShapes: () => void;
  setShapeType: (value: React.SetStateAction<TypesShape>) => void;
}

const TABS: ITab[] = [
  { id: 1, label: "Box", value: "box" },
  { id: 2, label: "Circle", value: "circle" },
  { id: 3, label: "Clear", value: "clear" },
  { id: 4, label: "Delete", value: "delete" },
];

const Tabs: React.FC<IProps> = ({ setShapeType, clearShapes }: IProps) => {
  /**
   * States
   */

  const [activeTab, setActiveTab] = useState<number | null>(null);

  /**
   * Handlers
   */
  const handleClickTab = (o: ITab) => {
    const { id, value } = o;
    if (value === "box" || value === "circle") {
      setActiveTab(id);
    }
    switch (value) {
      case "box":
        setShapeType("box");
        break;
      case "circle":
        setShapeType("circle");
        break;
      default:
        setShapeType("");
        setActiveTab(null);
        clearShapes();
        break;
    }
  };

  return (
    <S.Container>
      {TABS?.map((o) => (
        <S.TabButton
          $isActive={activeTab === o.id}
          key={o.id}
          onClick={() => handleClickTab(o)}
        >
          {o.label}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

export default Tabs;
