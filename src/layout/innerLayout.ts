import React from "react";
import { Edge, MarkerType, Node, ReactFlowInstance } from "reactflow";

import { runEdgesPositionning } from "@/layout/innerLayout/edges";
import { runNodesInnerPosition } from "@/layout/innerLayout/nodes";

/**
 - Run MachineLayout
 - Fix ZIndex to send machine to background
 - Fix ZIndex to Edges to have them on first layer
 */
export const innerLayout = (
  reactFlowInstance: ReactFlowInstance<any, any>
): void => {
  reactFlowInstance.setNodes((nodes: Array<Node<any>>): Array<Node<any>> => {
    return runNodesInnerPosition(nodes);
  });
  reactFlowInstance.setNodes((nodes: Node<any>[]): Node<any>[] => {
    return nodes.map((node) => {
      if (node.type === "machine") {
        node.draggable = true;
        node = {
          ...node,
          style: {
            width: node.style?.width,
            height: node.style?.height,
          },
        };
        return node;
      } else if (node.type === "subnetwork") {
        node.draggable = true;
        node = {
          ...node,
          style: {
            width: node.style?.width,
            height: node.style?.height,
            zIndex: 0,
          },
        };
        return node;
      } else {
        node.draggable = false;
        node = {
          ...node,
          style: {
            width: node.style?.width,
            height: node.style?.height,
            zIndex: 2,
          },
        };
        return node;
      }
    });
  });
  reactFlowInstance.setEdges((edges: Array<Edge<any>>): Array<Edge<any>> => {
    const newEdges = runEdgesPositionning(reactFlowInstance.getNodes(), edges);
    newEdges.map((edge) => {
      const targetNode = reactFlowInstance.getNode(edge.target);
      (edge.type =
        targetNode?.type === "machine" ||
        targetNode?.type === "network_interface"
          ? "floating"
          : "custom"), // TODO: here we can select between "custom" or "floating"
        (edge.style = {
          ...edge.style,
          zIndex: 1,
        });
      // LowerZoom Level edges are animated
      edge.animated = edge.id.includes("Artificial") ? false : true;
      edge.markerEnd = {
        orient: "auto",
        type: MarkerType.ArrowClosed,
        color: edge.type === "floating" ? "#c62828" : "#1b5e20",
        width: edge.id.includes("Artificial") ? 10 : 8,
        height: edge.id.includes("Artificial") ? 8 : 6,
        strokeWidth: edge.id.includes("Artificial") ? 2 : 2,
      };
    });
    return newEdges;
  });
};
