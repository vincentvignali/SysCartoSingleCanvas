import { Handle, Position } from "reactflow";

import { NodeComponent } from "../../../types";

/**
 * @param props
 * @returns a Component used by reactFlow to render the node
 */
export const Region: NodeComponent = (props) => {
  return (
    <div
      className="relative rounded-lg bg-purple-500 p-4 opacity-[0.1] shadow-lg"
      style={{
        width: props.data.size?.width || 100,
        height: props.data.size?.height || 100,
      }}
    >
      <Handle type="source" position={Position.Bottom} className={""} />
      <Handle type="target" position={Position.Top} className={""} />
    </div>
  );
};
