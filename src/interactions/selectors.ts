import React from "react";
import { Edge, Node, ReactFlowInstance } from "reactflow";

import { Metadata } from "@/data/types";

/** This functions returns an array of nodes ID : The selected nodes and all the nodes linked to them by any edges */
export const AddChildrenNodesToSelection = (
  nodesFromSelection: Node[],
  reactFlowInstance: ReactFlowInstance
): string[] => {
  const nodesFromSelectionId = nodesFromSelection.map((node) => node.id);
  const children = reactFlowInstance
    .getNodes()
    .filter((node) =>
      node.parentNode ? nodesFromSelectionId.includes(node.parentNode) : null
    )
    .map((node) => node.id);

  const nodeToReturn = [...nodesFromSelectionId, ...children];
  return nodeToReturn;
};

/** This functions reset the style of nodes and hide all edges. Has no return value */
export const resetSelection = (reactFlowInstance: ReactFlowInstance) => {
  reactFlowInstance.setNodes((nodes) => {
    return nodes.map((node) => {
      delete node.selected;
      return node;
    });
  });
  hideAllEdges(reactFlowInstance);
};

/** This functions hides all edges. Has no return value */
export const hideAllEdges = (reactFlowInstance: ReactFlowInstance) => {
  reactFlowInstance.setEdges((edges) => {
    return edges.map((edge) => {
      edge.hidden = true;
      return edge;
    });
  });
};

export const hideInnerNodes = (
  nodesFromSelection: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>
) => {
  setNodes((nodes) => {
    return nodes.map((node) => {
      node.type === "network_interface" || node.type === "service"
        ? (node.hidden = true)
        : (node.hidden = false);
      node.type === "subnetwork" ? (node.zIndex = 2) : (node.zIndex = 0);
      return node;
    });
  });
  // Maintains the machines edges when a network interfaces is selected and the user zooms out
  setEdges((edges) => {
    const copyOfEdges = [...edges];
    return edges
      .map((edge) => {
        const retrievedEdges = nodesFromSelection
          .map((nodeFromSelection) =>
            copyOfEdges.filter((edge) => edge.target === nodeFromSelection.id)
          )
          .flat();
        const isolatedSources = retrievedEdges.map((edge) => edge.source);
        nodesFromSelection.map((nodeFromSelection) => {
          if (
            nodeFromSelection.type === "network_interface" &&
            edge.target === nodeFromSelection.parentNode &&
            isolatedSources.includes(edge.source)
          ) {
            edge.hidden = false;
            return edge;
          }
        });
        return edge;
      })
      .flat();
  });
};

/** This functions creates the machines - subnework edges and adds it to the current edges. Has no return value */
export const createMachineEdges = (reactFlowInstance: ReactFlowInstance) => {
  // 1. Start by destroying all previous artificial nodes to prevent rendering conflicts
  reactFlowInstance.setEdges((edges) => {
    return (edges = edges.filter(
      (edge) => edge.id.includes("Artificial") === false
    ));
  });

  // 2. Retrieve Machines. They are used as the entry point to create the fake edges.
  const machinesNodesId = reactFlowInstance
    .getNodes()
    .filter((node) => node.type === "machine")
    .map((machine) => machine.id);

  // 3.Create the fake edges
  reactFlowInstance.setEdges((edges) => {
    // * 3.1. |Layer 0 | Iterate over each machines. Finds its Nic, use the Nic to find the subNetworks.
    // * 3.2. |_ Layer 1 | Iterate over the the subnetworks to build an edge for each of them using the subnetwork as a source and the machine as a target.
    // * 3.3. |Layer 0 | Add the newEdges to the old ones.
    const newEdges = machinesNodesId
      .map((machineNodeId) => {
        // 1.
        const relatedNICS = reactFlowInstance
          .getNodes()
          .filter(
            (node) =>
              node.parentNode === machineNodeId &&
              node.type === "network_interface"
          );
        const relatedSubnetworksId = relatedNICS
          .map((nic) =>
            edges
              .filter((edge) => edge.target === nic.id)
              .map((edge) => edge.source)
          )
          .flat();
        const uniqueRelatedSubnetworksId = [...new Set(relatedSubnetworksId)];

        // 2.
        return uniqueRelatedSubnetworksId.map((subnetworkId) => {
          const edge = {
            animated: true,
            hidden: true,
            style: { strokeWidth: 4, width: 10, zIndex: 1 },
            id: `${subnetworkId} -> ${machineNodeId} - Artificial`,
            source: subnetworkId,
            target: machineNodeId,
            type: "floating",
            zIndex: 2,
          };
          return edge;
        });
      })
      .flat();
    // 3.
    return [...edges, ...newEdges];
  });
};

