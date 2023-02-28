import { FC, useState } from "react";
import { Graph } from "@/data/types";
import {
  ActionBarWrapper,
  LockButton,
  LayoutButton,
  Arrow,
} from "./subComponents";

interface ActionBarProps {}

/** 
  This Component allow user to triggers different actions in the Canvas.
  i.e. : Layout buttons
*/
const ActionBar: FC<ActionBarProps> = () => {
  const [fixBar, setFixBar] = useState(true);
  const handleFixBar = (value: boolean) => {
    setFixBar(value);
  };

  return (
    <ActionBarWrapper fixed={fixBar}>
      <LockButton fixBar={fixBar} handleFixBar={handleFixBar} />
      <LayoutButton type="box" />
      <LayoutButton type="force" />
      <Arrow />
    </ActionBarWrapper>
  );
};

export default ActionBar;
