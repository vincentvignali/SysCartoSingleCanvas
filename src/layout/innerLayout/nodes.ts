import { Edge, Node, Position } from "reactflow";

import { Metadata } from "@/data/types";
import { sizes } from "@/layout/nodeSizes";
import { MachineDimension } from "@/layout/types";

/** Sub function of the main innerLayout
Takes a nodeId as a parameter
@return An array of nodes : the machine followed by all childs of the machine
*/
const retrieveMachineChilds = (
  dataSet: Array<Node<Metadata>>,
  idToSearch: string
): Array<Node> => {
  const parentNode = dataSet.filter((node) => node.id === idToSearch);
  const childNodes = dataSet.filter((node) => node.parentNode === idToSearch);
  const newArr = [...parentNode, ...childNodes];
  return newArr;
};

/** Sub function of the main innerLayout
Takes a setof Node as a parameters 
@return an array of two arrays : the network interfaces and the service.
*/
const setArraysOfNodes = (nodes: Array<Node>) => {
  const intArr = nodes.filter((node) => node.type === "network_interface");
  const servArr = nodes.filter((node) => node.type === "service");
  return [[intArr], [servArr]];
};

/** Sub function of the main innerLayout
Detects the proper layout a machine node based on its child.
@return An explicit string for the pattern ex : "emptyMachinePattern"
*/
const setLayoutPattern = (
  intArr: Array<Node>,
  servArr: Array<Node>
): string => {
  if (intArr.length === 0 && servArr.length === 0) {
    return "emptyMachinePattern";
  }
  if (
    (intArr.length > 0 && servArr.length === 0) ||
    (intArr.length === 0 && servArr.length > 0)
  ) {
    return "singleNodeTypePattern";
  }
  if (intArr.length > 0 && servArr.length > 0) {
    return "multipleNodeTypePattern";
  }
  return "No Pattern";
};
/** Sub function of the main innerLayout
- Operate the layout for an empty machine (no child nodes)
@return an array of Nodes
*/
const emptyMachinePattern = (
  machineDimension: MachineDimension,
  nodes: Array<Node>
): Array<Node> => {
  nodes[0].style = {
    textAlign: "center",
    width: machineDimension.width,
    height: machineDimension.height,
  };
  nodes.splice(1);
  return nodes;
};

/** Sub function of the main innerLayout
- Operate the layout for an a machine having a single type of node in it.
@return an array of Nodes
*/
const singleNodeTypePattern = (
  machineDimension: MachineDimension,
  intArr: Array<Node>,
  servArr: Array<Node>,
  nodes: Array<Node>
): Array<Node> => {
  const paddingVertical = machineDimension.padding / 2;
  const paddingHorizontal = machineDimension.padding / 2; // At least divided by 2

  // SET THE MACHINE DISPLAY PROPERTIES
  nodes[0].style = {
    width: machineDimension.width,
    height: machineDimension.height,
  };

  // ONlY 1 OR MORE INTERFACES : SET THE INTERFACE(s) PROPERTIES
  if (intArr.length > 0) {
    let intIncrementor = paddingVertical;
    intArr.map((node) => {
      node.style = {
        width: machineDimension.width - paddingHorizontal * 2,
        height: machineDimension.height / 2,
      };
      node.position = {
        x: paddingHorizontal,
        y: machineDimension.height / 4,
      };
      intIncrementor += machineDimension.height / intArr.length;
      return [node];
    });
  }

  // ONlY 1 OR MORE SERVICES : SET THE SERVICE(s) PROPERTIES
  if (servArr.length > 0) {
    let serviceIncrementor = paddingHorizontal;
    servArr.map((node) => {
      node.style = {
        width: machineDimension.width / servArr.length - paddingHorizontal * 2,
        height: machineDimension.height - paddingVertical * 2,
      };
      node.position = {
        x: serviceIncrementor,
        y: paddingVertical,
      };
      serviceIncrementor += machineDimension.width / servArr.length;
      return node;
    });
  }
  return nodes;
};

/** Sub function of the main innerLayout
- Operate the layout for an a machine having a multiple type of node in it.
@return an array of Nodes
*/
const multipleNodeTypePattern = (
  machineDimension: MachineDimension,
  intArr: Array<Node>,
  servArr: Array<Node>,
  nodes: Array<Node>
) => {
  if (intArr.length === 1) {
    return multipleNodeTypePatternSingleInterface(
      machineDimension,
      intArr,
      servArr,
      nodes
    );
  }
  return multipleNodeTypePatternMultipleInterface(
    machineDimension,
    intArr,
    servArr,
    nodes
  );
};

