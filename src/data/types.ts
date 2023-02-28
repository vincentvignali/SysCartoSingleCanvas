import { Edge, Node } from "reactflow";

// types for back ------------------------------------------------------------

export type NodeType =
  | "service"
  | "network_interface"
  | "subnetwork"
  | "machine"
  | "region";

export type NodeComponentstate =
  | "selected"
  | "related"
  | "inactive"
  | undefined;

export type MachineComponentType = "docker" | "classic" | undefined;

export interface Metadata {
  [key: string]: any;
}

export interface NodeFromBackend {
  id: number;
  position?: {
    x: number;
    y: number;
  };
  type: NodeType;
  data: Metadata;
  parentNode?: string;
  extent?: string;
}

export interface EdgeFromBackend {
  id: string;
  source: number;
  target: number;
  data: Metadata;
}

export interface BackendResponse {
  nodes: NodeFromBackend[];
  edges: EdgeFromBackend[];
}

// types for front -----------------------------------------------------------

export interface Graph<T> {
  nodes: Array<Node<T>>;
  edges: Array<Edge<T>>;
}
