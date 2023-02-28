import { NodeComponent, NodeComponentProps } from "@/components/types";
import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { NodeComponentstate } from "@/data/types";
import { useContext, useEffect, useState } from "react";
import {
  HandleBottom,
  HandleTop,
  SubnetworkIcon,
  SubnetworkWrapper,
} from "./subComponents";

/** A Component used by reactFlow to render the node */
export const Subnetwork: NodeComponent = ({
  selected,
  data,
}: NodeComponentProps) => {
  const { selection } = useContext(graphContext) as GraphContext;
  const isNodeRelated = selection.relatedNodes.includes(data.id);
  const [nodeState, setNodeState] = useState<NodeComponentstate>("inactive");

  useEffect(
    () =>
      setNodeState(
        selected ? "selected" : isNodeRelated ? "related" : "inactive"
      ),
    [selected, isNodeRelated, selection]
  );

  return (
    <SubnetworkWrapper state={nodeState}>
      <SubnetworkIcon selected={selected} />
      <HandleTop />
      <HandleBottom />
    </SubnetworkWrapper>
  );
};