/** Sub function of the main innerLayout
- Operate the layout for an a machine having a multiple type of node in it and only one network interface
@return an array of Nodes
*/
const multipleNodeTypePatternSingleInterface = (
  machineDimension: MachineDimension,
  intArr: Array<Node>,
  servArr: Array<Node>,
  nodes: Array<Node>
): Array<Node> => {
  const paddingVertical = machineDimension.padding;
  const paddingHorizontal = machineDimension.padding / 2; // At least divided by 2
  const containerSplitLine = machineDimension.height / 3 + paddingVertical;

  // size and position of the MachineNode
  nodes[0].style = {
    width: machineDimension.width,
    height: machineDimension.height,
  };

  // set size and position of the single Interface Node
  intArr[0].style = {
    width: machineDimension.width - paddingHorizontal * 2,
    height: machineDimension.height - containerSplitLine * 2, //[...intArr, ...servArr].length,
  };
  intArr[0].position = {
    x: paddingHorizontal,
    y: paddingVertical,
  };

  // set size and position of the severals services Node
  let serviceIncrementor = paddingHorizontal;
  servArr.map((node) => {
    node.style = {
      width: machineDimension.width / servArr.length - paddingHorizontal * 2,
      height:
        machineDimension.height - containerSplitLine - paddingVertical * 2,
    };
    node.position = {
      x: serviceIncrementor,
      y: containerSplitLine,
    };
    serviceIncrementor += machineDimension.width / servArr.length;
    return node;
  });
  return nodes;
};

/** Sub function of the main innerLayout
- Operate the layout for an a machine having a multiple type of node in it and several network interface
@return an array of Nodes
*/
const multipleNodeTypePatternMultipleInterface = (
  machineDimension: MachineDimension,
  intArr: Array<Node>,
  servArr: Array<Node>,
  nodes: Array<Node>
): Array<Node> => {
  // Set padding and ratio
  const paddingVertical = machineDimension.padding;
  const paddingHorizontal = machineDimension.padding; // At least divided by 2
  const ratio = machineDimension.ratio * 3;

  // Split into 3 containers
  const upperContainerTop = paddingVertical;
  const middleContainerTop = machineDimension.height / ratio + paddingVertical;
  const lowerContainerTop =
    (machineDimension.height / ratio) * (ratio - 1) + paddingVertical;

  // size and position of the MachineNode
  nodes[0].style = {
    width: machineDimension.width,
    height: machineDimension.height,
  };

  // Retrieve even and uneven totals item
  const evenItemCounter: number = intArr.reduce((acc, node, index) => {
    if (index % 2 === 0 || index === 0) {
      acc += 1;
    } else {
      acc;
    }
    return acc;
  }, 0);

  const unEvenItemCounter: number = intArr.reduce((acc, node, index) => {
    if (index % 2 !== 0) {
      acc += 1;
    } else {
      acc;
    }
    return acc;
  }, 0);

  // Set size and position for interface nodes (switching between even and uneven)
  let evenIntNodeIterator = paddingHorizontal;
  let unEvenIntNodeIterator = paddingHorizontal;
  intArr.map((node, index) => {
    node.selectable = true;
    // If it's an even index item then put it in the upper container otherwise at the lower container.
    if (index === 0 || index % 2 === 0) {
      node.targetPosition = Position.Bottom;
      node.sourcePosition = Position.Bottom;
      node.style = {
        width:
          (machineDimension.width - paddingHorizontal) / evenItemCounter -
          paddingHorizontal,

        height: machineDimension.height / ratio - paddingVertical * 2,
      };
      node.position = {
        x: evenIntNodeIterator,
        y: upperContainerTop,
      };

      if (typeof node.style.width === "number") {
        evenIntNodeIterator += node.style.width + paddingHorizontal;
      }
    } else {
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Top;
      node.style = {
        width:
          (machineDimension.width - paddingHorizontal) / unEvenItemCounter -
          paddingHorizontal,
        height: machineDimension.height / ratio - paddingVertical * 2,
      };
      node.position = {
        x: unEvenIntNodeIterator,
        y: lowerContainerTop,
      };
      if (typeof node.style.width === "number") {
        unEvenIntNodeIterator += node.style.width + paddingHorizontal;
      }
    }
  });

  // Set size and position for services nodes
  let serviceIncrementor = paddingHorizontal;
  servArr.map((node) => {
    node.style = {
      width:
        (machineDimension.width - paddingHorizontal) / servArr.length -
        paddingHorizontal,
      height:
        (machineDimension.height / ratio) * (ratio - 2) - paddingVertical * 2,
    };
    node.position = {
      x: serviceIncrementor,
      y: middleContainerTop,
    };
    if (typeof node.style.width === "number") {
      serviceIncrementor += node.style.width + paddingHorizontal;
    }
  });
  return nodes;
};

