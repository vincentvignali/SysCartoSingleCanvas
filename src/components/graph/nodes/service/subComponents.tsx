import { nodeIconSVG } from "@/assets/icones";
import {
  handleStyle,
  relatedServiceWrapperStyle,
  selectedServiceIconStyle,
  selectedServiceWrapperStyle,
  serviceIconStyle,
  serviceWrapperStyle,
} from "@/style/style";
import styled from "@slicknode/stylemapper";
import React, { FC, ReactNode } from "react";
import { Handle, Position } from "reactflow";

/* ==== Service Custom subComponents === */

/** === */
interface serviceIconProps {
  selected: boolean;
  className?: string;
  children?: ReactNode;
}
const serviceIcon: FC<serviceIconProps> = React.forwardRef(
  ({ className }: serviceIconProps, ref?: React.Ref<any>) => {
    return (
      <div className={className} ref={ref}>
        {nodeIconSVG["service"]}
      </div>
    );
  }
);

interface handleProps {
  className?: string;
  children?: ReactNode;
}
const handleTop: FC<handleProps> = ({ className }) => {
  return (
    <Handle
      id="top"
      type="target"
      position={Position.Top}
      className={className}
    />
  );
};

const handleBottom: FC<handleProps> = ({ className }) => {
  return (
    <Handle
      id="bottom"
      type="target"
      position={Position.Bottom}
      className={className}
    />
  );
};
/* ==== Network Inteface styled subComponent  === */
export const ServiceWrapper = styled("div", {
  variants: {
    state: {
      selected: selectedServiceWrapperStyle,
      related: relatedServiceWrapperStyle,
      inactive: serviceWrapperStyle,
    },
  },
  defaultVariants: { state: "inactive" },
});

export const ServiceIcon = styled(serviceIcon, {
  variants: {
    selected: {
      true: selectedServiceIconStyle,
      false: serviceIconStyle,
    },
  },
  forwardProps: ["selected"],
});

export const HandleTop = styled(handleTop, handleStyle);
export const HandleBottom = styled(handleBottom, handleStyle);
