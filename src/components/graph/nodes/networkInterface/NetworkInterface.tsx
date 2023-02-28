import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { NodeComponentstate } from "@/data/types";
import { useContext, useEffect, useState } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { NodeComponentProps, NodeComponent } from "../../../types";
import { HandleBottom, HandleTop, NiIcon, NiWrapper } from "./subComponents";

/** A Component used by reactFlow to render the node. Is set to hidden : false with a setNodes triggers on zoom*/
export const NetworkInterface: NodeComponent = ({
  selected,
  data,
}: NodeComponentProps) => {
  const { selection } = useContext(graphContext) as GraphContext;
  const isNodeRelated = selection.relatedNodes.includes(data.id);
  const [nodeState, setNodeState] = useState<NodeComponentstate>("inactive");
  useEffect(() => {
    setNodeState(
      selected ? "selected" : isNodeRelated ? "related" : "inactive"
    );
  }, [selected, isNodeRelated, selection]);

  return (
    <NiWrapper state={nodeState}>
      <NiIcon selected={selected} />
      <HandleTop />
      <HandleBottom />
    </NiWrapper>
  );
};
