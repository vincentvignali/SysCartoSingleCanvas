import { ElkLayoutArguments, ElkNode } from "elkjs/lib/elk-api";
import ELK from "elkjs/lib/elk.bundled.js";
import { flatten } from "ramda";
import React from "react";
import { Edge, Node, ReactFlowInstance, XYPosition } from "reactflow";

import { Graph } from "@/data/types";

import { sizes } from "./nodeSizes";

/**
 * Tranform the current graph from context into a elk Graph.
 * @return  elk graph with nodes, edges and an Id.
 */
const toElkFormat = (graph: Graph<any>): ElkNode => {
  const networkIntefaces = graph.nodes.filter(
    (node) => node.type === "network_interface"
  );

  //  Defined new edges to create
  const newEdgeToCreate = networkIntefaces.map((ni) => {
    const machineId = ni.parentNode;
    const niSubnetwork = graph.edges
      .filter((edge) => edge.target === ni.id)
      .map((edge) => edge.source);
    return [machineId, [...niSubnetwork]];
  });
  const clearNewEdgeToCreate: Array<any> = [];
  newEdgeToCreate.map((pair) => {
    flatten(pair);
    const machine = pair[0];
    const subnetworks = flatten(pair.slice(1));
    subnetworks.forEach((subnetwork) => {
      clearNewEdgeToCreate.push([machine, subnetwork]);
    });
  });

  // Clean the array from duplicated edges
  const stringifiedArray = clearNewEdgeToCreate.map((pair) => {
    return JSON.stringify(pair);
  });
  const cleanSetStringified = [...new Set(stringifiedArray)];
  const parsedBackToArray = cleanSetStringified.map((pair) => {
    return JSON.parse(pair);
  });

  const cleanSetOfArrays = parsedBackToArray;
  const edges: Array<any> = cleanSetOfArrays.map((pair, index) => {
    return {
      id: index,
      source: pair[1],
      target: pair[0],
      type: "smoothstep",
    };
  });

  const subtneworksAndMachines = graph.nodes.filter(
    (node) => node.type === "subnetwork" || node.type === "machine"
  );

  const subtneworksAndMachinesELK = subtneworksAndMachines.map((node) => {
    const edgesFromThisNode = edges.filter((edge) => {
      return edge.source === node.id;
    });
    if (node.type === "machine") {
      return {
        id: node.id,
        width: sizes.machine.width,
        height: sizes.machine.height,
        x: node.position.x,
        y: node.position.y,
        children: [],
        edges: edgesFromThisNode.length !== 0 ? edgesFromThisNode : [],
      };
    } else {
      return {
        id: node.id,
        width: sizes.subnetwork.width,
        height: sizes.subnetwork.height,
        x: node.position.x,
        y: node.position.y,
        children: [],
        edges: edgesFromThisNode.length !== 0 ? edgesFromThisNode : [],
      };
    }
  });

  return {
    id: "root",
    children: subtneworksAndMachinesELK,
    edges: edges,
  };
};

/** elk functions trigger. (⚠️⚠️⚠️ not fully understood)
 */
const elk = async (
  graph: Graph<any>,
  args?: ElkLayoutArguments
): Promise<ElkNode> => {
  const elkGraph = toElkFormat(graph);
  // const workerUrl =
  //   import.meta.env.VITE_MODE === "production"
  //     ? "/elk-worker.min.js"
  //     : "./node_modules/elkjs/lib/elk-worker.min.js";
  // const worker = new ELK({
  //   workerUrl: workerUrl,
  //   // workerUrl: "/elk-worker.min.js",
  // });
  const worker = new ELK();
  // const worker = new ELK({
  //   workerFactory: function (url) {
  //     // the value of 'url' is irrelevant here
  //     return new Worker(url);
  //   },
  // });

  return worker.layout(elkGraph, args);
};

/** Returns the graph with each nodes coordinated being computed to form a force layout
 * @return graph
 */
export const elkLayoutForce = async (
  reactFlowInstance: ReactFlowInstance,
  args?: ElkLayoutArguments
): Promise<Graph<any>> => {
  const graph = {
    nodes: reactFlowInstance.getNodes(),
    edges: reactFlowInstance.getEdges(),
  };

  const root = await elk(graph, {
    layoutOptions: {
      "elk.algorithm": "force", // "rectpacking", "force", "box", "disco", "layered", "fixed", "sporeCompaction", "sporeOverlap"
      "spacing.nodeNode": "10", // Default 20
      "force.iterations": "300", // Default 300 && fait lagguer
      "force.repulsivePower": "0", // Default 0 && fait lagguer
    },
  });

  // store the positions
  let mapping: { [id: string]: XYPosition } = {};
  // top level nodes
  root.children?.forEach((node) => {
    mapping[node.id] = {
      x: node.x ? node.x : 0,
      y: node.y ? node.y : 0,
    };

    // children nodes
    node.children?.forEach((node2) => {
      mapping[node2.id] = {
        x: node2.x ? node2.x : 0,
        y: node2.y ? node2.y : 0,
      };
    });
  });

  // // Create an array with positionned Machines & subnetwork and add it with all others nodes not positionned
  const positionnedSubnAndMachId = root.children?.map((node) => node.id);

  // now update back nodes
  reactFlowInstance.setNodes((nodes: Node<any>[]): Node<any>[] => {
    return nodes.map((n) => {
      if (positionnedSubnAndMachId?.includes(n.id)) {
        const newNode = {
          ...n,
          position: mapping[n.id],
        };
        return newNode;
      } else {
        return n;
      }
    });
  });

  return graph;
};

/** Returns the graph with each nodes coordinated being computed to form a square box layout
 * @return graph
 */
export const elkLayoutBox = async (
  reactFlowInstance: ReactFlowInstance,
  args?: ElkLayoutArguments
): Promise<Graph<any>> => {
  const graph = {
    nodes: reactFlowInstance.getNodes(),
    edges: reactFlowInstance.getEdges(),
  };
  const root = await elk(graph, {
    layoutOptions: {
      "elk.algorithm": "box", // "rectpacking", "force", "box", "disco", "layered", "fixed", "sporeCompaction", "sporeOverlap"
      "spacing.nodeNode": "50", // Default 20
      "force.iterations": "500", // Default 300 && fait lagguer
      "force.repulsivePower": "0", // Default 0 && fait lagguer
    },
  });

  // store the positions
  let mapping: { [id: string]: XYPosition } = {};
  // top level nodes
  root.children?.forEach((node) => {
    mapping[node.id] = {
      x: node.x ? node.x : 0,
      y: node.y ? node.y : 0,
    };

    // children nodes
    node.children?.forEach((node2) => {
      mapping[node2.id] = {
        x: node2.x ? node2.x : 0,
        y: node2.y ? node2.y : 0,
      };
    });
  });

  // // Create an array with positionned Machines & subnetwork and add it with all others nodes not positionned
  const positionnedSubnAndMachId = root.children?.map((node) => node.id);

  // now update back nodes
  reactFlowInstance.setNodes((nodes: Node<any>[]): Node<any>[] => {
    return nodes.map((n) => {
      if (positionnedSubnAndMachId?.includes(n.id)) {
        const newNode = {
          ...n,
          position: mapping[n.id],
        };
        return newNode;
      } else {
        return n;
      }
    });
  });
  return graph;
};

type elkLayoutCollection = {
  [key: string]: (
    ReactFlowInstance: ReactFlowInstance,
    args?: ElkLayoutArguments
  ) => Promise<Graph<any>>;
};
export const elkLayout: elkLayoutCollection = {
  force: elkLayoutForce,
  box: elkLayoutBox,
};
