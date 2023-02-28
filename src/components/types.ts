import { FC } from "react";

import { Metadata } from "@/data/types";
import { Edge, EdgeProps } from "reactflow";

export interface NodeComponentProps {
  [key: string]: any;
  data: Metadata;
}

export type NodeComponent = FC<NodeComponentProps>;

export type svgCollection = {
  [key: string]: any;
};
