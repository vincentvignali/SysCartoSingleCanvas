import { nodeIconSVG } from "@/assets/icones";
import {
  handleStyle,
  relatedSubnetworkWrapperStyle,
  selectedSubnetworkIconStyle,
  selectedSubnetworkWrapperStyle,
  subnetworkIconStyle,
  subnetworkWrapperStyle,
} from "@/style/style";
import styled from "@slicknode/stylemapper";
import React, { FC, ReactNode } from "react";
import { Handle, Position } from "reactflow";

/* ==== Subnetwork Custom subComponents === */

/** === */
interface subnetworkIconProps {
  selected: boolean;
  className?: string;
  children?: ReactNode;
}
const subnetworkIcon: FC<subnetworkIconProps> = React.forwardRef(
  ({ className }: subnetworkIconProps, ref?: React.Ref<any>) => {
    return (
      <div className={className} ref={ref}>
        {nodeIconSVG["subnetwork"]}
      </div>
    );
  }
);

interface handleProps {
  className?: string;
  children?: ReactNode;
}
const handleTop: FC<handleProps> = ({ className }) => {
  return <Handle type="target" position={Position.Top} className={className} />;
};

const handleBottom: FC<handleProps> = ({ className }) => {
  return (
    <Handle type="source" position={Position.Bottom} className={className} />
  );
};
/* ==== Network Inteface styled subComponent  === */
export const SubnetworkWrapper = styled("div", {
  variants: {
    state: {
      selected: selectedSubnetworkWrapperStyle,
      related: relatedSubnetworkWrapperStyle,
      inactive: subnetworkWrapperStyle,
    },
  },
  defaultVariants: { state: "inactive" },
});

export const SubnetworkIcon = styled(subnetworkIcon, {
  variants: {
    selected: {
      true: selectedSubnetworkIconStyle,
      false: subnetworkIconStyle,
    },
  },
  forwardProps: ["selected"],
});

export const HandleTop = styled(handleTop, handleStyle);
export const HandleBottom = styled(handleBottom, handleStyle);
