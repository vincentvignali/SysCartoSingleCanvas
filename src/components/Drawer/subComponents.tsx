import React, { FC, forwardRef, Props, ReactNode } from "react";
import styled from "@slicknode/stylemapper";
import { Chip, Tooltip } from "@material-tailwind/react";
import {
  drawerContainerStyle,
  drawerContainerHeaderStyle,
  drawerIconStyle,
  drawerToolTipStyle,
  drawerDataContainerStyle,
  drawerDataLineStyle,
  emptyDrawerStyle,
  chipValueStyle,
  chipKeyStyle,
  dockerChipKeyStyle,
} from "@/style/style";
import { nodeIconSVG } from "@/assets/icones";

/* ==== Drawer Custom subComponents === */
interface drawerDataLineProps {
  dataKey: string | number;
  dataValue: string | number;
  className?: string;
}
export const drawerDataLine: FC<drawerDataLineProps> = ({
  className,
  dataKey,
  dataValue,
}) => {
  const dockerChecker = dataValue === "docker";
  return (
    <div className={` ${className}`}>
      <Chip
        className={dockerChecker ? dockerChipKeyStyle : chipKeyStyle}
        value={`${dataKey}`}
      />
      <Chip className={chipValueStyle} value={`${dataValue}`} />
    </div>
  );
};

/** === */
interface drawerIconProps {
  type: string;
  className?: string;
  children?: ReactNode;
}
/** This subcomponents needs to receive refs from its parent. */
const drawerIcon: FC<drawerIconProps> = React.forwardRef(
  ({ type, className }: drawerIconProps, ref?: React.Ref<any>) => {
    return (
      <div className={className} ref={ref}>
        {nodeIconSVG[type]}
      </div>
    );
  }
);

/* ==== Drawer styled subComponent  === */
export const DrawerContainer = styled("div", drawerContainerStyle);

export const DrawerHeaderContainer = styled("div", drawerContainerHeaderStyle);

export const DrawerIcon = styled(drawerIcon, drawerIconStyle);

export const DrawerTooltip = styled(Tooltip, drawerToolTipStyle);

export const DrawerDataContainer = styled("div", drawerDataContainerStyle);

export const EmptyDrawer = styled(Chip, emptyDrawerStyle);

export const DrawerDataLine = styled(drawerDataLine, drawerDataLineStyle);
