import { NodeComponent, NodeComponentProps } from "@/components/types";
import { GraphContext, graphContext } from "@/contexts/GraphContext";
import { NodeComponentstate } from "@/data/types";
import { useContext, useEffect, useState } from "react";
import { useUpdateNodeInternals } from "reactflow";
import {
  HandleBottom,
  HandleTop,
  ServiceIcon,
  ServiceWrapper,
} from "./subComponents";

/** A Component used by reactFlow to render the node. Is Set on hidden false thanks to a setNode within zoom component */
export const Service: NodeComponent = ({
  selected,
  data,
}: NodeComponentProps) => {
  const { zoom, selection } = useContext(graphContext) as GraphContext;
  const zoomLevel = zoom.deepZoomLayer;
  const isNodeRelated = selection.relatedNodes.includes(data.id);
  const [nodeState, setNodeState] = useState<NodeComponentstate>("inactive");

  useEffect(() => {
    setNodeState(
      selected ? "selected" : isNodeRelated ? "related" : "inactive"
    );
  }, [selected, isNodeRelated, selection]);

  return (
    <ServiceWrapper state={nodeState}>
      <ServiceIcon selected={selected} />
      <HandleTop />
      <HandleBottom />
    </ServiceWrapper>
  );
};
