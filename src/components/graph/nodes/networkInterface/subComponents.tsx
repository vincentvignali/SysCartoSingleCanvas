import { nodeIconSVG } from "@/assets/icones";
import {
  handleStyle,
  niIconStyle,
  niWrapperStyle,
  relatedNiWrapperStyle,
  selectedNiIconStyle,
  selectedNiWrapperStyle,
} from "@/style/style";
import styled from "@slicknode/stylemapper";
import React, { FC, ReactNode } from "react";
import { Handle, Position } from "reactflow";

/* ==== Network Interface Custom subComponents === */

/** === */
interface niIconProps {
  selected: boolean;
  className?: string;
  children?: ReactNode;
}
const niIcon: FC<niIconProps> = React.forwardRef(
  ({ className }: niIconProps, ref?: React.Ref<any>) => {
    return (
      <div className={className} ref={ref}>
        {nodeIconSVG["network interface"]}
      </div>
    );
  }
);

interface handleProps {
  className?: string;
  children?: ReactNode;
}
const handleTop: FC<handleProps> = ({ className }) => {
  // Handles might have different role (target or source) depending on the Netowrk interface position inside a machine : Top o bottom.
  // We use duplicate handle to cover both cases.
  return (
    <>
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className={className}
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className={className}
      />
    </>
  );
};

const handleBottom: FC<handleProps> = ({ className }) => {
  return (
    <>
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className={className}
      />
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className={className}
      />
    </>
  );
};
/* ==== Network Inteface styled subComponent  === */
export const NiWrapper = styled("div", {
  variants: {
    state: {
      selected: selectedNiWrapperStyle,
      related: relatedNiWrapperStyle,
      inactive: niWrapperStyle,
    },
  },
  defaultVariants: { state: "inactive" },
});

export const NiIcon = styled(niIcon, {
  variants: {
    selected: {
      true: selectedNiIconStyle,
      false: niIconStyle,
    },
  },
  forwardProps: ["selected"],
});

export const HandleTop = styled(handleTop, handleStyle);
export const HandleBottom = styled(handleBottom, handleStyle);