/** Sub function of the main innerLayout
- execute the correct machine layout based on the one deteched above
@return an array of Nodes
*/
const executeMachineLayout = (
  machineDimension: MachineDimension,
  layoutPattern: string,
  intArr: Array<Node>,
  servArr: Array<Node>,
  nodes: Array<Node>
): Array<Node> => {
  if (layoutPattern === "emptyMachinePattern") {
    return emptyMachinePattern(machineDimension, nodes);
  }
  if (layoutPattern === "singleNodeTypePattern") {
    return singleNodeTypePattern(machineDimension, intArr, servArr, nodes);
  }
  if (layoutPattern === "multipleNodeTypePattern") {
    return multipleNodeTypePattern(machineDimension, intArr, servArr, nodes);
  }
  return nodes;
};

/** Connects the edges to the right handles
- execute the correct machine layout based on the one deteched above
@return an array of edges
*/
export const runEdgesPositionning = (
  nodes: Array<Node>,
  edges: Array<Edge>
): Array<Edge> => {
  const filteredParentNode = nodes.filter(
    (node) => node.type === "machine" || node.type === "subnetwork"
  );

  filteredParentNode.map((parentNode) => {
    const childNodes = nodes.filter(
      (node) => node.parentNode === parentNode.id
    );
    const numberOfInterfaces = childNodes.filter(
      (childNode) => childNode.type === "network_interface"
    ).length;

    if (numberOfInterfaces > 1) {
      // Retrieve all Nodes from the upper row.
      const upperInterfaces = childNodes.filter((node, index) => {
        return (
          node.type === "network_interface" && (index === 0 || index % 2 === 0)
        );
      });
      // Retrieve all Nodes from the lower row.
      const lowerInterfaces = childNodes.filter((node, index) => {
        return node.type === "network_interface" && index % 2 !== 0;
      });

      // Retrieve all edges connected to the nodes retrieved previously
      const upperEdges = edges.filter((edge) =>
        upperInterfaces.some((node) => node.id === edge.source)
      );
      upperEdges.map((edge) => (edge.targetHandle = "top"));

      // Retrieve all edges connected to the nodes retrieved previously
      const lowerEdges = edges.filter((edge) =>
        lowerInterfaces.some((node) => node.id === edge.source)
      );
      // Change the targetHandle of the lowerInterfaceEdges
      lowerEdges.map((edge) => (edge.targetHandle = "bottom"));

      const cleanDataSet = [...lowerEdges, ...upperEdges];
      cleanDataSet.map((edge) => {
        edge.hidden = true;
        return edge;
      });
      return cleanDataSet;
    }
  });
  return edges;
};

/** innerLayout Main function
- Position all nodes inside of a machine.
- if not a machine, returns the node.
@returns a set composed by all the nodes : machines, subnetworks, networkInterface etc...
*/
export const runNodesInnerPosition = (nodes: Array<Node>): Array<Node> => {
  nodes.forEach((node) => {
    if (node.type !== "machine") {
      return node;
    }
    const machineSampleNodes: Array<Node> = retrieveMachineChilds(
      nodes,
      node.id
    );
    const machineDimension: MachineDimension = {
      width: sizes.machine.width,
      height: sizes.machine.height,
      padding: 6,
      ratio: 2, // only applies to multipleNodeTypePattern // Between 1 & 3
    };
    const intArr = setArraysOfNodes(machineSampleNodes)[0][0];
    const servArr = setArraysOfNodes(machineSampleNodes)[1][0];
    const layoutPattern = setLayoutPattern(intArr, servArr);
    const positionnedNodes = executeMachineLayout(
      machineDimension,
      layoutPattern,
      intArr,
      servArr,
      machineSampleNodes
    );

    return positionnedNodes;
  });
  return nodes;
};
