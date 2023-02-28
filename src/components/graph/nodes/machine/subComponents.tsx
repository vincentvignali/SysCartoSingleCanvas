import { nodeIconSVG } from "@/assets/icones";
import {
  classicColorHighStyle,
  classicColorLowStyle,
  classicColorMedStyle,
  dockerColorHighStyle,
  dockerColorLowStyle,
  dockerColorMedStyle,
  handleStyle,
  inactiveMachineIconStyle,
  inactiveMachineWrapperStyle,
  machineIconBasicStyle,
  machineWrapperBasicStyle,
  relatedMachineIconStyle,
  relatedMachineWrapperStyle,
  selectedMachineIconStyle,
  selectedMachineWrapperStyle,
} from "@/style/style";
import styled from "@slicknode/stylemapper";
import React, { FC, ReactNode } from "react";
import { Handle, Position } from "reactflow";

/* ==== Machine Custom subComponents === */

/** === */
interface machineIconProps {
  state: string;
  className?: string;
  children?: ReactNode;
}
const machineIcon: FC<machineIconProps> = React.forwardRef(
  ({ className }: machineIconProps, ref?: React.Ref<any>) => {
    return (
      <div className={className} ref={ref}>
        {nodeIconSVG["machine"]}
      </div>
    );
  }
);

/** === */
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
/* ==== Machine styled subComponent  === */
export const MachineWrapper = styled("div", machineWrapperBasicStyle, {
  variants: {
    type: {
      docker: "",
      classic: "",
    },
    state: {
      selected: "",
      related: "",
      inactive: "",
    },
  },
  compoundVariants: [
    {
      type: "classic",
      state: "selected",
      className: `${classicColorHighStyle} - ${selectedMachineWrapperStyle}`,
    },
    {
      type: "classic",
      state: "related",
      className: `${classicColorMedStyle} - ${relatedMachineWrapperStyle}`,
    },
    {
      type: "classic",
      state: "inactive",
      className: `${classicColorLowStyle} - ${inactiveMachineWrapperStyle}`,
    },
    {
      type: "docker",
      state: "selected",
      className: `${dockerColorHighStyle} - ${selectedMachineWrapperStyle}`,
    },
    {
      type: "docker",
      state: "related",
      className: `${dockerColorMedStyle} - ${relatedMachineWrapperStyle}`,
    },
    {
      type: "docker",
      state: "inactive",
      className: `${dockerColorLowStyle} - ${inactiveMachineWrapperStyle}`,
    },
  ],

  defaultVariants: { state: "inactive", type: "classic" },
});

export const MachineIcon = styled(machineIcon, machineIconBasicStyle, {
  variants: {
    type: {
      docker: "",
      classic: "",
    },
    state: {
      selected: "",
      related: "",
      inactive: "",
    },
  },
  compoundVariants: [
    {
      type: "classic",
      state: "selected",
      className: `${classicColorHighStyle} - ${selectedMachineIconStyle}`,
    },
    {
      type: "classic",
      state: "related",
      className: `${classicColorMedStyle} - ${relatedMachineIconStyle}`,
    },
    {
      type: "classic",
      state: "inactive",
      className: `${classicColorLowStyle} - ${inactiveMachineIconStyle}`,
    },
    {
      type: "docker",
      state: "selected",
      className: `${dockerColorHighStyle} - ${selectedMachineIconStyle}`,
    },
    {
      type: "docker",
      state: "related",
      className: `${dockerColorMedStyle} - ${relatedMachineIconStyle}`,
    },
    {
      type: "docker",
      state: "inactive",
      className: `${dockerColorLowStyle} - ${inactiveMachineIconStyle}`,
    },
  ],
  defaultVariants: { state: "inactive", type: "docker" },
  forwardProps: ["state", "type"],
});

export const HandleTop = styled(handleTop, handleStyle);
export const HandleBottom = styled(handleBottom, handleStyle);
