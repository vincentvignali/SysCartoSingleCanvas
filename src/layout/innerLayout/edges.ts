import { Edge, Node, Position } from "reactflow";

/**
- Connect the edges to the right handle
*/
export const runEdgesPositionning = (
  nodes: Array<Node>,
  edges: Array<Edge>
): Array<Edge> => {
  // Check if there is more than one interface, otherwise, there is no need to change the edges.

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
    if (numberOfInterfaces === 1) {
      edges
        .filter((edge) => childNodes.some((node) => node.id === edge.source))
        .map((edge) => {
          edge.targetHandle = Position.Top;
          edge.sourceHandle = Position.Bottom;
        });
    }
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
      upperEdges.map((edge) => (edge.targetHandle = Position.Top));
      upperEdges.map((edge) => (edge.sourceHandle = Position.Bottom));
      // Retrieve all edges connected to the nodes retrieved previously
      const lowerEdges = edges.filter((edge) =>
        lowerInterfaces.some((node) => node.id === edge.source)
      );
      // Change the targetHandle of the lowerInterfaceEdges
      lowerEdges.map((edge) => (edge.targetHandle = Position.Bottom));
      lowerEdges.map((edge) => (edge.sourceHandle = Position.Top));

      const cleanDataSet = [...lowerEdges, ...upperEdges];
      cleanDataSet.map((edge) => {
        edge.hidden = true;
        return edge;
      });
      return cleanDataSet;
    }
  });
  console.log(edges);
  return edges;
};
