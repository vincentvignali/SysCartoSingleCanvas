import { flatten } from "ramda";
import { Edge, Node } from "reactflow";

import { BackendResponse, Graph, Metadata } from "./types";

/**
 * Transform all nodes and edges from backend into nodes with the correct format for ReactFlow.
 * @param backendData
 * @returns a graph {nodes, edges}
 */
export const toFlowElements = (
  backendData: BackendResponse
): Graph<Metadata> => {
  const newNodes: Array<Node<Metadata>> = backendData.nodes.map((node) => {
    let metadata = node.data;
    metadata["id"] = node.id;
    metadata["type"] = node.type;

    if (node.parentNode) {
      const newNode = {
        id: String(node.id),
        type: node.type,
        data: metadata,
        parentNode: node.parentNode,
        extent: "parent",
        position: { x: 0, y: 0 },
      };
      return newNode;
    } else {
      const newNode = {
        id: String(node.id),
        type: node.type,
        data: metadata,
        position: { x: 0, y: 0 },
      };
      return newNode;
    }
  });

  const newEdges: Array<Edge<Metadata>> = flatten(
    backendData.edges.map((edge) => {
      return [
        {
          id: String(edge.id),
          source: String(edge.source),
          target: String(edge.target),

          data: edge.data,
        },
      ];
    })
  );
  return { nodes: newNodes, edges: newEdges };
};
