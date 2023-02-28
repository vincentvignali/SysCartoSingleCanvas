import { FC, useContext } from "react";
import styled from "@slicknode/stylemapper";
import {
  actionBarToggledStyle,
  actionBarStyle,
  lockButtonStyle,
  lockButtonToggledStyle,
  miniArrowStyle,
  layoutButtonStyle,
} from "@/style/style";
import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { elkLayout } from "@/layout/elk";
import { arrowSVG, LayoutIconSVG, lockerIconSVG } from "@/assets/icones";
import { useReactFlow } from "reactflow";

/* ==== ActionBar Asset === */

/* ==== ActionBar Custom subComponents === */
/** === */
interface lockerProps {
  fixBar: boolean;
  handleFixBar: (value: boolean) => void;
  className?: string;
}
const locker: FC<lockerProps> = ({ fixBar, handleFixBar, className }) => {
  return (
    <button className={className} onClick={() => handleFixBar(!fixBar)}>
      {" "}
      {fixBar ? lockerIconSVG.lock : lockerIconSVG.unlock}
    </button>
  );
};

/** === */
interface layoutButtonProps {
  type: string;
  className?: string;
}
const layoutButton: FC<layoutButtonProps> = ({ type, className }) => {
  const reactFlowInstance = useReactFlow();
  const { graph, setters } = useContext(graphContext) as GraphContext;
  const nodes = graph.nodes;
  const edges = graph.edges;
  const setNodes = setters.setNodes;
  const setlayoutState = setters.setLayoutState;

  return (
    <button
      className={className}
      onClick={() =>
        elkLayout[type](reactFlowInstance).then(() => setlayoutState(`${type}`))
      }
    >
      {LayoutIconSVG[type]}
    </button>
  );
};

/** === */
interface arrowProps {
  className?: string;
}
const arrow: FC<arrowProps> = ({ className }) => {
  return (
    <div id="arrow" className={className}>
      {arrowSVG}
    </div>
  );
};

/* ==== ActionBar styled subComponents  === */
export const ActionBarWrapper = styled("div", actionBarStyle, {
  variants: {
    fixed: {
      true: actionBarToggledStyle,
      false: "",
    },
  },
});
export const LockButton = styled(locker, lockButtonStyle, {
  variants: {
    fixBar: {
      true: lockButtonToggledStyle,
      false: "",
    },
  },
  forwardProps: ["fixBar"],
});
export const LayoutButton = styled(layoutButton, layoutButtonStyle);
export const Arrow = styled(arrow, miniArrowStyle);
