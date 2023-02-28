import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { MachineComponentType, NodeComponentstate } from "@/data/types";
import { useContext, useEffect, useState } from "react";
import { NodeComponentProps, NodeComponent } from "../../../types";
import {
  HandleBottom,
  HandleTop,
  MachineIcon,
  MachineWrapper,
} from "./subComponents";

/** a Component used by reactFlow to render the node */
export const Machine: NodeComponent = ({
  selected,
  data,
}: NodeComponentProps) => {
  const { zoom, selection } = useContext(graphContext) as GraphContext;
  const zoomLevel = zoom.deepZoomLayer;
  const isNodeRelated = selection.relatedNodes.includes(data.id);
  const [nodeState, setNodeState] = useState<NodeComponentstate>("inactive");

  const type: MachineComponentType =
    data.platform === "docker" ? "docker" : "classic";

  useEffect(
    () =>
      setNodeState(
        selected ? "selected" : isNodeRelated ? "related" : "inactive"
      ),
    [selected, isNodeRelated]
  );

  return (
    <MachineWrapper state={nodeState} type={type}>
      <HandleTop />
      <HandleBottom />
      {!zoomLevel && <MachineIcon state={nodeState} type={type} />}
    </MachineWrapper>
  );
};
