import { Metadata } from "@/data/types";
import React, { FC } from "react";
import { Node } from "reactflow";
import {
  DrawerContainer,
  DrawerDataContainer,
  DrawerDataLine,
  DrawerHeaderContainer,
  DrawerIcon,
  DrawerTooltip,
  EmptyDrawer,
} from "./subComponents";

interface DrawerProps {
  node: Node<Metadata>;
}

/** Component dynamically displayed based on the selected nodes
 * Selected nodes are passed by props.
 * Then the drawer renders informations about the node(s)
 */
const Drawer: FC<DrawerProps> = ({ node }) => {
  const dataKeys: Array<string | number> = [];
  const dataValues: Array<string | number> = [];

  /** Clean the data */
  const data: Metadata = { ...node.data };
  const creationTime = data["_created_at"];
  delete data["_created_at"];
  const updatedTime = data["_updated_at"];
  delete data["_updated_at"];
  const creator = data["created_by"];
  delete data["created_by"];
  const hostId = data["host_id"];
  delete data["host_id"];
  const hostedAgent = data["hosted_agent"];
  delete data["hosted_agent"];
  const type = data["type"].split("_").join(" ");
  delete data["type"];
  const id = data["id"];
  delete data["id"];
  /** Clean the Cpu Data */
  if (data.cpu) {
    Object.entries(data.cpu).map((cpuData) => {
      data[`(cpu) ${cpuData[0]}`] = cpuData[1];
      delete data["cpu"];
    });
  }

  /** Populate the component data */
  Object.entries(data).map((data) => {
    dataValues.push(data[1]);
    dataKeys.push(data[0]);
  });

  const ref = React.useRef<HTMLDivElement>(type);
  return (
    <DrawerContainer>
      <DrawerHeaderContainer>
        <DrawerTooltip content={type}>
          <DrawerIcon type={type} />
        </DrawerTooltip>
      </DrawerHeaderContainer>
      <DrawerDataContainer>
        {Object.entries(data).length <= 0 && (
          <EmptyDrawer value={"No data to display."} />
        )}
        {Object.entries(data).map((entry) => (
          <DrawerDataLine
            key={`${entry[0]} - ${entry[1]}`}
            dataKey={`${entry[0]}`}
            dataValue={`${entry[1]}`}
          />
        ))}
      </DrawerDataContainer>
    </DrawerContainer>
  );
};

export default Drawer;