/** This functions reveals the nodes from the selected nodes. Has no return value */
export const revealAllNodes = (
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>
) => {
  setNodes((nodes) => {
    return nodes.map((node) => {
      if (node.type === "machine") {
        node.zIndex = -1;
      } else {
        node.zIndex = 1;
      }
      node.hidden = false;
      return node;
    });
  });
};

/** This functions reveals the nodes from the selected nodes. Has no return value */
export const revealEdges = (
  reactFlowInstance: ReactFlowInstance,
  relatedNodes: string[]
) => {
  reactFlowInstance.setEdges((edges) => {
    return edges.map((edge) => {
      if (
        (relatedNodes.includes(edge.source) &&
          reactFlowInstance
            .getNodes()
            .find((node) => node.id === edge.target)) ||
        (relatedNodes.includes(edge.target) &&
          reactFlowInstance.getNodes().find((node) => node.id === edge.source))
      ) {
        return (edge = {
          ...edge,
          hidden: false,
        });
      } else {
        return (edge = {
          ...edge,
          hidden: true,
        });
      }
    });
  });
};

export const findRelatedNodes = (
  nodeMetadata: Metadata,
  reactFlowInstance: ReactFlowInstance
): string[] | [] => {
  let relatedNode = [];
  const parentNode = nodeMetadata.parentNode
    ? reactFlowInstance
        .getNodes()
        .find((node) => node.id === nodeMetadata.parentNode)
    : null;
  parentNode ? relatedNode.push(parentNode) : null;
  const children = reactFlowInstance
    .getNodes()
    .filter(
      (node) =>
        node.parentNode === nodeMetadata.id && node.type === "network_interface"
    )
    .map((node) => relatedNode.push(node));

  const targets = reactFlowInstance
    .getEdges()
    .filter((edge) => edge.source === nodeMetadata.id)
    .map((edge) =>
      reactFlowInstance.getNodes().filter((node) => node.id === edge.target)
    )
    .filter(Boolean);
  relatedNode.push(targets.flat());

  const sources = reactFlowInstance
    .getEdges()
    .filter((edge) => edge.target === nodeMetadata.id)
    .map((edge) =>
      reactFlowInstance.getNodes().filter((node) => node.id === edge.source)
    )
    .filter(Boolean);
  relatedNode.push(sources.flat());

  return relatedNode.flat().map((node) => node.id);
};

export const isEdgeRelatedToASelectedNode = (
  edge: Edge,
  nodes: Node[],
  edges: Edge[]
): boolean => {
  let IsTargetNodeSelected;
  let IsSourceNodeSelected;

  const targetNode = nodes.find((node) => node.id === edge.target);

  IsSourceNodeSelected = nodes
    .find((node) => node.id === edge.source)
    ?.hasOwnProperty("selected");

  IsTargetNodeSelected = nodes
    .find((node) => node.id === edge.target)
    ?.hasOwnProperty("selected");

  if (targetNode)
    if (targetNode.type === "network_interface") {
      const machine = targetNode?.parentNode;
      const isMachineSelected = nodes
        .find((node) => node.id === machine)
        ?.hasOwnProperty("selected");

      IsTargetNodeSelected = isMachineSelected || targetNode.selected;
    }

  return IsTargetNodeSelected || IsSourceNodeSelected || false;
};

export const artificialEdgeChecker = (edge: Edge): boolean => {
  return edge.id.includes("Artificial");
};

/** This functions fits the view to have the whole graph fitting in the canvas. Has no return value */
export const fitView = (reactFlowInstance: ReactFlowInstance<any, any>) => {
  reactFlowInstance.fitView({ padding: 0.5, duration: 750 });
};
