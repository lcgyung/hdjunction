import React, { useState } from "react";
import { TypesTabs } from "../../typings/types";

import * as S from "./styled";

interface ITab {
  id: number;
  label: string;
  value: TypesTabs;
}

interface IProps {
  handleClickClear: () => void;
  handleClickTab: (value: React.SetStateAction<TypesTabs>) => void;
}

const TABS: ITab[] = [
  { id: 1, label: "Box", value: "box" },
  { id: 2, label: "Circle", value: "circle" },
  { id: 3, label: "Clear", value: "clear" },
  { id: 4, label: "Delete", value: "delete" },
  { id: 5, label: "Change index", value: "change" },
];

const Tabs: React.FC<IProps> = ({
  handleClickClear,
  handleClickTab,
}: IProps) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const handleClickButton = (o: ITab) => {
    const { id, value } = o;
    switch (value) {
      case "clear":
        setActiveTab(null);
        handleClickTab("");
        handleClickClear();
        break;
      default:
        setActiveTab(id);
        handleClickTab(value);
        break;
    }
  };

  return (
    <S.Container>
      {TABS?.map((o) => (
        <S.TabButton
          $isActive={activeTab === o.id}
          key={o.id}
          onClick={() => handleClickButton(o)}
        >
          {o.label}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

export default Tabs;
