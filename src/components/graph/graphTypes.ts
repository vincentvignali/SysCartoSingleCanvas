import { EdgeTypes, NodeTypes } from "reactflow";

import { CustomEdge } from "./edges/CustomEdge";
import { FloatingEdge } from "./edges/FloatingEdge";
import { Machine } from "./nodes/machine/Machine";
import { NetworkInterface } from "./nodes/networkInterface/NetworkInterface";
import { Region } from "./nodes/region/Region";
import { Service } from "./nodes/service/Service";
import { Subnetwork } from "./nodes/subnetwork/Subnetwork";

/**
NodeTypes object being passed to the reactFlow component
*/
export const nodeTypes: NodeTypes = {
  machine: Machine,
  network_interface: NetworkInterface,
  service: Service,
  subnetwork: Subnetwork,
  region: Region,
};

export const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
  floating: FloatingEdge,
};
